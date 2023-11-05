const fetch = require('node-fetch')

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `Mana Link nya`

    try {
        await m.reply(wait)
        const api = await fetch(`https://api-miftah.xyz/api/downloader/instagram-s2?api_key=${miftah}&target_url=${args[0]}`)
        const res = await api.json()

        for (let i of res.data) {
            conn.sendFile(m.chat, i.url, null, `*Instagram Downloader*`, m)
        }
    } catch (e) {
        throw `*Server Down!*`
    }
}

handler.help = ['instagram'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(ig|instagram|igdl|instagramdl|igstroy)$/i
handler.limit = true

module.exports = handler