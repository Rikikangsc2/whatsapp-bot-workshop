var axios = require('axios');
var handler = async (m, { conn }) => {
  try {
    var dataGempa = [];
    var response = await axios.get('https://api.akuari.my.id/info/gempa');
    var res = response.data.result;
    var gambar = res.image;
    dataGempa.push({
      waktu: `${res.tanggal} ${res.jam}`,
      lintang: res.lintang,
      bujur: res.bujur,
      magnitude: res.magnitude,
      kedalaman: res.kedalaman,
      wilayah: res.wilayah,
      potensi: res.potensi
    });
    var caption = `Waktu : ${dataGempa[0].waktu}\nLintang : ${dataGempa[0].lintang}\nBujur : ${dataGempa[0].bujur}\nMagnitude : ${dataGempa[0].magnitude}\nKedalaman : ${dataGempa[0].kedalaman}\nWilayah : ${dataGempa[0].wilayah}\nPotensi : ${dataGempa[0].potensi}`;
    conn.sendFile(m.chat, gambar, 'map.png', caption, m);
  } catch (e) {
    console.log(e);
    conn.reply(m.chat, 'Terjadi kesalahan saat mengambil data gempa', m);
  }
};
handler.command = handler.help = ['infogempa', 'gempa'];
handler.tags = ['info'];
handler.premium = false;
handler.limit = true;
module.exports = handler;