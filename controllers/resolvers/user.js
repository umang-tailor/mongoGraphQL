const mongoose = require ('mongoose')
const users = require("../../models/user");
const jwt = require("jsonwebtoken");
const token = require("../../config/secret");
const constants = require("../../config/constants");
const bcrypt = require("bcrypt");

module.exports={
  Mutation:{
 registerUser : async (parent, args, ctx) => {
    console.log("registerUser function start");
    try {
      const{first_name,last_name,email,password}= args.input;
      
      if (
        !first_name ||
        !email ||
        !password ||
        !last_name
      ) 
      {   
        throw "Please provide all Data";
      }
    let existUserData = await users.findOne({
        
          email: email,
        
      });
    //  console.log(existUserData)
      if (existUserData) {
        throw "User with this email is already registered with us";
      }
  
   
      var hashedPassword = await bcrypt.hash(args.input.password, 8);
  
      let createObject = {
        first_name: first_name,
          last_name: last_name,
          email: email,
          password: hashedPassword,
      };
  
      let user = await users.create(createObject);
  
  
      return{
        status: constants.success_code,
        message: "successfully created",
        data: user,
        // token: authToken,
      };
  
      
    }catch (error) {
      console.log("error :>> ", error);
      throw error;
      
    }
  },

 login :async (parent, args, ctx) => {
    console.log("login function start");
    try {
      if (!args.input.email || !args.input.password) {
        throw "Please provide all Data";
      }
  
      let user = await users.findOne({
      
        email: args.input.email,
        
      });
      // console.log(user);
  
      if (!user) {
        throw "Invalid email";
      }


      var isEqual = await bcrypt.compareSync(args.input.password, user.password);
      console.log("!!!!!!!!!!after compare", isEqual);
  
      if (!isEqual) {
        throw "Invalid password"; 
      }
  
      let updatedUserData = await users.findOne({
          id: user.id,
      })
  
      let secret = token();
      let authToken = jwt.sign({ id: user.id, role: "user" }, secret, {
        expiresIn: 86400, // expires in 24 hours
      });
  
      console.log("!!!!!!!!all process completed", updatedUserData, authToken);
  
      return {
          token: authToken,
      }
  
  
    }  catch (error) {
      throw error
    }
  },
 changePassword : async (parent, args, ctx) => {
console.log("start");
    try {
      if (!args.input.password) {
        throw "Please provide password";
      }
  
      let updateObject = {};
  
      updateObject.password = await bcrypt.hash(args.input.password, 8);
      // console.log("updateObject :>> ", updateObject);
      console.log(" ctx.userData.id :>> ", ctx.userData.id);
      let editUserData = await users.findOneAndUpdate(updateObject, {
        
          id: ctx.userData.id,
        
      });
      console.log("editUserData :>> ", editUserData);
      return{
        status: constants.success_code,
        message: "password change Successfully",
         
      };
    } catch (error) {
      throw error
    }
  },
 resetPassword :async (req, res) => {
    try {
      let userPass = await users.findOne({
        
          email: args.input.email,
        
      });
      if (!userPass) {
        throw "invalid email";
      }
  
      let reset = {
        passwordReset: true,
        id: userPass.id,
      };
      let secret = token();
      let resetKey = jwt.sign(reset, secret, {
        expiresIn: 86400, // expires in 24 hours
      });
  
      return{
        status: constants.success_code,
        message: "password resetKey",
        resetKey: resetKey,
      }
    } catch (error) {
      throw 'error'
    }
  },
updatePassword : async (parent, args, ctx) => {
    console.log("start");
    try {
      let secret = token();
  
      const tokenData = await jwt.decode(args.input.passwordReset, secret);
      console.log("tokenData :>> ", tokenData);
      if (tokenData.passwordReset) {
        let userFind = await users.findOne({
          
            id: tokenData.id,
          
        });
        if (!userFind) {
          throw "user not found";
        }
        let updateObject = {};
  
        updateObject.password = await bcrypt.hash(args.input.password, 8);
        let editUserData = await users.updateOne(updateObject, {
      
            id: tokenData.id,
          
        });
        return {
          status: 200,
          message: "change successfully",
        };
      } else {
        return {
          status: "error",
          message: "unauthorized",
        };
      }
    } catch (error) {
      throw error
    }
  },
},
Query: {
   listUsers : async (parent, args, ctx) => {
    console.log("start");
    try {
      let result = await users.find()
        .limit(limit*1)
        .skip((page - 1) * limit)
        const count = await users.countDocuments();
        console.log("result :>> ", result);
      // console.log("result :>> ", result);
      return{
        status: constants.success_code,
        message: "successfully listed",
        data: result, 
        users,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      };
      
    } catch (error) {
      throw `error`
    }
  }
}
}
  