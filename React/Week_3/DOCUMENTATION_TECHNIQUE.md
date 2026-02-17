# Documentation technique — React Week 3

Semaine 3 : projet **fullstack** — **mini-projet-ApiProduct** (Backend Express + MySQL, Frontend React Vite) pour la gestion de produits.

---

## Vue d’ensemble

| Partie     | Technos | Rôle |
|------------|---------|------|
| **Backend**  | Express, MySQL (mysql2), Swagger, CORS | API REST `/api/products`, doc Swagger, base `product_data`. |
| **Frontend** | React 19, Vite, Axios, Bootstrap, DaisyUI | Gestion des produits (liste, création, édition, suppression). |

---

## Architecture

```
Week_3/mini-projet-ApiProduct/
├── Backend/
│   └── src/          # config/db.js, controllers/, models/, routes/, swagger.js, server.js
└── frontend/
    └── src/          # api/, components/, pages/ProductManager.jsx, App.jsx
```

---

## Backend (API Products)

- **Stack** : Node.js ESM, Express 5, MySQL (mysql2), swagger-jsdoc, swagger-ui-express.
- **Modèle** : `products` (id, name, price, stock, category). Filtres GET : name, category, minPrice, maxPrice, page, limit, groupBy.
- **Endpoints** : GET/POST `/api/products`, GET/PUT/PATCH/DELETE `/api/products/:id`, GET `/health`, GET `/api-docs` (Swagger UI).
- **Port** : 3000. CORS : `http://localhost:5173`.
- **Lancement** : `cd mini-projet-ApiProduct/Backend && npm install && npm run dev`.

---

## Frontend

- **Stack** : React 19, Vite 7, Axios, Bootstrap 5, DaisyUI, Lucide React.
- **Structure** : `src/api` (Axios), `src/components`, `src/pages/ProductManager.jsx`.
- **Fonctionnalités** : liste, création, modification, suppression de produits via l’API.
- **Port** : 5173.
- **Lancement** : `cd mini-projet-ApiProduct/frontend && npm install && npm run dev`.

---

## Prérequis et lancement

1. **MySQL** : base `product_data`, table `products`. Config dans `Backend/src/config/db.js`.
2. Backend : `cd mini-projet-ApiProduct/Backend && npm run dev`.
3. Frontend : `cd mini-projet-ApiProduct/frontend && npm run dev`.

---

*Formation Full Stack — React Week 3*
