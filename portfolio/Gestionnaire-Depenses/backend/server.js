const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 3000;

const authRoutes = require("./routes/auth");

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);

app.get("/", (req, res) => {
    res.send("Serveur Gestionnaire de Dépenses fonctionne !");
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});