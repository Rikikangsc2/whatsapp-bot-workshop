const axios = require('axios');

const handler = async (m, { conn }) => {
  try {
    const response = await axios.get('https://api.azz.biz.id/api/gempa?key='+azz);
    const res = response.data;
    const gambar = res.Shakemap.url;

    const dataGempa = {
      tanggal: res.Tanggal,
      jam: res.Jam,
      lintang: res.Lintang,
      bujur: res.Bujur,
      magnitude: res.Magnitude,
      kedalaman: res.Kedalaman,
      wilayah: res.Wilayah,
      potensi: res.Potensi,
      dirasakan: res.Dirasakan,
    };

    const caption = `Tanggal : ${dataGempa.tanggal}\nJam : ${dataGempa.jam}\nLintang : ${dataGempa.lintang}\nBujur : ${dataGempa.bujur}\nMagnitude : ${dataGempa.magnitude}\nKedalaman : ${dataGempa.kedalaman}\nWilayah : ${dataGempa.wilayah}\nPotensi : ${dataGempa.potensi}\nDirasakan : ${dataGempa.dirasakan}`;
    
    conn.sendFile(m.chat, gambar, 'map.png', caption, m);
  } catch (e) {
    console.log(e);
    conn.reply(m.chat, 'Terjadi kesalahan saat mengambil data gempa\n'+e, m);
  }
};

handler.command = handler.help = ['infogempa', 'gempa'];
handler.tags = ['info'];
handler.premium = false;
handler.limit = true;
module.exports = handler;