const constants = require("../../config/constants");

const user_events = require("../../models/event_user");
const users = require("../../models/user");
const events = require("../../models/event")


module.exports={
Mutation:{
 userInvite : async (parent,args,ctx) => {
  console.log("!!!!!!!!invite");
    try {
      let user = await users.findOne({
     
          email: args.input.email,
        
      });
  
      if (!user) {
        throw "Invalid email";
      }
      console.log("user :>> ", user);
      let event = await events.findOne({
        _id: args.input.event_id,
      });
      if (!event) {
        throw "Invalid id";
      }
      console.log("event :>> ", args.input.event_id,event);
      
 
      let userExits = await user_events.findOne({
          user_id: user.id,
          event_id: args.input.event_id,
      });

      console.log('userExits :>> ', userExits);
      if (userExits) {
        throw "Already invited";
      }

      // console.log("here", ctx.userData.id,event.user_id);


      if (ctx.userData.id != event.user_id.toString()) {
        throw new Error("unAuthorized");
      }
    
      let createObject = {
      user_id: user.id,
      event_id: args.input.event_id,
      };

      let event_user = await user_events.create(createObject);
      console.log(event_user);
      return{
        status: constants.success_code,
        message: "successfully created",
        data: event_user,
      };
    } catch (error) {
      throw 'error'
    }
  },
}
}


  