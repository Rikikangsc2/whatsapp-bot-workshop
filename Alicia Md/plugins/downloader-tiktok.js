const axios = require('axios');

// Define a separate async function to fetch TikTok data
const fetchTikTokData = async (text) => {
  const apiUrl = `https://api.azz.biz.id/api/tiktok?url=${text}&key=alok`;
  const response = await axios.get(apiUrl);
  return response.data && response.data.result ? response.data.result : null;
};

// Define the main handler function
const handler = async (m, { conn, text }) => {
  if (!text) {
    m.reply("Masukkan URL TikTok");
  } else {
m.reply(wait)
    try {
      const tikTokData = await fetchTikTokData(text);

      if (tikTokData) {
        const author = tikTokData.author;
        const video = tikTokData.video;

        const title = author.nickname || "TikTok Video";
        const caption = `Author: ${author.nickname}\nUnique ID: ${author.unique_id}`;
        const videoUrl = video.no_watermark_hd || video.no_watermark;

        const videoBuffer = await axios.get(videoUrl, { responseType: 'arraybuffer' });

        conn.sendFile(m.chat, videoBuffer.data, `${title}.mp4`, caption, m);
      } else {
        m.reply("Tidak dapat mengambil data TikTok. URL mungkin tidak valid.");
      }
    } catch (error) {
      console.error(error);
      m.reply("Terjadi kesalahan saat mengambil data TikTok.");
    }
  }
};

handler.command = ['tt','tiktok'];
handler.tags = ['downloader'];
handler.premium = false;
handler.limit = false;

module.exports = handler;