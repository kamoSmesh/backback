const express = require("express");
const app = express();
const bodyParser = require("body-parser");//passes body for incoming requests
const mongoose=require('mongoose');

const RegisteRoute=require('./api/routes/register');
const LoginRoute=require('./api/routes/login');

/*mongoose.connect(
  "mongodb+srv://kamoSmesh:" +
    process.env.MONGO_ATLAS_PW +
    "@school-admin-cluster-at9qr.mongodb.net/<school-admin-cluster>?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  err => {
    if (err) {
      console.log(err);
    } else {
      console.log("database connection established");
    }
  }
);*/

app.use(bodyParser.urlencoded({ extended: false  }));//allows to parse extended data for simple bodies
app.use(bodyParser.json()); //extracts json file types and makes them easy for us to read

//tell browsers to give a web application running at one origin, 
// access to selected resources from a different origin.
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Orign", "*");//allows any clients for access
    res.header("Acces-Control-Allow-Headers", "*");

if (req.method == "OPTIONS") {
    Response.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return Response.status(200).json({  });  //OK) status code indicates that the request 
                                           //has been processed successfully on server. });
  }
  next();
});

//routes that handle requests
app.use('/register',RegisteRoute);
app.use('/login',LoginRoute);

app.use((req, res, next) => {
    const error = new Error("PATH NOT FOUND");
    error.status = 404;
    next(error); //forwards the error req instead of original 
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });
  


module.exports=app;