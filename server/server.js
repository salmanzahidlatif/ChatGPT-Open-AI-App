import OpenAI from "openai";
import { app } from "./app.js";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get("/", async (req, res) => {
	res.status(200).send({ message: "Hello from the AI World!" });
});

app.post("/", async (req, res) => {
	try {
		const prompt = req.body.prompt;

		const response = await openai.completions.create({
			model: "text-davinci-003",
			prompt,
			temperature: 0,
			max_tokens: 3000,
			top_p: 1,
			frequency_penalty: 0.5,
			presence_penalty: 0,
		});

		res.status(200).send({ bot: response.choices[0]?.text });
	} catch (error) {
		console.error("OpenAI error:", error);
		res.status(500).send({ error: error.message });
	}
});

app.listen(5000, () => {
	console.log("Service is running on port http://localhost:5000");
});