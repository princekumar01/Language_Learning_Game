const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const server = express();
const router = require("./routes/route");
const path = require('path');
const jwt = require('jsonwebtoken');
const authRouter = require('./routes/auth')
const fs = require('fs');
const publicKey = fs.readFileSync(path.resolve(__dirname,'./public.key'),'utf-8');
//const model = require("./models/contest");
//const Contest = model.Contest;
const mongo_url='mongodb+srv://mainprincekumar:rfPqAVKxr0QRripl@cluster0.nm9vrun.mongodb.net/?retryWrites=true&w=majority'
//db connection
//rfPqAVKxr0QRripl

async function main() {
  await mongoose.connect(mongo_url, { useUnifiedTopology: true });
  console.log("database connected");
}
main().catch((err) => console.log(err));
 
//Schema 


//bodyParser
const auth = (req,res,next)=>{ 
  //console.log(req.body);
  try{
    //const token = req.get('Authorization').split('Bearer ')[1];
    const token = req.get('authorization');
    console.log(token);
    var decoded = jwt.verify(token,publicKey );
    console.log(decoded)
    if(decoded.email){
      //res.status(201).json(decoded);
      next()
    }else{
      res.sendStatus(401)
    }
  }catch(err){
    res.sendStatus(401)
  }
  //console.log(decoded)
};


 
server.use(cors());
server.use(express.json());
server.use(express.urlencoded());
server.use("/api/", router.router);
server.use('/auth',authRouter.router);

server.listen(8000, () => {
  console.log("server started");
});
