Discussion 
    Activite 01:

        Quelle différence avec ton serveur Node.js natif ?
                
            Avec de Node.js on doit importe le module http et on aura beaucoup de code pour gérer les routes (des bloque if else ou switch)
            Avec Express le code et beaucoup plus simple et la gestion des routes trés claire 
            
        Qu’est-ce qu’Express gère automatiquement pour toi ?

            Il gére la création de serveur , le routage des requetes 'app.get()' et les status des reponse http


    Activite 02:

        4)
            curl http://localhost:3000/api/products
                [{"id":1,"name":"Laptop"},{"id":2,"name":"Phone"}]

            curl http://localhost:3000/api/products/2
                {"message":"Produit 2"}
                
        Qu’apporte le format JSON ?

            Il apporte une façon simple et structurée de transmettre des données entre le serveur et le client

        Pourquoi chaque ressource a-t-elle sa propre route (/api/products/:id) ?

            Pour récupérer, modifie ou supp un élément précis avec son id
    
    Activite 03:

        Que fait next() ?
           
            il  permet de passe l'execution au middlware suivant

        Quelle est la différence entre un middleware global et spécifique à une route ?
            
            Middleware Global il est exécute pour chaque requête http peut import la route
            Middleware Spécifique à une route s'exécute uniquement pour cette route 

        Pourquoi les middlewares sont essentiels dans Express ?

            Dans Express Les middlewares sont essentiels car il permettent de regrouper les traitement et les verification effectués sur les requêtes http
    
    Activite 04:

        Pourquoi le middleware d’erreur doit-il être placé en dernier ?

            Les middleware d'erreur sont placés à la fin car si l'erreur est déjà traite par un middelware normal elle ne sera pas transmise. On les place en dernier pour s'assurer que toutes les erreur non gérées soient traitées par ce middleware 

        Quelle différence entre throw new Error() et next(err) ?

            throw new Error(): envoyé une erreur qui doit être capturée dans catch (try/catch) sinon il va planter le serveur

            next(err) : transmet l'erreur à un middleware d'erreur 

    Activite 05:

        Quelle est la différence entre servir un fichier statique et lire un fichier JSON ?

            Servir un fichier statique: Envoyé un fichier directement au client
            Lire un fichier JSON: lire les données d'un fichier json cote serveur

        Pourquoi readFileSync n’est pas recommandé en production ?

            c'est une methode sync qui va bloque le traitement du script jusqu'à ce que la lecture du fichier soit terminer 

        Comment pourrait-on utiliser fs.promises pour une version asynchrone ?

            import la version async :  const fs= require('node:fs').promises

            En remplace ça :
            app.get('/api/products',(req,res)=>{
                const data=fs.readFileSync('./data/products.json');
                const products=JSON.parse(data);
                res.json(products);
            });
            Par:
            app.get('/api/products',async(req,res)=>{
                const data=await fs.readFile('./data/products.json');
                const products=JSON.parse(data);
                res.json(products);
            });
