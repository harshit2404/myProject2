const Product = require('../models/product')
const Variation = require('../models/productVariation')

exports.getProducts = (req,res)=>{
    
  Product.findAll({include: Variation})
  .then(products=>{
      console.log(products)
      console.log('---------------------------------')
      console.log(products[0].variations)
     
      const rslt =products.map((product)=>{
          const {id,title,description,variations} = product
          return {id,title,description,variations}
      })
      res.json(rslt)
         
      
  })
  .catch(err=>{
      console.log("error occured")
  })
   
}

exports.postProduct = (req,res)=>{
    console.log(req.body)
    

    Product.create({
        title:req.body.title,
        price:req.body.price,
        imageUrl:req.body.image,
        description:req.body.description
    })
    .then(product=>{
        console.log(`id is ${product.id}`)
        Variation.create({
            size:req.body.size,
            price:req.body.price,
            productId:product.id
        })
    .then(reslt=>{
        console.log("Successfully added product")
        res.status(201).json({
            message:'successfully created'
        })
    })
    .catch(err=>{
        console.log(err)
    })    
        
    })

}

exports.getSingleProduct = (req,res)=>{
    Product.findOne({where:{
        id:req.params.id
    },include:Variation})
    .then(product=>{
        const {id,title,description,image,variations} = product
        return res.json(product)
    })
    
}


exports.addProductVariation = (req,res)=>{
    Variation.create({
        size:req.body.size,
        price:req.body.price,
        productId:req.params.id
    })
    .then(rslt=>{
        res.json({
            message:"Successfully added variants"
        })
    }

    )
}

exports.getProductVariation = (req,res)=>{
    Variation.findAll({where:{
        productId:req.params.id
    }})
    .then(variations=>{
        res.json(variations)
    })
}

exports.deleteProduct = (req,res)=>{
    Product.findByPk(req.params.id)
    .then(product=>{
          product.destroy()
          res.json({
              message:"Product deleted successfully"
          })
    })
    .catch(err=>{
        console.log("error occured")
    })
}