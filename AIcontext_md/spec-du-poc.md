# Spec du POC   
   
Je suis un entrepreneur avec des bases avancées en programmation mais je reste débutant. Je veux que tu m'aides à coder une première version de l'application hub JOOTS qui servira de proof of concept ou POC pour tester l'idée et potentiellement aller chercher des financements.   
   
Ce POC sera une PWA et devra avoir un format optimisé pour les versions desktop et mobile.   
Tous les formulaires de ce POC et les requêtes devront tout de même être sécurisées pour éviter les hacks communs comme l'injection SQL, le Cross-Site Scripting ou le CSRF.

Ce POC contiendra simplement une page de connexion, la page d'accueil avec des boutons vers les 3 applications Socioscopy, Revelio et Icebreaker. dans le contexte de ce développement de POC, on ne développera qu'un version minimale de Icebreaker pour tester avoir des premiers retours utilisateurs.   
   
# Page de connexion - Joots Login.svg :   
- L'utilisateur arrive tout d'abord sur une landing page décrivant avec un ton énergique et éthique le concept de l'application HUB Joots.   
- Sous la description, un formulaire invite l'utilisateur à rentrer son adresse email. Cette adresse email est validée par le backend et stocké dans la base de données utilisateurs "jootsers".   
- Si l'email est nouveau dans la base de données, alors l'utilisateur est considéré comme nouveau. L'application doit alors lui associer un pseudo de type JoosterXXXXX, XXXXXX étant un nombre unique en vue de pseudonymiser le Jootser auprès du reste de la communauté. Le premier Jootser inscrit recevra le le nombre 2, le second le 3, et ainsi de suite par ordre croissant. Ce pseudo ne pourra pas être modifié.
Si l'email est déjà présent dans la base de données, alors l'application récupére le pseudo Jootser associé lors de sa précédente connexion.   
   
   
# Pages Hub :   
- Après avoir rentré son email et récupéré son pseudo, l'utilisateur arrive sur un carrousel de 3 landing pages : Socioscopy Landing.svg, Icebreaker Landing. svg, Revelio Landing.svg.   
- Il peut swiper d'une landing page à une autre en cliquant sur les flèches à gauche et à droite. Quand il a choisi son application, il peut cliquer sur le bouton "Commencer". Dans ce POC, seul le bouton de la page Icebreaker sera actif.   
   
   
# Page Profile - Profile.svg   
- Dans la page de profil, l'utilisateur peut voir une photo de profil circulaire unique à l'utilisateur à côté de son pseudo Jooster. La photo est générée à la création du compte à partir de Jdenticon. Le numéro dans le pseudo Jootser comme la photo ne pourra pour l'instant pas être modifié par l'utilisateur.   
- En dessous, on trouve le statut actif ou Hors-ligne de l'utilisateur   
- En dessous, une liste d'information spécifique à l'utilisateur à qui appartient le profil   
- Toutes ces informations sont récupérées par des requêtes frugales à la base de données utilisateurs

   
   
# Icebreaker Landing - Icebreaker Landing.svg:   
- Une fois dans la sous-app Icebreaker, l'utilisateur peut voir la liste des pseudos des autres Jootsers connectés en même temps que lui, comme illustré sur le fichier IcebreakerHome.svg   
- Il peut cliquer sur un des pseudos Jootser pour ouvrir un chat de discussion avec lui.    
   
   
# Icebreaker - Icebreaker Chat.svg:   
   
   
- Le chat de discussion est un chat classique de type Whatsapp, comme illustré sur IcebreakerChat.svg. Le stockage des messages se fera, comme expliqué dans la stack technique, sur une base données PostgreSQL avec de l'api Rest pour les requêtes à la base de données et l'utilisation du websocket pour la discussion temps réel.   
- La discussion entre les deux Jootsers qui ne se connaissent pas est facilitée par l'apparition de question-réponse au cours de l'échange. Voici comment cela fonctionne.    
    - Chaque Jootser de la discussion peut cliquer sur l'icone Icebreaker située en bas au centre de l'écran quand il est prêt à répondre à une nouvelle question choisie aléatoirement dans la base de données de questions. Quand il a cliqué, le fond du bouton derrière l'icone prend une couleur verte pour information.   
    - Dès que les deux Jootsers ont appuyé sur le bouton, une popup avec la question aléatoirement choisie apparait sur l'écran des deux Jootsers, ainsi que 3 boutons de réponse :  oui, non, je ne sais pas. Chaque Jootser choisit la réponse qu'il préfère et ces réponses sont enregistrées pour chaque utilisateur et chaque question dans la base de donnée.   
    - La question est alors retranscrit comme un message dans le chat avec un fond orange pour bien la distinguer des autres messages blanc et gris. Est également affichés la réponse de chaque Jootser comme illustré dans l'écran de la maquette. La réponse de l'utilisateur en font "Indie Flower" est affichée en haut à gauche du message et celui de son interlocuteur en bas à droite.   
    - Dès lors, le bouton en bas au centre Icebreaker est de nouveau sur fond blanc et actif pour être de nouveau cliqué par chaque Jootser.

   
   
   
