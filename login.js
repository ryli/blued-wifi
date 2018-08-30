const puppeteer = require('puppeteer')
const opn = require('opn')
const spinner = require('./spinner')
const hi = require('./hi')

// const url = 'http://10.10.10.1/index.htm'
const url = 'http://10.10.10.1/ac_portal/default/pc.html?tabs=pwd'
const testUrl = 'https://www.baidu.com/'

async function login(username, pwd) {
  const browser = await puppeteer.launch()

  const page = await browser.newPage()

  await page.goto(url).catch(err => {})

  const nameId = '#password_name'
  const pwdId = '#password_pwd'
  const btn = '#password_submitBtn'
  const testInputId = '#kw'

  await page.waitForSelector(nameId)
  await page.type(nameId, username)
  await page.type(pwdId, pwd)
  await page.click(btn)

  // 打开网页 验证一下
  await page.goto(testUrl).catch(err => {})
  await page.waitForSelector(testInputId)

  await browser.close()

  spinner.setSpinnerTitle('login success')
  spinner.stop(true)

  // opn(testUrl, { wait: false })
  console.log(hi)
}

module.exports = login
