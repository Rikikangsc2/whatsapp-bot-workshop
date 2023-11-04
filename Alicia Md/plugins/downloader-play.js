const axios = require('axios');

const handler = async (m, { conn, text }) => {
  if (!text) {
    return m.reply("Masukkan judul video YouTube yang ingin Anda cari.");
  }

  const apiUrl = `https://api.azz.biz.id/api/play?q=${text}&key=alok`;

  try {
    const response = await axios.get(apiUrl);
    const { videoInfo, mp3 } = response.data;

    const responseText = `
      Judul: ${videoInfo.title}
      Link: ${videoInfo.link}
      Deskripsi: ${videoInfo.description}
      Durasi: ${videoInfo.durationString}
      Ditonton: ${videoInfo.views} kali
      Diunggah: ${videoInfo.uploaded}
    `;

    m.reply(responseText);

    // Kirim audio
    conn.sendMessage(m.chat, { audio: { url: mp3 }, mimetype: 'audio/mpeg' }, { quoted: m });
  } catch (error) {
    console.error(error);
    m.reply("Terjadi kesalahan saat mencari video.");
  }
};
handler.help = ['play'];
handler.command = ['play'];
handler.tags = ['downloader'];
handler.premium = false;
handler.limit = false;

module.exports = handler;