(() => {
  const API_BASE = "http://localhost:3000/api";

  const authSection = document.getElementById("auth-section");
  const appSection = document.getElementById("app-section");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const loginBtn = document.getElementById("loginBtn");
  const authError = document.getElementById("auth-error");

  const logoutBtn = document.getElementById("logoutBtn");
  const newTodoTitle = document.getElementById("newTodoTitle");
  const addTodoBtn = document.getElementById("addTodoBtn");
  const todosList = document.getElementById("todosList");
  const todosEmpty = document.getElementById("todos-empty");

  // Filtres
  const filterStatus = document.getElementById("filter-status");
  const filterPriority = document.getElementById("filter-priority");
  const filterSearch = document.getElementById("filter-search");
  const filterBtn = document.getElementById("filterBtn");

  // Détails d'édition
  const todoDetails = document.getElementById("todo-details");
  const detailTitle = document.getElementById("detail-title");
  const detailPriority = document.getElementById("detail-priority");
  const detailDueDate = document.getElementById("detail-dueDate");
  const saveTodoBtn = document.getElementById("saveTodoBtn");
  const cancelEditBtn = document.getElementById("cancelEditBtn");

  // État d'édition courant (null = mode création)
  let editingTodoId = null;

  // Token helpers
  const getToken = () => localStorage.getItem("token");
  const setToken = (t) => localStorage.setItem("token", t);
  const clearToken = () => localStorage.removeItem("token");

  // Role helpers
  const getRole = () => localStorage.getItem("role") || "user";
  const setRole = (r) => localStorage.setItem("role", r || "user");
  const clearRole = () => localStorage.removeItem("role");

  const show = (el) => el.classList.remove("hidden");
  const hide = (el) => el.classList.add("hidden");

  function updateUI() {
    const hasToken = !!getToken();
    if (hasToken) {
      hide(authSection);
      show(appSection);
      fetchTodos();
    } else {
      show(authSection);
      hide(appSection);
      hide(todoDetails);
      editingTodoId = null;
    }
  }

  async function login(email, password) {
    authError.textContent = "";
    hide(authError);
    loginBtn.disabled = true;
    try {
      const res = await fetch(`${API_BASE}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        let errorMessage = "Erreur de connexion";
        try {
          const errBody = await res.json();
          if (errBody && errBody.message) {
            errorMessage = errBody.message;
          }
        } catch (_) {}

        if (res.status === 401) {
          errorMessage = "Email ou mot de passe incorrect";
        }

        throw new Error(errorMessage);
      }

      const data = await res.json();
      if (!data.token) throw new Error("Token manquant dans la réponse");
      setToken(data.token);
      if (data.user) setRole(data.user.role);
      updateUI();
    } catch (e) {
      authError.textContent = `Erreur de connexion: ${e.message}`;
      show(authError);
    } finally {
      loginBtn.disabled = false;
    }
  }

  async function fetchTodos() {
    todosList.innerHTML = "";
    todosEmpty.classList.add("hidden");
    try {
      const params = new URLSearchParams();
      if (filterStatus && filterStatus.value) params.set("status", filterStatus.value);
      if (filterPriority && filterPriority.value) params.set("priority", filterPriority.value);
      if (filterSearch && filterSearch.value.trim()) params.set("q", filterSearch.value.trim());

      const url = params.toString()
        ? `${API_BASE}/todos?${params.toString()}`
        : `${API_BASE}/todos`;

      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const payload = await res.json();

      // La réponse backend peut être soit un tableau direct, soit un objet { data: [...] }
      const items = Array.isArray(payload)
        ? payload
        : Array.isArray(payload.data)
        ? payload.data
        : [];

      if (!items || items.length === 0) {
        show(todosEmpty);
        return;
      }
      items.forEach(renderTodo);
    } catch (e) {
      todosList.innerHTML = `<li class="muted">Erreur de chargement: ${e.message}</li>`;
    }
  }

  function renderTodo(todo) {
    const li = document.createElement("li");
    const left = document.createElement("div");
    left.className = "todo-left";

    const title = document.createElement("span");
    title.className = `todo-title ${todo.completed ? "done" : ""}`;
    title.textContent = todo.title || "(sans titre)";

    const meta = document.createElement("small");
    meta.className = "muted";

    const pieces = [];
    if (todo.priority) {
      const prLabel =
        todo.priority === "high"
          ? "Haute"
          : todo.priority === "medium"
          ? "Moyenne"
          : "Basse";
      pieces.push(`Priorité : ${prLabel}`);
    }

    if (todo.dueDate) {
      const d = new Date(todo.dueDate);
      pieces.push(`Échéance : ${d.toLocaleDateString("fr-FR")}`);
    }

    if (getRole() === "admin" && todo.user && todo.user.name) {
      pieces.push(`créer par : ${todo.user.name}`);
    }

    if (pieces.length > 0) {
      meta.textContent = pieces.join(" | ");
    }

    // Clic sur le titre = édition inline dans la ligne
    title.style.cursor = "pointer";
    title.title = "Cliquer pour modifier cette tâche";
    title.addEventListener("click", () => {
      if (left.dataset.editing === "true") return;
      left.dataset.editing = "true";

      // Nettoyer le contenu et créer un petit formulaire inline
      left.innerHTML = "";

      const titleInput = document.createElement("input");
      titleInput.type = "text";
      titleInput.value = todo.title || "";

      const prioritySelect = document.createElement("select");
      [
        ["low", "Basse"],
        ["medium", "Moyenne"],
        ["high", "Haute"],
      ].forEach(([val, label]) => {
        const opt = document.createElement("option");
        opt.value = val;
        opt.textContent = label;
        if ((todo.priority || "medium") === val) opt.selected = true;
        prioritySelect.appendChild(opt);
      });

      const dueInput = document.createElement("input");
      dueInput.type = "date";
      if (todo.dueDate) {
        const d = new Date(todo.dueDate);
        dueInput.value = d.toISOString().slice(0, 10);
      }

      const completedLabel = document.createElement("label");
      const completedCheckbox = document.createElement("input");
      completedCheckbox.type = "checkbox";
      completedCheckbox.checked = !!todo.completed;
      completedLabel.appendChild(completedCheckbox);
      completedLabel.appendChild(document.createTextNode(" Terminée"));

      const saveBtn = document.createElement("button");
      saveBtn.textContent = "Enregistrer";

      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Annuler";
      cancelBtn.className = "secondary";

      left.appendChild(titleInput);
      left.appendChild(prioritySelect);
      left.appendChild(dueInput);
      left.appendChild(completedLabel);
      left.appendChild(saveBtn);
      left.appendChild(cancelBtn);

      const resetRow = async (reload = false) => {
        left.dataset.editing = "false";
        if (reload) {
          await fetchTodos();
        } else {
          // Si pas de reload, on remet juste l'affichage initial
          left.innerHTML = "";
          left.appendChild(title);
          if (meta.textContent) {
            left.appendChild(document.createElement("br"));
            left.appendChild(meta);
          }
        }
      };

      cancelBtn.addEventListener("click", () => {
        resetRow(false);
      });

      saveBtn.addEventListener("click", async () => {
        const body = {
          title: titleInput.value.trim() || todo.title,
          priority: prioritySelect.value,
          completed: completedCheckbox.checked,
        };

        if (dueInput.value) {
          body.dueDate = dueInput.value;
        }

        try {
          const res = await fetch(`${API_BASE}/todos/${todo._id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify(body),
          });

          if (!res.ok) throw new Error(`HTTP ${res.status}`);

          await resetRow(true);
        } catch (e) {
          alert(`Erreur mise à jour: ${e.message}`);
        }
      });
    });

    left.appendChild(title);
    if (meta.textContent) {
      left.appendChild(document.createElement("br"));
      left.appendChild(meta);
    }

    const actions = document.createElement("div");
    if (getRole() === "admin") {
      const del = document.createElement("button");
      del.className = "danger";
      del.textContent = "Supprimer";
      del.addEventListener("click", async () => {
        if (!confirm("Supprimer cette todo ?")) return;
        try {
          const res = await fetch(`${API_BASE}/todos/${todo._id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${getToken()}` },
          });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          li.remove();
          if (!todosList.children.length) show(todosEmpty);
        } catch (e) {
          alert(`Erreur suppression: ${e.message}`);
        }
      });

      actions.appendChild(del);
    }

    li.appendChild(left);
    li.appendChild(actions);
    todosList.appendChild(li);
  }

  async function addTodo(title) {
    if (!title.trim()) return;

    addTodoBtn.disabled = true;
    try {
      const res = await fetch(`${API_BASE}/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const payload = await res.json();

      // Les réponses backend utilisent { status, message, data: { ...todo } }
      const todo = payload && payload.data ? payload.data : payload;

      // Après ajout, on recharge toute la liste pour rester simple
      newTodoTitle.value = "";
      editingTodoId = null;
      await fetchTodos();
    } catch (e) {
      alert(`Erreur ajout: ${e.message}`);
    } finally {
      addTodoBtn.disabled = false;
    }
  }

  async function saveTodo() {
    if (!editingTodoId) return;

    saveTodoBtn.disabled = true;
    try {
      const body = {
        title: newTodoTitle.value || detailTitle.textContent || undefined,
        priority: detailPriority.value,
      };

      if (detailDueDate.value) {
        body.dueDate = detailDueDate.value;
      }

      const res = await fetch(`${API_BASE}/todos/${editingTodoId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      // Rechargement de la liste et reset de l'état d'édition
      editingTodoId = null;
      hide(todoDetails);
      newTodoTitle.value = "";
      await fetchTodos();
    } catch (e) {
      alert(`Erreur mise à jour: ${e.message}`);
    } finally {
      saveTodoBtn.disabled = false;
    }
  }

  // Events
  loginBtn.addEventListener("click", () => login(emailInput.value, passwordInput.value));
  passwordInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") login(emailInput.value, passwordInput.value);
  });

  addTodoBtn.addEventListener("click", () => addTodo(newTodoTitle.value));
  newTodoTitle.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTodo(newTodoTitle.value);
  });

  if (filterBtn) {
    filterBtn.addEventListener("click", () => fetchTodos());
  }
  if (filterSearch) {
    filterSearch.addEventListener("keydown", (e) => {
      if (e.key === "Enter") fetchTodos();
    });
  }

  if (saveTodoBtn && cancelEditBtn) {
    saveTodoBtn.addEventListener("click", saveTodo);
    cancelEditBtn.addEventListener("click", () => {
      editingTodoId = null;
      hide(todoDetails);
      newTodoTitle.value = "";
    });
  }

  logoutBtn.addEventListener("click", () => {
    clearToken();
    clearRole();
    updateUI();
  });

  // Init
  updateUI();
})();
