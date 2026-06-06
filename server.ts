import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable JSON request parsing
  app.use(express.json());

  // Lazy-loaded Gemini AI client helper
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient() {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        throw new Error("GEMINI_API_KEY environment variable is not configured. Please add it via the Secrets panel in AI Studio.");
      }
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return aiClient;
  }

  // API endpoint for prompt generator
  app.post("/api/generate-prompt", async (req, res) => {
    try {
      const { topic, context } = req.body;
      const client = getGeminiClient();

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Create a professional, highly specific, and academic research project prompt for university student applicants.
Topic/Keywords: ${topic || "Interdisciplinary and Niche Research"}
Context/Basic Info: ${context || "A student-designed solution or research analysis."}

The response should be 1-2 paragraphs detailing a clear, practical engineering, software, design, or scientific prompt. Include specific requirements (e.g., key datasets to explore, prototype outputs like software or simulation, and abstract submission). Do not output markdown lists, just a single, polished professional task narrative.`,
        config: {
          systemInstruction: "You are an expert director of a highly prestigious, interdisciplinary university research lab. You design exceptionally creative, challenging, and niche research prompts to recruit the brightest students.",
          temperature: 0.8,
        },
      });

      const text = response.text;
      res.json({ success: true, prompt: text });
    } catch (error: any) {
      console.error("Gemini Generation Error:", error);
      res.status(500).json({ 
        success: false, 
        message: error.message || "An unexpected error occurred during prompt generation." 
      });
    }
  });

  // Vite Integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server", err);
});
