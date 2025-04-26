import { pipeline } from '@huggingface/transformers';
import { app } from "./app.js";

app.get("/", async (req, res) => {
	res.status(200).send({ message: "Hello from the AI World!" });
});

app.post('/', async (req, res) => {
	try {
		const prompt = req.body.prompt;
		if (!prompt) {
			return res.status(400).send({ error: "Prompt is required" });
		}

		// const pipe = await pipeline('text-generation', 'HuggingFaceTB/SmolLM2-135M-Instruct');
		// const pipe = await pipeline('text2text-generation', 'teapotai/teapotllm');
		const pipe = await pipeline('text-generation', 'Xenova/distilgpt2', {
			dtype: 'q8',
		});

		const result = await pipe(prompt, {
			max_length: 100,
			num_return_sequences: 1,
			top_k: 50,
			top_p: 0.95,
			temperature: 0.7,
		});

		const generatedText = result?.[0]?.generated_text?.trim();

		if (!generatedText) {
			throw new Error("No generated text returned from model.");
		}

		res.status(200).send({ bot: generatedText });
	} catch (error) {
		console.error("Error:", error);
		res.status(500).send({ error: error.message || "Internal Server Error" });
	}
});

app.listen(5000, () => {
	console.log("Service is running on port http://localhost:5000");
});