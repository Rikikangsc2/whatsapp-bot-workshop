const { sticker5 } = require('../lib/sticker');
const fetch = require('node-fetch');

const errorImage = 'https://telegra.ph/file/12141dd462ecabeed1347.png';

const getRandomSticker = (stickers) => {
  const randomIndex = Math.floor(Math.random() * stickers.length);
  return stickers[randomIndex];
};

const searchStickers = async (conn, m, text) => {
  try {
    const api_url = `https://api-miftah.xyz/api/searcher/sticker?api_key=${miftah}&sticker_name=${text}`;
    const response = await fetch(api_url);
    const data = await response.json();

    if (data.status === 'Success' && data.data.sticker_url.length > 0) {
      const stickers = data.data.sticker_url;
      const packname = data.data.title;

      const randomSticker = getRandomSticker(stickers);
      await conn.sendFile(m.chat, randomSticker, 'sticker.webp', '', m);
    } else {
      await conn.reply(m.chat, 'No stickers found for the provided name.', m);
    }
  } catch (e) {
    console.log(e);
    await conn.sendFile(m.chat, errorImage, 'error.webp', '', m);
  }
};

const handler = async (m, { conn, command }) => {
  if (command === 'sticker-search') {
    const text = m.text.split(' ')[1];
    
    if (!text) {
      return await conn.reply(m.chat, 'Please provide a sticker name to search.', m);
    }

    await searchStickers(conn, m, text);
  }
};

handler.command = handler.help = ['sticker-search'];
handler.tags = ['sticker'];
handler.limit = true;
module.exports = handler;