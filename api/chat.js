export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "user",
          content: message
        }
      ]
    })
  });

  const data = await response.json();

  console.log(data);

  if (data.error) {
    return res.status(500).json({
      reply: data.error.message
    });
  }

  res.status(200).json({
    reply: data.choices[0].message.content
  });
}
