export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { ticker } = req.body;
  if (!ticker) {
    return res.status(400).json({ error: "Ticker is required" });
  }

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_API_KEY) {
    return res.status(500).json({ error: "API key not configured" });
  }

  const system = `You are an elite equity research analyst. Analyze the given stock ticker and produce a comprehensive investment brief.
Use your knowledge of the company's business, financials, competitive position, and recent developments.
Be specific, data-informed, and balanced. Use actual company names, products, competitors, and numbers where you know them.

Respond ONLY with a valid JSON object — no markdown, no preamble, exactly this structure:
{
  "name": "Full Company Name",
  "ticker": "TICKER",
  "sector": "Sector / Industry",
  "verdict": "BULLISH" | "BEARISH" | "NEUTRAL",
  "summary": "2-sentence executive summary of the company and current investment thesis",
  "scores": {
    "growth": 7,
    "value": 5,
    "momentum": 8,
    "risk": 6
  },
  "bull": [
    "Bull point 1 (specific, concrete)",
    "Bull point 2",
    "Bull point 3"
  ],
  "bear": [
    "Bear point 1 (specific, concrete)",
    "Bear point 2",
    "Bear point 3"
  ],
  "catalysts": [
    "Upcoming catalyst 1",
    "Upcoming catalyst 2",
    "Upcoming catalyst 3"
  ],
  "risks": [
    { "name": "Risk factor 1", "level": "HIGH" | "MEDIUM" | "LOW" },
    { "name": "Risk factor 2", "level": "HIGH" | "MEDIUM" | "LOW" },
    { "name": "Risk factor 3", "level": "HIGH" | "MEDIUM" | "LOW" },
    { "name": "Risk factor 4", "level": "HIGH" | "MEDIUM" | "LOW" }
  ],
  "analyst": "2-3 sentence overall analyst take including key metrics like P/E, revenue growth, margin trends, and a closing view."
}
All scores are 1-10. Risk score: 10 = very high risk. Be accurate and specific to this company.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system,
        messages: [{ role: "user", content: `Analyze: ${ticker.toUpperCase()}` }],
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(502).json({ error: err.error?.message || "Anthropic API error" });
    }

    const data = await response.json();
    const raw = data.content.map((b) => b.text || "").join("");
    const clean = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return res.status(200).json(parsed);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to analyze ticker" });
  }
}
