const Signature = require('./model')
const express = require('express')
const app = express()
const route = new express.Router()






route.post('/signature',async (req,res)=>{
    try {
        // console.log(req)
        const doc = new Signature(req.body)
        // console.log(doc)
        await doc.save()
        res.send({response:"succesfully save"})
    } catch (error) {
        if (error.name === 'MongoServerError' && error.code === 11000) {
           return res.send({error:'The NFT with This Name is already Signed'});
          }
        
    }
})

route.put('/signature',async (req,res)=>{
    try{
        const { Name,Executed } = req.body
        if(Executed){
            const doc = await Signature.findOneAndUpdate({ Name: Name },{Executed},{ new: true })
            return res.send({response:{success:'succesfully updated',Signature:doc.Signature,Name:doc.Name}})
        }
        const doc = await Signature.findOne({ Name: Name }) 
        if (doc == null) {
            return res.send({response:'Not found'})
        }
        if(doc.Executed == false){
            return res.send({response:{Signature:doc.Signature,Name:doc.Name}})
        }
        return res.send({response:`already redeemed`})

    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = route