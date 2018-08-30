const Spinner = require('cli-spinner').Spinner

const spinner = new Spinner('%s wait...')

spinner.setSpinnerString('|/-\\')

// spinner.start()
// spinner.setSpinnerTitle('netConnect...')
// spinner.stop(true)

module.exports = spinner
