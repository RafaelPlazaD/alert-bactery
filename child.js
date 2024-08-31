
const { spawn } = require('child_process')




const upower = spawn('upower', [
  '-i',
  '/org/freedesktop/UPower/devices/battery_BAT0',
])
const grep = spawn('grep', [
  '-E',
  '"state|percentage"'
])

upower.stderr.on('data', (data) => {
  console.error(`Upower Error ${data}`)
})

upower.stdout.pipe(grep.stdin)

grep.stdout.on('data', (data) => {
  console.log(data)
})
grep.stderr.on('data', (data) => {
  console.error(`Grep Error ${data}`)
})




