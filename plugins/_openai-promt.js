const fetch = require("node-fetch");

async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/Gustavosta/MagicPrompt-Stable-Diffusion",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer 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",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return await response.json();
}

let handler = async (m, { conn, text }) => {
  if (!text) {
    m.reply("Masukkan teks yang ingin dijadikan sebagai permintaan .aiimg");
  } else {
    m.reply(wait)
    try {
      const inputData = {
        inputs: text,
      };

      const response = await query(inputData);
      m.reply(response[0].generated_text);
    } catch (error) {
      m.reply("Terjadi kesalahan: " + error.message);
    }
  }
};

handler.command = handler.help = ["promt"];
handler.tags = ["ai"];
handler.premium = false;
handler.limit = false;

module.exports = handler;