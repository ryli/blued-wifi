const puppeteer = require('puppeteer')
const spinner = require('./spinner')
const hi = require('./hi')

// const url = 'http://10.0.16.2/index.htm'
const url = 'http://10.0.16.2/ac_portal/default/pc.html?tabs=pwd'
const testUrl = 'https://www.baidu.com/'

const nameId = '#password_name'
const pwdId = '#password_pwd'
const btn = '#password_submitBtn'
const logoutBtn = '#logout_submitBtn'

function loginFailed(err = '') {
  spinner.stop(true)
  console.log('login failed')
  console.log(err)
  process.exit()
}

async function login(username, pwd) {
  const opts = {}
  // opts.headless = false
  const browser = await puppeteer.launch(opts)

  const page = await browser.newPage()

  await page.goto(url).catch(err => loginFailed(err))

  await page.waitForSelector(nameId)
  await page.type(nameId, username)
  await page.type(pwdId, pwd)
  await page.click(btn)
  await page.waitForSelector(logoutBtn).catch(err => loginFailed(err))
  await page.close()
  spinner.setSpinnerTitle('login successful')

  // 打开网页 验证一下
  const newPage = await browser.newPage()
  await newPage.goto(testUrl).catch(err => loginFailed(err))
  const title = await newPage.title();
  await browser.close()
  if (title === '百度一下，你就知道') {
    spinner.stop(true)
    console.log(hi)
    process.exit()
  } else {
    loginFailed()
  }
}

module.exports = login
