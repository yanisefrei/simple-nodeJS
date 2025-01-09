const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

const users = [
    { id: 1, firstName: "John", lastName: "Doe", role: "admin" },
    { id: 2, firstName: "Jane", lastName: "Smith", role: "user" },
    { id: 3, firstName: "Alice", lastName: "Johnson", role: "moderator" },
    { id: 4, firstName: "Bob", lastName: "Brown", role: "user" },
    { id: 5, firstName: "Charlie", lastName: "Davis", role: "admin" },
]

// GET : LIRE tous les utilisateurs
app.get("/", (req, res) => {
    res.json(users)
})
// POST : CRÉER un nouvel utilisateur, basé sur les données passées dans le corps(body) de la requête
app.post("/", (req, res) => {
// récupérer toutes les données qui arrivent dans le corps de la requête (body)
    const { firstName, lastName } = req.body
    // récupérer l'ID du dernier utilisateur
    const lastId = users[users.length - 1].id
    // ajouter un pour créer un utilisateur unique
    const newId = lastId + 1
    // créer le nouvel utilisateur avec les données du corps
    const newUser = {
        firstName,
        lastName,
        id: newId,
    }
    // ajouter le nouvel utilisateur à notre liste d'utilisateurs en utilisant la méthode 'push'
    users.push(newUser)
    // envoyer le code de statut 201
    res.status(201).json(newUser)
})

app.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    // trouve son index, verifier si le userIndex est positive

    const userIndex = users.findIndex((user) => user.id === id);
    // utilisateur non trouvé
    if (userIndex < 0) {
        return res.status(404).json({ msg: "utilisateur non trouvé" });
    }
// si el est trouvé, nous vérifions quelles valeurs ont été envoyées
    const { firstName, lastName } = req.body;

    if (firstName) users[userIndex].firstName = firstName;
    if (lastName) users[userIndex].lastName = lastName;

    res.json({
        msg: "utilisateur mis à jour",
        user: users[userIndex],
    });
});

app.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    // trouver son index, verifier si le userIndex est positive
    const userIndex = users.findIndex((user) => user.id === id);
// utilisateur non trouvé
    if (userIndex < 0) {
        return res.status(404).json({ msg: "utilisateur non trouvé" });
    }

    users.splice(userIndex, 1);

    res.json({
        msg: "utilisateur supprimé",
    });
});

app.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    // trouver son index, verifier si le userIndex est positive
    const userIndex = users.findIndex((user) => user.id === id);
// utilisateur non trouvé
    if (userIndex < 0) {
        return res.status(404).json({ msg: "utilisateur non trouvé" });
    }

    res.json(users[userIndex]);
});

app.listen(port, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});