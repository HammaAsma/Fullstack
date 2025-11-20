import { register, login } from "../service/userService.js";

export async function registerController(req, res, next) {
  try {
    const { name, email, password, role } = req.body;

    // Validation basique
    if (!name || !email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Nom, email et mot de passe sont requis",
        code: 400,
        timestamp: new Date().toISOString(),
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        status: "error",
        message: "Le mot de passe doit contenir au moins 6 caractères",
        code: 400,
        timestamp: new Date().toISOString(),
      });
    }

    // Créer l'utilisateur
    const user = await register({ name, email, password, role });

    res.status(201).json({
      status: "success",
      message: "Utilisateur créé avec succès",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export async function loginController(req, res, next) {
  try {
    const { email, password } = req.body;

    // Validation basique
    if (!email || !password) {
      return res.status(400).json({
        status: "error",
        message: "Email et mot de passe sont requis",
        code: 400,
        timestamp: new Date().toISOString(),
      });
    }

    // Authentifier l'utilisateur
    const result = await login(email, password);

    // Adapter la forme de la réponse pour le front (token à la racine)
    res.status(200).json({
      status: "success",
      message: "Connexion réussie",
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
}

export async function getMeController(req, res, next) {
  try {
    res.status(200).json({
      status: "success",
      data: req.user,
    });
  } catch (error) {
    next(error);
  }
}

/*Gestion user
export const getAllUsers = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData || userData.length === 0) {
      return res.status(404).json({ message: "data not found ." });
    }
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user_Exist = await User.findById(id);
    if (!user_Exist) {
      return res.status(404).json({ message: "Ce utilisateur n'existe pas ." });
    }
    res.status(200).json(user_Exist);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const user_Exist = await User.findById(id);
    if (!user_Exist) {
      return res.status(404).json({ message: "Ce utilisateur n'existe pas ." });
    }
    const updateData = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updateData);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user_Exist = await User.findById(id);
    if (!user_Exist) {
      return res.status(404).json({ message: "Ce utilisateur n'existe pas ." });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "utilisateur bien supprimer !" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
*/
