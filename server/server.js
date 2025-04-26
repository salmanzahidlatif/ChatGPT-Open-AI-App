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

		const response = await client.responses.create({
			model: "gpt-4o",
			instructions: 'You are a coding assistant that talks like a pirate',
			input: prompt,
		});

		res.status(200).send({ bot: response.output_text });
	} catch (error) {
		console.error("OpenAI error:", error);
		res.status(500).send({ error: error.message });
	}
});

app.listen(5000, () => {
	console.log("Service is running on port http://localhost:5000");
});