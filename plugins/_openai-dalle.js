const fetch = require("node-fetch");

async function query(data) {
  const response = await fetch("https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0", {
    headers: { Authorization: "Bearer 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" },
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`API request failed with status: ${response.status}`);
  }
  const buffer = await response.buffer();
  return buffer;
}

const handler = async (m, { conn, text, command }) => {
  if (!text) {
    m.reply(`*Contoh*: .${command} cute girl`);
  } else {
    m.reply("Please wait..."); // Assuming "wait" is a string
    try {
      const response = await query({ "inputs": text });
      conn.sendFile(m.chat, response, null, "done", m);
    } catch (err) {
      console.error("An error occurred while fetching a response from the API: ", err.message);
      m.reply("An error occurred while fetching a response from the API. Please try again later.");
    }
  }
};

handler.command = handler.help = ['aiimg', 'stablediff'];
handler.tags = ['ai'];
handler.premium = false;
handler.limit = false;

module.exports = handler;