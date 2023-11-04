const uploadImage = require('../lib/uploadImage');
const axios = require('axios');

let handler = async (m) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  
  if (!mime.startsWith('image/')) {
    throw 'Hanya gambar yang dapat diproses, bukan video atau gif.';
  }
  m.reply("*tunggu kak*")
  let media = await q.download();
  let link = await uploadImage(media);
  
  // Construct the API URL
  const apiUrl = `https://api.azz.biz.id/api/image2promt?url=${encodeURIComponent(link)}&key=alok`;
  
  // Send a GET request to the API
  try {
    const response = await axios.get(apiUrl);
    const generatedText = response.data.text[0].generated_text;
    
    m.reply(`*URL Gambar:* ${link}\n\n*Promt* : ${generatedText}`);
  } catch (error) {
    console.error(error);
    throw 'Terjadi kesalahan saat mengakses API.';
  }
};

handler.help = ['img2promt'];
handler.tags = ['ai'];
handler.command = /^(img2promt)$/i;

module.exports = handler;