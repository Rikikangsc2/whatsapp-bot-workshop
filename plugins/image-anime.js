const axios = require('axios');

var handler = async (m, { conn, args, usedPrefix, command }) => {
    m.reply(wait);
    let url = `https://api.azz.biz.id/api/anime/${command}?key=alok`;
    let response = await axios.get(url, { responseType: 'arraybuffer' });
    conn.sendFile(m.chat, response.data, "", "", m);
}

handler.help = handler.command = ['umaru', 'kaneki', 'megumin', 'yotsuba', 'shinomiya', 'yumeko', 'tejina', 'chiho', 'toukachan', 'akira', 'itori', 'kurumi', 'sagiri', 'eba', 'deidara', 'itachi', 'madara', 'asuna', 'ayuzawa', 'chitoge', 'emilia', 'hestia', 'inori', 'ana', 'miku', 'kaori', 'shizuka', 'doraemon', 'kaga', 'kotori', 'mikasa', 'akiyama', 'gremory', 'isuzu', 'shina', 'kagura', 'shinka', 'tsunade', 'sasuke', 'sakura', 'rize', 'nezuko', 'boruto', 'naruto', 'erza', 'minato', 'elaina', 'yuri', 'shota', 'waifu', 'loli', 'hinata'];
handler.tags = ['image'];
handler.limit = true;

module.exports = handler;