import axios from "axios";
import { app } from "./app.js";

app.get("/", async (req, res) => {
	res.status(200).send({ message: "Hello from Local AI!" });
});

app.post("/", async (req, res) => {
	try {
		const prompt = req.body.prompt;

		if (!prompt || typeof prompt !== "string") {
			return res.status(400).json({ error: "Prompt is required" });
		}

		const ollamaRes = await axios.post("http://localhost:11434/api/generate", {
			model: "phi3", // or "llama3" based on what you have
			prompt,
			stream: false,
		});

		console.log("Ollama response:", ollamaRes);

		const text = ollamaRes.data?.response?.trim();

		if (!text) {
			return res.status(500).json({ error: "No response from model" });
		}

		res.status(200).json({ bot: text });
	} catch (error) {
		console.error("Ollama error:", error.message);
		res.status(500).json({ error: "Failed to generate response" });
	}
});

app.listen(3600, () => {
	console.log("🚀 Local AI Server running at http://localhost:3600");
});