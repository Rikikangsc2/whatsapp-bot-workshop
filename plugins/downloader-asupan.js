let handler = async (m, { conn }) => {
  const asupan = [
    "https://api.akuari.my.id/asupan/bocil",
    "https://api.akuari.my.id/asupan/cecan",
    "https://api.akuari.my.id/asupan/ukhty",
  ];
  try {
    const randomApiIndex = Math.floor(Math.random() * asupan.length);
    const apiUrl = asupan[randomApiIndex];
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data && data.respon) {
      await conn.sendFile(m.chat, data.respon, "asupan.mp4", "", m);
    } else {
      m.reply("Maaf, video asupan tidak ditemukan");
    }
  } catch (e) {
    console.log(e);
    m.reply("Maaf, terjadi kesalahan saat mengambil video asupan");
  }
};

handler.help = ["asupan"];
handler.tags = ["downloader"];
handler.command = /^asupan$/i;
handler.owner = false;
handler.premium = false;
handler.group = false;
handler.private = false;

module.exports = handler;