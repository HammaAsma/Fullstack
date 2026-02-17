# Documentation technique — Projets JavaScript

Ce fichier constitue la **documentation technique** du dossier JavaScript.  
Ce dépôt regroupe **trois mini-projets** front-end en HTML, CSS et JavaScript vanilla. Chaque projet illustre des notions différentes : gestion d’état, POO, et asynchrone (fetch, Promises, async/await).

---

## Vue d’ensemble

| Projet      | Dossier   | Description principale                          |
|------------|-----------|--------------------------------------------------|
| Calculatrice | `PROJECT1` | Calculatrice avec historique et raccourcis clavier |
| Mini Caissier | `PROJECT2` | Panier d’achat avec classes et gestion de stock   |
| Pokédex    | `PROJECT3` | Recherche de Pokémon via API avec cache et annulation |

---

## PROJECT1 — Calculatrice

### Objectif
Application de calculatrice avec affichage, historique des opérations et support clavier.

### Stack technique
- **HTML5** : structure sémantique, `data-type` / `data-value` sur les boutons pour la délégation d’événements
- **CSS3** : mise en page (flexbox), thème sombre, grille de touches
- **JavaScript** : pas de framework, DOM et `addEventListener`

### Architecture et concepts

- **État centralisé** : un objet `state` contient `current`, `previous`, `operator`, `overwrite` pour gérer la chaîne de calcul et l’affichage.
- **Délégation d’événements** : un seul `click` sur le conteneur des touches (`#keys`), avec `event.target.closest("button")` et lecture de `dataset.type` / `dataset.value`.
- **Propagation** : `event.stopPropagation()` sur les opérateurs pour éviter les doubles traitements.
- **Historique** : les 5 dernières opérations sont affichées dans une liste (`#history`), ajout en tête et suppression du plus ancien au-delà de 5.

### Fonctionnalités

- Opérations : `+`, `−`, `×`, `÷` avec enchaînement (ex. 3 + 4 + 5).
- Commandes : **AC** (reset + vidage historique), **CE** (effacer le nombre courant), **±** (changer le signe), **%** (pourcentage).
- Gestion de la division par zéro (affichage "Error").
- Formatage des nombres : précision limitée, notation scientifique si trop long.
- Raccourcis clavier : chiffres, `+`, `-`, `*`, `/`, `Enter` (=), `Backspace` (CE), `Escape` (AC).

### Structure des fichiers

```
PROJECT1/
├── calculator.html   # Point d’entrée, structure de la calculatrice
├── calculator.js     # Logique (state, handlers, affichage, clavier)
└── style.css         # Styles (grille, display, historique)
```

### Lancement
Ouvrir `PROJECT1/calculator.html` dans un navigateur (pas de serveur requis).

---

## PROJECT2 — Mini Caissier

### Objectif
Simulation de caisse : catalogue de produits, panier, stock et paiement avec règle de réduction.

### Stack technique
- **HTML** : cartes produits (image, prix, stock, bouton « Ajouter au panier »), footer avec liste du panier et bouton « Payer »
- **CSS** : `flex-container` pour la grille de produits
- **JavaScript** : **ES6 classes** pour modéliser les articles

### Architecture et concepts

- **Modèle par classes** :
  - `Phone(name, model, color, prix, quantity)` — smartphone
  - `SmartTV(name, model, size, prix, quantity)` — téléviseur
  - `GamingConsole(name, model, type, prix, quantity)` — console
  Chaque classe expose `getDetails()` pour l’affichage dans le panier.
- **Catalogue** : objet `tab_objet` dont les clés sont les libellés (ex. `"Phone"`, `"SmartTV"`) et les valeurs des instances.
- **Panier** : tableau `shoppingCart` ; ajout d’une instance au panier et décrémentation de `quantity` sur l’objet produit.
- **Prix** : somme calculée via `calculateTotalPrice(shoppingCart)` (itération sur `item.prix`).

### Fonctionnalités

- Ajout au panier : vérification du stock, mise à jour de l’affichage du stock restant et du total.
- Affichage du panier : liste d’items avec `getDetails()`.
- Paiement (bouton « Payer ») : `prompt` pour le montant ; si total > 400 $, réduction de 10 % ; comparaison montant / total, message de rendu ou d’erreur, vidage du panier si OK.
- Gestion du stock : désactivation logique quand `quantity === 0` (message d’alerte si ajout impossible).

### Structure des fichiers

```
PROJECT2/
├── index.html    # Page catalogue + panier + bouton Payer
├── script.js     # Classes, catalogue, panier, calcul total, pay()
└── styles.css    # Mise en page des articles
```

### Assets
Le projet s’attend à des images dans `PROJECT2/image/` (ex. `imageIphone.png`, `imageTv.png`, `image.png`).

### Lancement
Ouvrir `PROJECT2/index.html` dans un navigateur.

---

## PROJECT3 — Pokédex

### Objectif
Interface de recherche de Pokémon utilisant l’API [PokeAPI](https://pokeapi.co/) : recherche par nom/ID, Pokémon aléatoire, annulation de requête, historique et cache.

### Stack technique
- **HTML5** : champ de recherche, boutons (Rechercher, Surprise !, Annuler), zone de résultats, liste d’historique
- **CSS** : mise en page (flex), cartes Pokémon, couleurs dynamiques (bordure selon la couleur de l’espèce)
- **JavaScript** : **Fetch API**, **Promises**, **async/await**, **AbortController**, **Map** (cache)

### Architecture et concepts

- **Requêtes HTTP** :
  - `fetchWithTimeout(url, { signal, timeout })` : fetch avec délai max (défaut 5 s) et annulation via `AbortController`.
  - `retry(fn, { retries, backoffMs })` : réessais avec backoff exponentiel (ex. 3 tentatives, 500 ms puis 1 s, 2 s).
- **Données** : appel parallèle à `pokemon/${id}` et `pokemon-species/${id}` avec `Promise.all` pour récupérer infos de base + couleur de l’espèce.
- **Cache** : `Map` clé = nom/ID en minuscules, valeur = objet Pokémon ; évite les appels API redondants.
- **Annulation** : un seul `AbortController` partagé ; à chaque nouvelle recherche, la requête en cours est annulée.
- **Historique** : tableau des 5 derniers noms recherchés ; clic sur un élément relance la recherche.

### Fonctionnalités

- Recherche par nom ou ID (saisie + bouton ou touche Entrée).
- Bouton « Surprise ! » : ID aléatoire entre 1 et 1010, puis recherche.
- Bouton « Annuler » : vide l’input, efface les résultats et annule la requête en cours.
- Affichage : image (sprite), nom, ID, types, stats, bordure colorée selon l’espèce.
- Gestion d’erreurs : Pokémon introuvable, timeout, annulation (AbortError), messages affichés dans la zone résultats.

### Structure des fichiers

```
PROJECT3/
├── index.html   # Barre de recherche, boutons, résultats, historique
├── script.js    # Fetch, timeout, retry, cache, AbortController, affichage
└── style.css    # Conteneurs, cartes, historique
```

### Dépendances externes
- **PokeAPI** (https://pokeapi.co/api/v2/) : pas de clé API, usage public.

### Lancement
Ouvrir `PROJECT3/index.html` dans un navigateur. Les requêtes vers PokeAPI fonctionnent en CORS depuis le fichier local ou un serveur statique.

---

## Synthèse technique

| Notion              | PROJECT1        | PROJECT2     | PROJECT3                |
|---------------------|-----------------|-------------|-------------------------|
| Gestion d’état      | Objet `state`   | Panier + stock | Cache `Map` + historique |
| Événements          | Délégation, clavier | onclick, addEventListener | click, keypress        |
| Modèle de données   | —               | Classes ES6  | Données API             |
| Asynchrone          | —               | —           | fetch, Promise, async/await, AbortController |
| API / réseau        | —               | —           | PokeAPI                 |

---

## Prérequis et exécution

- **Navigateur** : moderne (Chrome, Firefox, Edge, Safari) avec support ES6+ et Fetch.
- **Exécution** : ouvrir le fichier `index.html` ou `calculator.html` du projet concerné (double-clic ou « Ouvrir avec »). Pour le Pokédex, certains navigateurs peuvent exiger un serveur HTTP local si la politique CORS est stricte ; au besoin, utiliser par exemple `npx serve .` dans le dossier du projet.

---

*Documentation technique — Formation Full Stack — Projets JavaScript*
