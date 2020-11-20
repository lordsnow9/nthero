'use strict'
const app = require('express')()
const authenticate = require('./src/authenticate')
const params = require('./src/params')
const proxy = require('./src/proxy')
const fs = require('fs')

//const PORT = process.env.PORT || 3000

app.set('port', 3000)
app.enable('trust proxy')
app.get('/', authenticate, params, proxy)
//app.get('/favicon.ico', (req, res) => res.status(204).end())
//app.listen(PORT, () => console.log(`Listening on ${PORT}`))

app.listen(app.get('port'), () => {
  if (process.env.DYNO) {
    console.log('This is on Heroku..!!')
    fs.openSync('/tmp/app-initialized', 'w')
  }
  console.log('Node app is running on port', app.get('port'))
})
