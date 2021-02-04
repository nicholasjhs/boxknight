const express = require('express')

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello BoxKnight Challenge!')
})

app.listen(port, () => {
  console.log(`I'm listening on port ${port}`)
})