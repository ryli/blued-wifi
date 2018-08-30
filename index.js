#!/usr/bin/env node

const exec = require('child_process').exec
const spinner = require('./spinner')
const login = require('./login')
const argv = process.argv

if (argv.length < 3) {
  console.log('缺少用户名参数～')
} else if (argv.length < 4) {
  console.log('缺少密码参数～')
} else {
  const username = argv[2]
  const pwd = argv[3]
  const url = '10.10.10.1'
  let isNetConnected = false

  spinner.start()

  function testNetConnect() {
    exec(`ping -c 1 ${url}`, (err) => {
      if (err === null) {
        isNetConnected = true
        spinner.setSpinnerTitle('network connected')
      }
    })
  }

  const fn = setInterval(async () => {
    if (isNetConnected) {
      clearInterval(fn)
      spinner.setSpinnerTitle('start login')
      await login(username, pwd)
    } else {
      testNetConnect()
    }
  }, 200)
}
