import re

with open('server.ts', 'r') as f:
    content = f.read()

# Replace model and add google search tool
new_api_logic = """
      let contents = [];
      if (history && Array.isArray(history)) {
        contents = history.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        }));
      }
      
      contents.push({ role: 'user', parts: [{ text: message }] });

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents,
        config: {
            systemInstruction,
            temperature: 0.7,
            tools: [{ googleSearch: {} }]
        }
      });

      res.json({ text: response.text });
"""

content = re.sub(r'      // Convert history to format expected by SDK.*?res\.json\(\{ text: response\.text \}\);', new_api_logic, content, flags=re.DOTALL)

with open('server.ts', 'w') as f:
    f.write(content)
