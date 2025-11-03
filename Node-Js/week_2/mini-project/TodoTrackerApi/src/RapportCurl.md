Endpoints:

    Renvoyé Toutes les Tâches: All | Active | completed

        http://localhost:3000/api/todos?status=all:

            {
                "page": 1,
                "limit": 10,
                "total": 33,
                "totalPages": 4,
                "data": [
                    {
                        "id": 1,
                        "title": "Faire les courses",
                        "completed": true,
                        "priority": "medium",
                        "dueDate": "2025-11-05",
                        "createdAt": "2025-10-01T09:00:00.000Z",
                        "updatedAt": "2025-11-01T09:00:00.000Z"
                    },
                    .....
                ]
            }
    
        http://localhost:3000/api/todos?status=active:

            {
                "page": 1,
                "limit": 10,
                "total": 30,
                "totalPages": 3,
                "data": [
                    {
                        "id": 1,
                        "title": "Faire les courses",
                        "completed": false,
                        "priority": "medium",
                        "dueDate": "2025-11-05",
                        "createdAt": "2025-10-01T09:00:00.000Z",
                        "updatedAt": "2025-11-01T09:00:00.000Z"
                    },
                    {
                        "id": 2,
                        "title": "Répondre aux emails",
                        "completed": false,
                        "priority": "low",
                        "dueDate": null,
                        "createdAt": "2025-11-01T09:10:00.000Z",
                        "updatedAt": "2025-11-01T09:10:00.000Z"
                    },
                    ....
                ]
            }

        http://localhost:3000/api/todos?status=completed:

        {
            "page": 1,
            "limit": 10,
            "total": 4,
            "totalPages": 1,
            "data": [
                {
                    "id": 4,
                    "title": "test1",
                    "completed": true,
                    "priority": "medium",
                    "dueDate": null,
                    "createdAt": "2025-10-09T09:17:00.000Z",
                    "updatedAt": "2025-11-01T09:19:00.000Z"
                },
               ....
            ]
        }
    
    Priority Low | Medium | high:

    http://localhost:3000/api/todos?priority=low

        {
            "page": 1,
            "limit": 10,
            "total": 10,
            "totalPages": 1,
            "data": [
                {
                    "id": 2,
                    "title": "Répondre aux emails",
                    "completed": false,
                    "priority": "low",
                    "dueDate": null,
                    "createdAt": "2025-11-01T09:10:00.000Z",
                    "updatedAt": "2025-11-01T09:10:00.000Z"
                },
                ....
            ]
        }

    http://localhost:3000/api/todos?priority=medium
    
        {
            "page": 1,
            "limit": 10,
            "total": 12,
            "totalPages": 2,
            "data": [
                {
                    "id": 1,
                    "title": "Faire les courses",
                    "completed": false,
                    "priority": "medium",
                    "dueDate": "2025-11-05",
                    "createdAt": "2025-10-01T09:00:00.000Z",
                    "updatedAt": "2025-11-01T09:00:00.000Z"
                },
                ....
            ]
        }

     http://localhost:3000/api/todos?priority=high

        {
            "page": 1,
            "limit": 10,
            "total": 11,
            "totalPages": 2,
            "data": [
                {
                    "id": 3,
                    "title": "Préparer la présentation",
                    "completed": false,
                    "priority": "high",
                    "dueDate": "2025-11-10",
                    "createdAt": "2025-10-11T09:12:00.000Z",
                    "updatedAt": "2025-11-01T09:12:00.000Z"
                },
                ....
            ]
        }
    
    Get /api/todos/:id:

        http://localhost:3000/api/todos/4

        Resultat:
         
        {
            "id": 4,
            "title": "test1",
            "completed": true,
            "priority": "medium",
            "dueDate": null,
            "createdAt": "2025-10-09T09:17:00.000Z",
            "updatedAt": "2025-11-01T09:19:00.000Z"
        }

    Post api/todos: création d'une nouvelle tâche

        http://localhost:3000/api/todos :  

        Body de requête: {"title":"title test"}

        resultat:

            {
                "id": 35,
                "title": "title test",
                "completed": false,
                "priority": "medium",
                "dueDate": null,
                "createdAt": "2025-11-03T10:44:40.449Z",
                "updatedAt": "2025-11-03T10:44:40.449Z"
            }
    
    Patch api/todos/:id :Mettre à jour une tâche

        http://localhost:3000/api/todos/35

        Body de la requête: {"title":"repond au email","completed":true,"priority":"low"}

        Resultat:

            {
                "id": 35,
                "title": "repond au email",
                "completed": true,
                "priority": "low",
                "dueDate": null,
                "createdAt": "2025-11-03T10:44:40.449Z",
                "updatedAt": "2025-11-03T10:56:29.668Z"
            }

    Supprimer une tâche:

        http://localhost:3000/api/todos/35

    Patch api/todos/:id/toggle :Inverser completed d'une tâche

        http://localhost:3000/api/todos/4/toggle     

        Resultat:
             
             {
                "id": 4,
                "title": "test1",
                "completed": false,
                "priority": "medium",
                "dueDate": null,
                "createdAt": "2025-10-09T09:17:00.000Z",
                "updatedAt": "2025-11-01T09:19:00.000Z"
            }

    Exemple des commande CURL
    
    curl -X POST http://localhost:3000/api/todos -H "Content-Type: application/json" -d '{"title":"bonus mini projet","priority":"high","dueDate":"2025-11-02"}'

        Resultat: 
            
            {
                "id":34,
                "title":"bonus mini projet",
                "completed":false,
                "priority":"high",
                "dueDate":"2025-11-02",
                "createdAt":"2025-11-03T09:18:46.834Z",
                "updatedAt":"2025-11-03T09:18:46.834Z"
            }

    curl "http://localhost:3000/api/todos?status=active&priority=high&q=Chercher&page=1&limit=5"
        
        Resultat:
            "
                "page": 1,
                "limit": 5,
                "total": 1,
                "totalPages": 1,
                "data": [
                    {
                        "id": 21,
                        "title": "Chercher des sponsors",
                        "completed": false,
                        "priority": "high",
                        "dueDate": null,
                        "createdAt": "2025-11-01T10:32:00.000Z",
                        "updatedAt": "2025-11-01T10:32:00.000Z"
                    }
                ]
            "
        curl -X PATCH http://localhost:3000/api/todos/12/toggle

            Avant l'excution de la commande :
                {
                    "id": 12,
                    "title": "Écrire la documentation",
                    "completed": true,
                    "priority": "high",
                    "dueDate": null,
                    "createdAt": "2025-11-01T09:50:00.000Z",
                    "updatedAt": "2025-11-01T09:50:00.000Z"
                }
            
            Apres l'exucution :
                {
                    "id": 12,
                    "title": "Écrire la documentation",
                    "completed": false,
                    "priority": "high",
                    "dueDate": null,
                    "createdAt": "2025-11-01T09:50:00.000Z",
                    "updatedAt": "2025-11-01T09:50:00.000Z"
                }
        
        curl -X PATCH http://localhost:3000/api/todos/12 -H "Content-Type:application/json" -d '{"completed": true}'

            Resultat:

                {
                    "id": 12,
                    "title": "Écrire la documentation",
                    "completed": true,
                    "priority": "high",
                    "dueDate": null,
                    "createdAt": "2025-11-01T09:50:00.000Z",
                    "updatedAt": "2025-11-03T09:27:44.695Z"
                }

        curl -X DELETE http://localhost:3000/api/todos/12

    

