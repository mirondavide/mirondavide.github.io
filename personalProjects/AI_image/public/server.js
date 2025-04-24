// server.js
const express = require("express");
const fetch = require("node-fetch");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/generate", async (req, res) => {
    const { model, prompt, width, height } = req.body;

    try {
        const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
                "Content-Type": "application/json",
                "x-use-cache": "false",
            },
            body: JSON.stringify({
                inputs: prompt,
                parameters: { width, height },
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            return res.status(response.status).json({ error: error.error });
        }

        const blob = await response.buffer();
        res.set("Content-Type", "image/png");
        res.send(blob);
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
