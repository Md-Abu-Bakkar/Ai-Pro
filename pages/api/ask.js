import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { code } = req.body;

    try {
      const aiResponse = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Suggest improvements for the following code:\n\n${code}`,
        max_tokens: 150,
        temperature: 0.5,
      });

      res.status(200).json({ text: aiResponse.data.choices[0].text.trim() });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong." });
    }
  }
}
