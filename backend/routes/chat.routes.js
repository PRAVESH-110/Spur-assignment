import express from "express";
import { ChatOpenAI } from "@langchain/openai";
import Chat from "../models/chat.model.js";
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
      content: `You are a helpful support agent for a small e-commerce store which provides a wide range of products and all types of delivery services. Generate short and concrete results in simple paragraph format.`
    };

    const response = await llm.invoke([
      systemPrompt,
      { role: "user", content: message }
    ]);

    const chat = new Chat({
      message,
      response: response.content
    });
    await chat.save();

    res.json({ message: response.content });

  }

  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });

  }
})
export default router;