export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { prompt } = req.body;
    // We use the key you already put in Vercel
    const apiKey = process.env.OPENAI_API_KEY; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();

    // Mapping Gemini's response to match your Frontend logic
    if (data.candidates && data.candidates[0].content.parts[0].text) {
      return res.status(200).json({
        choices: [{
          message: {
            content: data.candidates[0].content.parts[0].text
          }
        }]
      });
    } else {
      throw new Error("Invalid response from Gemini");
    }

  } catch (error) {
    return res.status(500).json({ error: "Generation failed" });
  }
}
