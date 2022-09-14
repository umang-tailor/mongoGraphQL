// require("dotenv").config();
var createError = require("http-errors");
const http = require('http')
const jwt = require('jsonwebtoken')
const { ApolloServer, schemaDirectives } = require("apollo-server");
const secret = require('./config/secret')

// const { verifyToken } = require("./auth");  
// const cors = require("cors");
// const path = require("path");
// const express = require("express");
// const app = express();
const { makeExecutableSchema } = require("@graphql-tools/schema");
const directiveResolvers=require('./directives/isAuth')
const typeDefs = require("./controllers/schema");
const resolvers = require("./controllers/resolvers");
// const { graphqlUploadExpress } = require("graphql-upload");
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname + "/uploads/")));

// const corsOptions = {
//   origin: "http://localhost:3000",
//   credentials: true,
// };

// app.use(cors(corsOptions));

const mongoose = require ("mongoose")
DB_URL= 'mongodb+srv://umang:umang123@cluster0.w4mnukg.mongodb.net/mongoGraphQL?retryWrites=true&w=majority'
mongoose.connect(DB_URL).then(()=>{
    console.log("connection successfully");

}).catch((err)=>{
  console.log('err :>> ', err);
    console.log("not connected");
})


let port = process.env.PORT || 3000;

// app.use("/", Route);
// app.use(verifyToken);
// app.use(graphqlUploadExpress());

const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    directiveResolvers,
    schemaDirectives,
  });
  
  
  const server = new ApolloServer({ 
    schema,
    context: ({req}) => {
      const token = req.headers.authorization || '';
      // console.log('token :>> ', token.split('Bearer ')[1]);
      const userData =  jwt.decode(token.split('Bearer ')[1], secret);
      // console.log('userData :>> ', userData);
      return { userData }
    }
  });
  
  server.listen().then(({ url }) => {
    console.log(`STARTED at ${url}`);
  });

