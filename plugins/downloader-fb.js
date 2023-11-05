const fetch = require('node-fetch');
let handler = async (m, { conn, args, usedPrefix, command }) => {  
    if (!args[0]) {
        return conn.reply(m.chat, `Gunakan contoh ${usedPrefix}${command} https://www.facebook.com/100010929794713/posts/1885825845125057/`, m);
    }
    try {
        await m.reply(wait)
        const res = await fetch(`https://api.azz.biz.id/api/facebookdl?url=${args[0]}&key=${azz}`);
        const json = await res.json();
        let urls = json.result;
        if (!Array.isArray(urls)) {
            return conn.reply(m.chat, `Tidak dapat mendapatkan URL video dari tautan yang diberikan`, m);
        }
        for (let url of urls) {
            if (url.quality == "720p") {
                conn.sendFile(m.chat, url.url, 'fb.mp4', `*Facebook Downloader*`, m);
                break;
            }
        }
    } catch (error) {
        console.log(error);
        conn.reply(m.chat, 'Terjadi kesalahan pada saat melakukan proses download', m);
    }
}
handler.help = ['facebook'].map(v => v + ' <url>');
handler.command = /^(fb|facebook|facebookdl|fbdl|fbdown|dlfb)$/i;
handler.tags = ['downloader'];
handler.limit = true;
handler.group = false;
handler.premium = false;
handler.owner = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;
handler.private = false;
module.exports = handler;