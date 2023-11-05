global.owner = ['6283808217881']  
global.mods = ['6283808217881'] 
global.prems = ['6283808217881']
global.nameowner = 'Ricky'
global.numberowner = '6283808217881' 
global.mail = 'sanasricky01@gmail.com' 
global.gc = 'https://chat.whatsapp.com/Eo2rMdkStSf3kAqnIR7aHE'
global.instagram = '-'
global.wm = '© ikyy'
global.wait = '_*Tunggu sedang di proses...*_'
global.eror = '_*Server Error*_'
global.stiker_wait = '*⫹⫺ Stiker sedang dibuat...*'
global.packname = 'Made With'
global.author = 'Bot WhatsApp'
global.maxwarn = '2' // Peringatan maksimum

//INI WAJIB DI ISI!//
global.azz = 'your_key' 
global.miftah = 'your_key'


let fs = require('fs')
let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})
