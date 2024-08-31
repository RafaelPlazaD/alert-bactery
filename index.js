//const child_process = require('child_process')

//const command = 'upower -i /org/freedesktop/UPower/devices/battery_BAT0 | grep -E "state|time to empty|to full|percentage"'
//const getBatteryStatus = () => {
//  child_process.exec(command, (err, stdout, stderr) => {
//    if (err) {
//      console.error(err.code)
//    } else {
//      try {
//        console.log(`Info batery ${stdout}`)
//      } catch (e) {
//        console.error(e)
//      }
//    }
//  })
//}
//
//getBatteryStatus()
//
const { ifError } = require('assert')
const { spawn, exec} = require('child_process')
const { stdout, stderr } = require('process')



//function getBatterySpawn() {
//  console.log('here from function ::')
//  const upower = spawn('upower', [
//    '-i',
//    '/org/freedesktop/UPower/devices/battery_BAT0',
//  ])
//  const grep = spawn('grep', [
//    '-E',
//    '"state|percentage"'
//  ])
//
//  upower.stderr.on('data', (data) => {
//    console.error(`Upower Error ${data}`)
//  })
//
//  upower.stdout.pipe(grep.stdin)
//
//  grep.stderr.on('data', (data) => {
//    console.error(`Grep Error ${data}`)
//  })
//  console.log('end function ')
// // grep.stdout.on('data', (data) => {
//
//
// // })
//  
//
//  //upower.stdout.on('data', (data) => {
//  //  console.log(`Result of:\n${data}`)
//  //})
//}
function showInfo() {
  const upower = spawn('upower', [
    '-i', 
    '/org/freedesktop/UPower/devices/battery_BAT0',
  ])

  const grep = spawn('grep', [
    '-E',
    '"state|percentage"'
  ])

  upower.stdout.pipe(grep.stdin)

  grep.stdout.on('data', (data) => {
    console.log(`Result:\n${data}`)
  })

}

//showInfo()

function execShowInfo() {
  exec('upower -i /org/freedesktop/UPower/devices/battery_BAT0 | grep -E "state|percentage"', (err, stdout, stderr) => {
    if(err) {
      console.error(`Error exec ${err}`)
    }

    console.log(`${stdout}`)
  })  
}

execShowInfo()
