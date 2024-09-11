#!/usr/bin/env node

const { exec, execSync } = require("child_process");
const { promisify } = require("util");
var player = require("play-sound")((opts = {}));
const fs = require("fs");
const path = require("path");
const { stdout } = require("process");
const execAsync = promisify(exec);
// const local
const DURANTIONSOUND = 40000;
const TIMESLEEP = 300000;
const MINBACTERYLEVEL = 80;
const CHARGING = "charging";
const DISCHARGING = "discharging";
let counter = 0;
const music = "/home/rafael/workspace/alert-bactery/media/alarm.mp3";

function execPlaySoun() {
  return player.play(music, (err) => {
    if (err) console.log(`Error al reproducir: ${err}`);
  });
}

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

async function main() {
  try {
    const wait = (t) =>
      new Promise((resolve, reject) => setTimeout(resolve, t));

    do {
      let info = getInfoBatery();

      if (info.percentage < MINBACTERYLEVEL && info.state === DISCHARGING) {
        let audio = execPlaySoun();

        let isNotCharging = true;

        do {
          let info = getInfoBatery();

          if (counter >= DURANTIONSOUND) {
            audio.kill();
            audio = execPlaySoun();
            counter = 0;
          }

          if (info.state === CHARGING) {
            isNotCharging = false;
            audio.kill();
          }

          await wait(5000);
          counter += 5000;
        } while (isNotCharging);
      }

      await wait(TIMESLEEP);
    } while (true);
  } catch (err) {
    console.error(`Error ${err.toString()}`);
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

main();
