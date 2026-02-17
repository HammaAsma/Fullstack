# Documentation technique — Node.js Week 2

Semaine 2 : **Express**, middlewares et APIs REST. Ce dossier contient le **mini-project** (CARRENTALAPI, TodoTrackerApi) et les **post-lesson activities** (hello-express, mini-api).

---

## 1. Mini-project — CARRENTALAPI

API de location de voitures : CRUD voitures, locations, middlewares (ex. auth).

### Stack

- **Express** : routes, middlewares. Structure : `src/controllers`, `src/routes`, `src/services`, `src/data`, `src/middlewares`, `src/utils`.

### Routes (exemple)

- **Cars** : GET `/`, GET `/:id`, POST `/` (auth), PUT `/:id` (auth), DELETE `/:id` (auth).
- **Rentals** : gestion des locations. Middleware **auth** sur les actions sensibles.

### Fichiers clés

- `src/controllers/cars.controller.js`, `rentals.controller.js`
- `src/services/cars.service.js`, `rentals.service.js`
- `src/routes/cars.routes.js`, routes rentals
- `src/middlewares/auth.js`, `src/utils/availability.js`

### Lancement

- Dans `mini-project/CARRENTALAPI` : `npm install` puis `npm start` ou `npm run dev` (port 3000).

---

## 2. Mini-project — TodoTrackerApi

API de gestion de tâches (todos). Structure : controllers, routes, services, data, middlewares.

### Lancement

- Dans `mini-project/TodoTrackerApi` : `npm install` puis `npm start` ou `npm run dev`.

---

## 3. Post-lesson activities

- **hello-express** : Express basique, dossier `public`.
- **mini-api** : Activite01 à 05 (middlewares, controllers, routes, services).

---

*Formation Full Stack — Node.js Week 2*
