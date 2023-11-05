const axios = require('axios');

// Define a separate async function to fetch TikTok data
const fetchTikTokData = async (text) => {
  const apiUrl = `https://api-miftah.xyz/api/downloader/tiktok-s3?api_key=${miftah}&video_url=${text}`;
  const response = await axios.get(apiUrl);
  return response.data && response.data.data ? response.data.data : null;
};

// Define the main handler function
const handler = async (m, { conn, text }) => {
  if (!text) {
    m.reply("Masukkan URL TikTok");
  } else {
    m.reply("Tunggu sebentar...");

    try {
      const tikTokData = await fetchTikTokData(text);

      if (tikTokData) {
        const title = tikTokData.title || "TikTok Video";
        const caption = tikTokData.caption || "";
        const videoUrl = tikTokData.nowm;

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

handler.command = ['tt', 'tiktok'];
handler.tags = ['downloader'];
handler.premium = false;
handler.limit = false;

module.exports = handler;