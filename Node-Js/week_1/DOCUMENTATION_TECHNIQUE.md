# Documentation technique — Node.js Week 1

Semaine 1 : fondamentaux Node.js (events, fs, HTTP natif). Ce dossier contient le **mini-project** (Node System Logger), le **week-project** (API products/orders) et les **post-lesson activities**.

---

## 1. Mini-project — Node System Logger

**Objectif** : surveillance des ressources système en temps réel, écriture dans `log.txt` via un module de journalisation basé sur **EventEmitter**.

**Groupe G5** — Bootcamp YNOV x JOBINTECH MERN Stack — Rabat : Saad Ouafir, Achraf Tabchi, Asma Hamma.

### Stack

- **Node.js** : `node:events` (EventEmitter), `node:fs`, `node:http`.

### Fichiers

- **logger.js** : classe Logger (EventEmitter), écrit dans `log.txt`, émet `messageLogged` et `lowMemory`.
- **monitor.js** : collecte mémoire libre/totale et uptime toutes les 5 s, alerte si mémoire libre < 20 %.
- **server.js** : `GET /` (accueil), `GET /logs` (contenu log.txt), `GET /stats` (stats JSON).

### Lancement

- `node monitor.js` puis `node server.js` → `http://localhost:3000`.

---

## 2. Week-project — API products / orders

**Objectif** : API REST (products, orders) avec serveur HTTP natif, structure en couches (controllers, services, router).

### Stack

- **Node.js** : `node:http`, `node:url`. Pas d’Express ; routing manuel (tableau method, path, handler).
- **Données** : `data/` (fichiers ou mémoire).

### Structure

- `src/controllers/` (productsController, ordersController)
- `src/services/` (productsService, ordersService)
- `src/utils/` (parseQuery)
- `src/router.js`, `src/server.js`

**Routes** : GET products, GET orders, GET health.

### Lancement

- `node src/server.js` → `http://localhost:3000`.

---

## 3. Post-lesson activities

Activités guidées **Partie_N01** et **Partie_N02** : exercices sur events, fs, HTTP.

---

*Formation Full Stack — Node.js Week 1*
