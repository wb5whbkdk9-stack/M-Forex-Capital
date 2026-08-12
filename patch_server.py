import re

with open('server.ts', 'r') as f:
    content = f.read()

new_route = """
  // API Route for Market Briefing (Uses Google Search Tool)
  app.get("/api/market-briefing", async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: "API Key not configured" });
      }
      const ai = new GoogleGenAI({ apiKey });
      
      const prompt = `Search the web for the latest major Forex market news, economic events, and market sentiment for today. 
Summarize the findings into exactly 3 to 5 key headlines. 
Respond ONLY with a valid JSON array of objects. Do not include markdown code block formatting (like \`\`\`json).
Each object MUST have:
- "title": A short, punchy headline.
- "summary": A 1-2 sentence description of the news and its potential market impact.
- "source": The name of a news outlet (if known) or "Market Update".`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: prompt,
        config: {
            temperature: 0.2,
            tools: [{ googleSearch: {} }]
        }
      });

      let jsonText = response.text.trim();
      if (jsonText.startsWith('```json')) {
        jsonText = jsonText.replace(/^```json\n?/, '').replace(/\n?```$/, '');
      } else if (jsonText.startsWith('```')) {
         jsonText = jsonText.replace(/^```\n?/, '').replace(/\n?```$/, '');
      }

      try {
        const data = JSON.parse(jsonText);
        res.json({ articles: data });
      } catch (parseError) {
        console.error("Failed to parse JSON from model:", jsonText);
        res.status(500).json({ error: "Failed to parse market data" });
      }

    } catch (error: any) {
      console.error("Market Briefing API Error:", error);
      
      // Specifically handle quota errors
      if (error?.status === 429 || error?.message?.includes("quota")) {
        return res.status(429).json({ error: "API Quota Exceeded. Please check your billing details." });
      }
      
      res.status(500).json({ error: "Internal server error fetching market news." });
    }
  });

  // Vite middleware for development"""

content = content.replace("  // Vite middleware for development", new_route)

with open('server.ts', 'w') as f:
    f.write(content)
