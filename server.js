import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

app.post("/ask", async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(req.body.prompt);
        const response = await result.response;
        res.json({ answer: response.text() });
    } catch (err) {
        res.status(500).json({ error: "Erreur IA" });
    }
});

app.listen(3000, () => console.log("Serveur IA lancé sur http://localhost:3000"));
