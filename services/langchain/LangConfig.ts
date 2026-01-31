import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const IntelliPipeModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
});

export default IntelliPipeModel;
