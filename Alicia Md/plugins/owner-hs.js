// plugins clear sesion👩‍🍳
// jan di sebarin y👩🏻‍🚀
const { tmpdir } = require('os')
const { join } = require('path')
const path = require('path')
const fs = require('fs');
const { 
  readdirSync,
  statSync,
  unlinkSync,
  existsSync,
  readFileSync,
  watch 
} = require('fs')

let handler = async (m, { args, text }) => {

  deleteFiles(`./sessions`)
  m.reply('Berhasil menghapus sessions!')
  
  function deleteFiles(filenya) {
    fs.readdir(filenya, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        if (file !== 'creds.json') {
          fs.unlink(path.join(filenya, file), err => {
            if (err) throw err;
          });
        }
      }
    });
  }
}
handler.menuowner = ['hs']
handler.tag = ['owner']
handler.command = /^(hs)$/i

handler.owner = true

module.exports = handler