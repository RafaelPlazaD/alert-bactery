const { spawn } = require('child_process')
const { exec } = require('child_process')
const { stdout, stderr } = require('process')
//const child = spawn('find', ['.', '-type', 'f'])

//child.on('exit', function(code, signal) {
//  console.log(`child process exited whit  code : ${code} and 
//  signal : ${signal}`)
//})

//child.stdout.on('data', (data) => {
//  console.log(`child stdout:\n${data}`)
//})

//const find = spawn('find', ['.', '-type', 'f'])
//const wc = spawn('wc', ['-l'])
//
//find.stdout.pipe(wc.stdin)
//
//wc.stdout.on('data', (data) => {
//  console.log(`Number of lines ${data}`)
//})

exec('find . -type f | wc -l', (err, stdout, stderr) => {
  if (err) {
    console.error(`Exec erro: ${err}`)
    return
  }

  console.log(`Number of file ${stdout}`)
})
