# Description de la fonctionnalité chat 

Le chat de discussion est un chat classique de type Whatsapp, comme illustré dans l'image jointe au prompt, respectant la charte graphique et notamment les couleurs et police : 

Blanc: #FFFFFF
Bleu: #5211CE
Vert: #3CBF77
Orange: #E59C45
Gris Clair: #E6E6E6
Gris Foncé: #999999   
   
Font de toute l'interface : Roboto   
Fond des réponses : Indie Flower 

## Fonctionnement du chat

Concernant, le chat. Il devra reprendre toutes les fonctionnalités d'un chat classique comme Whatsapp.
### Envoi et réception de messages :
Lorsqu’un utilisateur envoie un message, il transite via Socket.IO jusqu’au serveur.
Le backend traite le message (validation, timestamp, ID unique, etc.) et le publie dans Redis si l’utilisateur destinataire est sur un autre nœud (scalabilité).
Le serveur envoie ensuite le message aux bons sockets (locaux ou via Redis pub/sub).

### Stockage des messages :

En parallèle, les messages sont enregistrés dans la base de données (par exemple PostgreSQL), avec les métadonnées nécessaires (sender, recipient, timestamp, etc.).

### Mise à jour de l’interface :

Le frontend Next.js utilise Zustand pour stocker les messages dans l’état local de l’app.
À la réception d’un nouveau message via Socket.IO, Zustand met à jour les composants concernés (liste des messages, notifications, etc.).


### Fonctionnalités supplémentaires prévues :

Même système que Whatsapp d'accusé de bonne réception avec une premiere coche bleue, puis de lecture avec une seconde coche qui passe du grisé au bleu.
On doit voir le statut en ligne ou hors ligne sous forme de pastille sur l'avatar
La synchronisation multi-device doit etre effective

## Spécificité JOOTS
  
- La discussion entre les deux Jootsers qui ne se connaissent pas est facilitée par l'apparition de question-réponse au cours de l'échange. Voici comment cela fonctionne.    
    - Chaque Jootser de la discussion peut cliquer sur l'icone Icebreaker située en bas au centre de l'écran quand il est prêt à répondre à une nouvelle question choisie aléatoirement dans la base de données de questions. Quand il a cliqué, le fond du bouton derrière l'icone prend une couleur verte pour information.   
    - Dès que les deux Jootsers ont appuyé sur le bouton, une popup avec la question aléatoirement choisie apparait sur l'écran des deux Jootsers, ainsi que 3 boutons de réponse :  oui, non, je ne sais pas. Chaque Jootser choisit la réponse qu'il préfère et ces réponses sont enregistrées pour chaque utilisateur et chaque question dans la base de donnée.   
    - La question est alors retranscrit comme un message dans le chat avec un fond orange pour bien la distinguer des autres messages blanc et gris. Est également affichés la réponse de chaque Jootser comme illustré dans l'écran de la maquette. La réponse de l'utilisateur en font "Indie Flower" est affichée en haut à gauche du message et celui de son interlocuteur en bas à droite.   
    - Dès lors, le bouton en bas au centre Icebreaker est de nouveau sur fond blanc et actif pour être de nouveau cliqué par chaque Jootser.