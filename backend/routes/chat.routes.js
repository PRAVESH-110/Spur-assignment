import express from "express";
import { ChatOpenAI } from "@langchain/openai";

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    const llm = new ChatOpenAI({
      model: "gpt-4o-mini",
      temperature: 0.2,
      apiKey: process.env.OPENAI_API_KEY,
    });

    const systemPrompt = {
      role: "system",
      content: ``
    };

    const response = await llm.invoke([
      systemPrompt,
      { role: "user", content: message }
    ]);

    res.json({ message: response.content });
  }

  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });

  }
})
export default router;