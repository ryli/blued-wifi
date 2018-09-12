const puppeteer = require('puppeteer')
const spinner = require('./spinner')
const hi = require('./hi')

// const url = 'http://10.10.10.1/index.htm'
const url = 'http://10.10.10.1/ac_portal/default/pc.html?tabs=pwd'
const testUrl = 'https://www.baidu.com/'

function loginFailed() {
  spinner.setSpinnerTitle('login failed')
  spinner.stop(true)
  console.log('login failed')
  process.exit()
}

async function login(username, pwd) {
  const opts = {}
  // opts.headless = false
  const browser = await puppeteer.launch(opts)

  const page = await browser.newPage()

  await page.goto(url).catch(err => {
    console.log('err', err)
    loginFailed()
  })

  const nameId = '#password_name'
  const pwdId = '#password_pwd'
  const btn = '#password_submitBtn'

  await page.waitForSelector(nameId)
  await page.type(nameId, username)
  await page.type(pwdId, pwd)
  await page.click(btn)

  // 打开网页 验证一下
  await page.goto(testUrl).catch(err => {
    console.log('err', err)
    loginFailed()
  })

  const title = await page.title();
  await browser.close()
  if (title === '百度一下，你就知道') {
    spinner.setSpinnerTitle('login success')
    spinner.stop(true)
    console.log(hi)
    process.exit()
  } else {
    loginFailed()
  }
}

module.exports = login
