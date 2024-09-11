const { exec } = require("child_process");
const { error } = require("console");
const execSync = require("child_process").execSync;
var player = require("play-sound")((opts = {}));
const fs = require("fs");
const path = require("path");
const { stdout, stderr, resourceUsage } = require("process");
//const util = require("util");

async function main() {
  // workflouck
  let aux = await execShowInfo();
  console.log(`Aux : ${JSON.stringify(aux)}`);

  // Directorio donde se encuentran tus archivos de música
  const musicDir = "./media";

  // Obtener lista de canciones
  const songs = fs
    .readdirSync(musicDir)
    .filter((file) => path.extname(file).toLowerCase() === ".mp3");

  while (true) {
    if (aux.percentage > 20 && aux.state === "discharging") {
      const songPath = path.join(musicDir, songs[0]);
      console.log(`Reproduciendo: ${songs[1]}`);

      player.play(songPath, (err) => {
        if (err) console.log(`Error al reproducir: ${err}`);
      });
    }
  }
}
//aux functions

async function execShowInfo() {
  exec(
    'upower -i /org/freedesktop/UPower/devices/battery_BAT0 | grep -E "state|percentage"',
    (err, stdout, stderr) => {
      if (err) {
        console.error(`Error exec ${err}`);
      }
      let filteredInfo = filterInformation(stdout);
      console.log(filteredInfo);
    },
  );

  //  return filteredInfo;
}

function exeShowThen() {
  let info;
  let promise = new Promise((resolve, rejects) => {
    exec(
      'upower -i /org/freedesktop/UPower/devices/battery_BAT0 | grep -E "state|percenta"',
      (err, stdout, stderr) => {
        resolve(stdout);
      },
    );
  });
  promise
    .then((result) => {
      info = filterInformation(result);

      console.log(`Info :::: ${info.state}`);
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
}

/**
 * @param {string} text
 * */
function filterInformation(text) {
  console.log("Filter function");
  let info = {
    state: "",
    percentage: 0,
  };

  let infoBatery = text.split(" ").join("");
  let infoWhitOutNline = infoBatery.split("\n").join("");

  let arrayWords = infoWhitOutNline.split(":");
  arrayWords[1] = arrayWords[1].replace("percentage", "");
  arrayWords[2] = arrayWords[2].replace("%", "");
  info.state = arrayWords[1];
  info.percentage = parseInt(arrayWords[2]);

  return info;
}

function startPlay() {
  const musicDir = "./media";
  // Obtener lista de canciones
  const songs = fs
    .readdirSync(musicDir)
    .filter((file) => path.extname(file).toLowerCase() === ".mp3");

  const songPath = path.join(musicDir, songs[0]);
  console.log(`Reproduciendo: ${songs[1]}`);

  player.play(songPath, (err) => {
    if (err) console.log(`Error al reproducir: ${err}`);
  });
}
//startPlay();
//execShowInfo();
exeShowThen();
