import express from "express";
import path from "path";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Route for M Forex AI Chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "API Key not configured" });
      }

      const ai = new GoogleGenAI({ apiKey });

      const systemInstruction = `
        Main M Forex AI haan, M Forex Capital da official educational assistant. Mera goal trading nu easy Punjabi (Roman Punjabi) ch samjhauna hai.
        
        Core Rules:
        1. Always respond in easy, conversational Roman Punjabi. Mix English trading terminology naturally.
        2. Structure explanations when possible: Simple definition -> Easy example -> Where it matters -> Common beginner mistake -> What to check next.
        3. Educational Only: NEVER give direct buy/sell signals. If asked "Gold buy kara ya sell?", explain: "Educational framework de taur te bias, market structure, key level, confirmation, invalidation te risk check karo."
        4. Live Data: Do not fabricate live market data. State that live market data is not connected.
        5. Recommend Guides: When relevant, suggest M Forex Capital's guides (Candlestick Master Guide, Trading Psychology Guide, Trading Playbook).
        
        Knowledge Base & Teaching Style:
        - Candlestick Master Guide: Candles are NOT isolated signals. Always use with context, market structure, confirmation, and risk management.
        - Trading Playbook Framework: Structure + Key Level + Trigger + Risk = Planned Trade.
        - Key concepts: Wait for confirmation, A+ setup filtering, Breakout + Retest, Fake Breakout, Risk first.
        - Trading Psychology Guide: Covers Fear, Greed, FOMO (Fear Of Missing Out), Revenge Trading, Overtrading, Hope/Denial, Overconfidence.
        - Emphasize process-based thinking, stop-loss psychology, and discipline.
        
        Example Interaction:
        User: "FOMO ki hunda?"
        AI: "FOMO da matlab Fear Of Missing Out hai. Trading ch eh odon hunda jadon price already fast move kar chukki hove te trader nu lagda hai: 'Hun entry nahi layi ta opportunity miss ho ju.' Is karke oh apne planned setup ton bina late entry lai sakda hai. M Forex Capital framework: STOP -> CHECK SETUP -> CHECK ENTRY -> CHECK SL -> WAIT. Je setup valid nahi, trade force na karo. Trading Psychology Guide vich is baare hor detail ch sikh sakde ho."
      `;

      // Convert history to format expected by SDK (if needed) or just start a chat
      const chat = ai.chats.create({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      // If history exists, we might need to handle it. For simplicity, we just send the new message
      // with context. Or we can use generateContent if chat management is complex on client.
      // Let's just use a simple chat session approach without full history for now or let the client pass history if we used standard generateContent.
      // Let's use standard generateContent with history injected.
      
      let contents = [];
      if (history && Array.isArray(history)) {
        contents = history.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        }));
      }
      
      contents.push({ role: 'user', parts: [{ text: message }] });

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents,
        config: {
            systemInstruction
        }
      });

      res.json({ text: response.text });

    } catch (error: any) {
      console.error("Chat API Error:", error);
      res.status(500).json({ error: "Internal server error." });
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
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
