const express = require('express')
const data=require('./data')


const app = express()
const PORT = process.env.PORT || 5000

app.get('/api/product', (req, res) => {
  res.json(data)
})

app.get('/api/product/:id', (req, res) => {
  const products=data.find((x)=>x.id === req.params.id);
  if (products) {
    res.json(products)
  } else {
    res.status(404).send({message:'Error'})
  }
  
  // res.send(data.listdt)
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})