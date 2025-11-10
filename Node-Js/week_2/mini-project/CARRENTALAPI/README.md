Présentation:
    
    Ce mini-projet est une application local de gestion de location de voitures (API REST ,fichiers JSON, gestion de parc, réservation ,annulation retour et filtre )

Configuration .env

    PORT=3000
    API_TOKEN="secret123"

Endpoints:

  Cars:
  
    GET /api/cars:
          category=(eco, suv,van,sedan)
          available=(true / false)
          minPrice , maxPrice
          q=(recherche modèle ou plaque)
    
    GET /api/cars/:id

    POST /api/cars (Protégé par Bearer Token)
    PUT /api/cars/:id (protégé)
    DELETE /api/cars/:id (protégé)

  Rentals:

      GET /api/rentals
        =>filtres: status , from , to , carId
      GET /api/rentals/:id
      POST /api/rentals
      PUT /api/rentalss/:id/rturn
      DELETE /api/rentaals/:id

  Exemples de Scénarios:
    Lister les voitures disponible (cat: suv entre 30 et 70 $/j)
    
      curl "http://localhost:3000/api/cars?available=true&category=suv&minPrice=30&maxPrice=70"

       Résultat:
           "{
              "data":[
                  {
                    "id":12,
                    "brand":"Seat",
                    "model":"Arona",
                    "category":"suv",
                    "plate":"LL-112-LL",
                    "pricePerDay":49,
                    "available":true,
                    "createdAt":"2025-11-01T14:00:00Z",
                    "updatedAt":"2025-11-01T14:00:00Z"
                    },
                  {
                    "id":15,
                    "brand":"Mazda",
                    "model":"CX-30",
                    "category":"suv",
                    "plate":"OO-115-OO",
                    "pricePerDay":51,
                    "available":true,
                    "createdAt":"2025-11-01T14:30:00Z",
                    "updatedAt":"2025-11-01T14:30:00Z"
                  },....

              ]
            }"
        
  Créer une voiture (protégé):

     curl -X POST http://localhost:3000/api/cars \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer secret123" \
        -d '{"brand":"Toyota","model":"Corolla","category":"sedan","plate":"ABC-123","pricePerDay":42.5}'
          
          Résultat:
            {
              "id":21,
              "brand":"Toyota",
              "model":"Corolla",
              "category":"sedan",
              "plate":"ABC-123",
              "pricePerDay":42.5,
              "available":true,
              "createdAt":"2025-11-10T20:16:44.130Z",
              "updatedAt":"2025-11-10T20:16:44.130Z"
              }
  
  Créer une location:

        curl -X POST http://localhost:3000/api/rentals \
            -H "Content-Type: application/json" \
            -H "Authorization: Bearer secret123" \
            -d '{"carId":"2","customer":{"name":"Alice","email":"alice@example.com"},"from":"2025-11-02","to":"2025-11-05"}'

        Résultat:

          {
            "carId":"2",
            "customer":
                  {
                    "name":"Alice",
                    "email":"alice@example.com"
                  },
            "from":"2025-11-02",
            "to":"2025-11-05",
            "days":4,
            "id":21,
            "dailyRate":48,
            "total":192,
            "status":"active",
            "createdAt":"2025-11-10T20:19:57.727Z",
            "updatedAt":"2025-11-10T20:19:57.727Z"
          }

  Retourner une voiture:

    curl -X PUT http://localhost:3000/api/rentals/5/return \
      -H "Authorization: Bearer secret123"

      Résultat:
          {
            "id":5,
            "carId":13,
            "from":"2025-11-10",
            "to":"2025-11-12",
            "days":2,
            "dailyRate":29,
            "total":58,
            "status":"returned",
            "createdAt":"2025-11-10T11:00:00Z",
            "updatedAt":"2025-11-10T20:21:59.419Z"
          }

  Annuler une location:

    curl -X DELETE http://localhost:3000/api/rentals/7/   -H "Authorization: Bearer secret123"

      Résultat:

          {
            "id":7,
            "carId":7,
            "from":"2025-11-20",
            "to":"2025-11-25",
            "days":5,
            "dailyRate":31,
            "total":155,
            "status":"cancelled",
            "createdAt":"2025-11-15T12:00:00Z",
            "updatedAt":"2025-11-10T20:24:24.816Z"
          }

  Structure de Projet:
      
      <img width="377" height="441" alt="image" src="https://github.com/user-attachments/assets/c7ff9f40-e7d1-4e7d-b650-49def148527b" />

      
