const fetch = require('node-fetch');
let handler = async (m, { conn, args, usedPrefix, command }) => {  
        if (!args[0]) throw `Gunakan contoh ${usedPrefix}${command} https://fb.watch/mcx9K6cb6t/?mibextid=8103lRmnirLUhozF`;
        try {
await m.reply(wait)
        const res = await fetch(`https://api.azz.biz.id/api/facebookdl?url=${args[0]}&key=alok`);
        const json = await res.json();
        let urls = json.result;
        if (!Array.isArray(urls)) {
            throw `Tidak dapat mendapatkan URL video dari tautan yang diberikan`;
        }
        for (let url of urls) {
            if (url.quality == "720p") {
                conn.sendFile(m.chat, url.url, 'fb.mp4', `*Facebook Downloader*`, m);
                break;
            }
        }
    } catch (error) {
        console.log(error);
        throw 'Terjadi kesalahan pada saat melakukan proses download';
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