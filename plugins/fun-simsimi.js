let fetch = require('node-fetch')
let handler = async (m, { text }) => {
  if (!text) return m.reply('Masukan pertanyaan!')
  try {
await m.reply(wait)
    let res = await fetch(`https://api.azz.biz.id/api/simsimi?q=${encodeURIComponent(text)}&key=${azz}`)
    let json = await res.json()
    m.reply(json.respon)
  } catch (e) {
    return m.reply('Internal server error!')
  }
}
handler.help = ['simi', 'simsimi', 'simih'].map(v => v + ' <teks>')
handler.tags = ['fun']
handler.command = /^((sim)?simi|simih)$/i

module.exports = handler