const fetch = require('node-fetch');

const handler = async (m, {
    text,
    usedPrefix,
    command
}) => {
    if (!text) throw `Masukkan pertanyaan!\n\n*Contoh:* Siapa presiden Indonesia? `

    try {
        conn.sendPresenceUpdate("recording", m.chat);
        const query = m.quoted && m.quoted.text ? `pesan sebelumnya: "${m.quoted.text}"\n\n${text}` : `${text}`;
        const apiUrl = `https://api.azz.biz.id/api/alicia?q=${encodeURIComponent(query)}&user=${m.chat}&key=alok`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data && data.respon) {
            await m.reply(data.respon);
        } else {
            throw "Tidak ada respons yang valid dari API.";
        }
    } catch (err) {
        console.error(err);
        throw "Terjadi kesalahan dalam menjawab pertanyaan";
    }
}

handler.command = handler.help = ['ai', 'openai', 'chatgpt'];
handler.tags = ['ai'];
handler.premium = false;

module.exports = handler;