const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const Database = require("better-sqlite3");
const db = new Database("../database/database.db");

router.post("/register", async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Tous les champs sont obligatoires."
        });
    }

    if (password.length < 8) {
        return res.status(400).json({
            message: "Le mot de passe doit contenir au moins 8 caractères."
        });
    }

    try {

        const existingUser = db
            .prepare("SELECT id FROM users WHERE email = ?")
            .get(email);

        if (existingUser) {
            return res.status(409).json({
                message: "Cette adresse e-mail est déjà utilisée."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const insertUser = db.prepare(`
            INSERT INTO users (name, email, password)
            VALUES (?, ?, ?)
        `);

        insertUser.run(name, email, hashedPassword);

        res.status(201).json({
            message: "Compte créé avec succès."
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Une erreur est survenue."
        });

    }
});
router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "L'e-mail et le mot de passe sont obligatoires."
        });
    }

    try {

        const user = db
            .prepare("SELECT * FROM users WHERE email = ?")
            .get(email);

        if (!user) {
            return res.status(401).json({
                message: "E-mail ou mot de passe incorrect."
            });
        }

        const passwordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordCorrect) {
            return res.status(401).json({
                message: "E-mail ou mot de passe incorrect."
            });
        }

        res.status(200).json({
            message: "Connexion réussie.",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Une erreur est survenue."
        });

    }

});
router.post("/transactions", (req, res) => {

    const { user_id, type, amount, category, description } = req.body;

    if (!user_id || !type || !amount || !category) {
        return res.status(400).json({
            message: "Tous les champs obligatoires doivent être remplis."
        });
    }

    if (type !== "revenu" && type !== "depense") {
        return res.status(400).json({
            message: "Le type de transaction est invalide."
        });
    }

    if (amount <= 0) {
        return res.status(400).json({
            message: "Le montant doit être supérieur à 0."
        });
    }

    try {

        const user = db
            .prepare("SELECT id FROM users WHERE id = ?")
            .get(user_id);

        if (!user) {
            return res.status(404).json({
                message: "Utilisateur introuvable."
            });
        }

        const insertTransaction = db.prepare(`
            INSERT INTO transactions
            (user_id, type, amount, category, description)
            VALUES (?, ?, ?, ?, ?)
        `);

        const result = insertTransaction.run(
            user_id,
            type,
            amount,
            category,
            description || ""
        );

        res.status(201).json({
            message: "Transaction ajoutée avec succès.",
            transactionId: result.lastInsertRowid
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Impossible d'ajouter la transaction."
        });

    }

});
router.get("/transactions/:userId", (req, res) => {

    const userId = req.params.userId;

    try {

        const transactions = db.prepare(`
            SELECT *
            FROM transactions
            WHERE user_id = ?
            ORDER BY date DESC
        `).all(userId);

        res.status(200).json(transactions);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Impossible de récupérer les transactions."
        });

    }

});

module.exports = router;