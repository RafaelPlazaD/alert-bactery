const { exec, execSync } = require("child_process");
const { promisify } = require("util");
var player = require("play-sound")((opts = {}));
const fs = require("fs");
const path = require("path");
const { stdout } = require("process");
const execAsync = promisify(exec);

function getInfoBatery() {
  try {
    let stdout = execSync(
      'upower -i /org/freedesktop/UPower/devices/battery_BAT0 | grep -E "state|percentage"',
    );

    let info = filterInformation("" + stdout);
    return info;
  } catch (err) {
    console.error(err.toString());
  }
}
async function syncFuntion() {
  try {
    const wait = (t) =>
      new Promise((resolve, reject) => setTimeout(resolve, t));

    do {
      const musicDir = "./media";
      let info = getInfoBatery();
      //  get list of sounds
      const songs = fs
        .readdirSync(musicDir)
        .filter((file) => path.extname(file).toLowerCase() === ".mp3");

      if (info.percentage > 20 && info.state === "discharging") {
        // const songPath = path.join(musicDir, songs[0]);
        // console.log(`Reproduciendo: ${songs[1]}`);

        // player.play(songPath, (err) => {
        //   if (err) console.log(`Error al reproducir: ${err}`);
        // });

        //check is chargin

        let isNotCharging = true;
        do {
          let info = getInfoBatery();

          if (info.state === "charging") {
            isNotCharging = false;
          }

          console.log("into loop intern");
          await wait(5000);
        } while (isNotCharging);
      }

      await wait(5000);

      console.log(`afther ${JSON.stringify(info)}`);
    } while (true);
  } catch (err) {
    console.error(`Error ${err.toString()}`);
  }
}
async function execShowInfo() {
  try {
    const { stdout } = await execAsync(
      'upower -i /org/freedesktop/UPower/devices/battery_BAT0 | grep -E "state|percentage"',
    );
    return filterInformation(stdout);
  } catch (error) {
    console.error("Error executing command:", error);
    return null;
  }
}

function filterInformation(text) {
  let info = {
    state: "",
    percentage: 0,
  };

  const lines = text.trim().split("\n");
  lines.forEach((line) => {
    const [key, value] = line.split(":").map((item) => item.trim());
    if (key === "state") {
      info.state = value;
    } else if (key === "percentage") {
      info.percentage = parseInt(value);
    }
  });

  return info;
}

async function checkBatteryStatus(threshold) {
  const batteryInfo = await execShowInfo();
  if (batteryInfo && batteryInfo.percentage > threshold) {
    console.log(`¡Alerta! Batería baja: ${batteryInfo.percentage}%`);
    // Aquí puedes agregar el código para emitir un sonido
  }
}

// Ejemplo de uso
const BATTERY_THRESHOLD = 20;
const CHECK_INTERVAL = 60000; // 1 minuto

//setInterval(() => {
//  checkBatteryStatus(BATTERY_THRESHOLD);
//}, CHECK_INTERVAL);
//
//// Ejecutar inmediatamente al inicio
//checkBatteryStatus(BATTERY_THRESHOLD);
let testFunction = async () => {
  do {
    const info = await execShowInfo();
    const musicDir = "./media";
    console.log("other ejecucion");
    //  Obtener lista de canciones
    const songs = fs
      .readdirSync(musicDir)
      .filter((file) => path.extname(file).toLowerCase() === ".mp3");
    console.log("before while");
    if (info.percentage > 20 && info.state === "discharging") {
      const songPath = path.join(musicDir, songs[0]);
      console.log(`Reproduciendo: ${songs[1]}`);

      player.play(songPath, (err) => {
        if (err) console.log(`Error al reproducir: ${err}`);
      });
    }
    console.log("ejecucion interna");
    //
    //
    // console.log(`Info : ${batteryInfo.percentage}`)
  } while (true);
};
//testFunction();
syncFuntion();

