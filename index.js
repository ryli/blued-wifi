#!/usr/bin/env node

const exec = require('child_process').exec
const spinner = require('./spinner')
const login = require('./login')
const argv = process.argv
const pingURL = '10.0.16.1'

if (argv.length < 3) {
  console.log('Missing username.')
} else if (argv.length < 4) {
  console.log('Missing password.')
} else {
  const username = argv[2]
  const pwd = argv[3]
  let isNetConnected = false

  spinner.start()

  function testNetConnect() {
    exec(`ping -c 1 ${pingURL}`, (err) => {
      if (err === null) {
        isNetConnected = true
        spinner.setSpinnerTitle('network connected')
      }
    })
  }

  const fn = setInterval(async () => {
    if (isNetConnected) {
      clearInterval(fn)
      spinner.setSpinnerTitle('logging in..')
      await login(username, pwd)
    } else {
      testNetConnect()
    }
  }, 200)
}
