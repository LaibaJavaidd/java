const express = require('express')
const stocks = require('./stocks')
const path = require('path');

const app = express()

app.set('view engine', 'ejs')

app.set('views', 'views')

app.listen(3000, () => console.log('Server is running!'))

//app.use(express.static(path.join(__dirname, 'static')))
app.get('/', async (req, res) => {
  res.render('index');
})

app.get('/stocks', async (req, res) => {
  const stockSymbols = await stocks.getStocks()
  res.render('stocks', {stockSym: stockSymbols});
})

app.get('/stocks/:symbol', async (req, res) => {
  const { params: { symbol } } = req
  try{
    const data = await stocks.getStockPoints(symbol, new Date())
    res.render('stockPoints', {DATA: data})
  }
  catch(e){
    console.log("ERRORs: ")
    console.error(e)
    res.render('timeout')
  }
})

app.use((req,res)=>{
  res.render('404')
})