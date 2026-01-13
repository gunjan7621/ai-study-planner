export default async function handler(req, res) {
  // 1. Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;
    const apiKey = process.env.OPENAI_API_KEY;

    // 2. Safety Check: If the key is missing, don't let the app crash
    if (!apiKey) {
      return res.status(500).json({ error: "Server Configuration Error: API Key missing." });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();

    // 3. Handle Gemini-specific response structure
    if (data.candidates && data.candidates[0].content) {
      return res.status(200).json({
        choices: [{
          message: {
            content: data.candidates[0].content.parts[0].text
          }
        }]
      });
    } else {
      // Log the error so you can see it in Vercel Logs
      console.error("Gemini API Error Response:", data);
      return res.status(500).json({ error: "AI failed to respond. Check logs." });
    }

  } catch (error) {
    console.error("Server Crash Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
