import OpenAI from "openai";
import { app } from "./app.js";

const client = new OpenAI({
	apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

app.get("/", async (req, res) => {
	res.status(200).send({ message: "Hello from the AI World!" });
});

app.post("/", async (req, res) => {
	try {
		const prompt = req.body.prompt;

		if (!prompt) {
			return res.status(400).send({ error: "Prompt is required" });
		}

		const response = await client.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [{ role: "user", content: prompt }],
			temperature: 0,
			max_tokens: 3000,
			top_p: 1,
			presence_penalty: 0,
		});
		
		if (!response || !response.choices || response.choices.length === 0) {
			return res.status(500).send({ error: "No response from OpenAI" });
		}
		if (!response.choices[0].message || !response.choices[0].message.content) {
			return res.status(500).send({ error: "No content in OpenAI response" });
		}


		res.status(200).send({ bot: response.choices[0].message.content });
	} catch (error) {
		console.error("OpenAI error:", error);
		res.status(500).send({ error: error.message });
	}
});

app.listen(3600, () => {
	console.log("Service is running on port http://localhost:3600");
});