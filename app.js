const express = require('express')
const bodyParser = require('body-parser')
const Product = require('./models/product.js')
const Variation = require('./models/productVariation.js')
const sequelize = require('./utils/database')
const productRoutes = require('./routes/products.js')

const app = express()

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended:true}))

app.use(productRoutes)

Product.hasMany(Variation)
Variation.belongsTo(Product,{constraints:true,onDelete:'CASCADE'})

sequelize.sync()
.then(result=>{
    console.log('created databases')
})
.catch(err=>{
    console.log('error occured')
})

app.listen(3000,()=>{
    console.log('server started')
})