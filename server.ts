import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GAS_URL } from "./src/config";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Use JSON middleware with appropriate limits
  app.use(express.json({ limit: '10mb' }));

  // Proxied registration endpoint
  app.post("/api/register", async (req, res) => {
    try {
      const payload = req.body;
      const gasUrl = GAS_URL;

      console.log('Proxying registration request to Google Apps Script. URL:', gasUrl);
      const response = await fetch(gasUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Google Apps Script responded with HTTP status ${response.status}`);
      }

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseErr) {
        console.error('Failed to parse Google Apps Script response as JSON. Original response:', text);
        throw new Error('Invalid JSON response format from Google Apps Script Web App.');
      }

      console.log('Response received from Google Apps Script successfully:', data);
      return res.json(data);
    } catch (error: any) {
      console.error('Server side proxy registering error:', error);
      return res.status(500).json({
        success: false,
        error: error.message || 'Server-side registration proxy request failed.'
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Support wildcard routing
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
