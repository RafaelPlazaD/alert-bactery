// this comment
const player = require('play-sound')(opts = {})
const fs = require('fs')
const path = require('path')

// Directorio donde se encuentran tus archivos de música
const musicDir = './media'

// Obtener lista de canciones
const songs = fs.readdirSync(musicDir).filter(file => path.extname(file).toLowerCase() === '.mp3')

console.log('Lista de canciones:')
songs.forEach((song, index) => {
  console.log(`${index + 1}. ${song}`)
})

// Función para reproducir una canción
function playSong(songIndex) {
  if (songIndex < 1 || songIndex > songs.length) {
    console.log('Número de canción inválido')
    return
  }

  const songPath = path.join(musicDir, songs[songIndex - 1])
  console.log(`Reproduciendo: ${songs[songIndex - 1]}`)

  player.play(songPath, (err) => {
    if (err) console.log(`Error al reproducir: ${err}`)
  })
}

// Leer la entrada del usuario
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.question('Ingresa el número de la canción que quieres reproducir: ', (answer) => {
  playSong(parseInt(answer))
  readline.close()
})
