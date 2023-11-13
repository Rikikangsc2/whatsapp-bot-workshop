const uploadImage = require('../lib/uploadImage');
const axios = require('axios');

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  
  if (!mime.startsWith('image/')) {
    m.reply('Hanya gambar yang dapat diproses, bukan video atau gif.');
    return; // Exit the function
  }
  
  let media = await q.download();
  let link = await uploadImage(media);
  await m.reply('Menunggu...');
  
  // Construct the API URL
  const apiUrl = `https://api.azz.biz.id/api/image2promt?url=${encodeURIComponent(link)}&key=${azz}`;
  
  // Send a GET request to the API
  try {
    const response = await axios.get(apiUrl);
    const generatedText = response.data.text[0].generated_text;
    
    m.reply(`.aiimg ${generatedText}`);
  } catch (error) {
    console.error(error);
    m.reply('Terjadi kesalahan saat mengakses API.');
  }
};

handler.help = handler.command = ["prompt","i2p"];
handler.tags = ['ai'];

module.exports = handler;