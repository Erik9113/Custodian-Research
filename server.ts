import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Enable JSON request parsing
  app.use(express.json());

  // Simple academic prompt route (return static mock response as fallback)
  app.post("/api/generate-prompt", (req, res) => {
    const { topic } = req.body;
    const keywords = topic || "Interdisciplinary and Niche Research";
    res.json({
      success: true,
      prompt: `Develop a comprehensive predictive analytics tool inspecting real-time patterns in ${keywords}. Deliverables include telemetry visualizers and a 2-page project report.`
    });
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
