const constants = require("../../config/constants");

const events = require("../../models/event");
const user_events = require('../../models/event_user');
const users = require('../../models/user')


module.exports={
  Mutation:{
 createEvent : async (parent,args,ctx) => {
    try {
      console.log("!!!!start");
      let createObject = {
        event_name: args.input.event_name,
        user_id: ctx.userData.id,
      };
      console.log(createObject);
      let event = await events.create(createObject);

    //   let createObject1 = {
    //     user_id: req.userData.id,
    //     event_id: event.id,
    //   };
    //   let event_user = await user_events.create(createObject1);
  
    return({
      status: constants.success_code,
      message: "successfully created",
      data: event,
    });
  
    } catch (error) {
      throw 'error'
    }
  },
 updateEvent : async (parent,args,ctx) => {
    try {
      console.log("!!!!!!!!!!!!!!!!!start");
      const updateObject = await events.findOneAndUpdate(
        { user_id: ctx.userData.id, id: args.input.id } ,
        {
          event_name: args.input.event_name
        },
        
      );
        console.log(updateObject);

     return{
        status: constants.success_code,
        message: "successfully updated",
        data: updateObject,
      };
  
      
    } catch (error) {
      throw 'error'
    }
  },

  },
  Query:{
 getEventList : async (parent,args,ctx) => {
  console.log("!!!!!!!!!!!!!!!!!!!!!start", ctx.userData.id,);
    // const { page = 1, limit = 10 } = args.input.query;
    try {
      let updatedUserData = await user_events.find({
        
          user_id: ctx.userData.id,
        
      });
      console.log('updateUserData :>> ', updatedUserData);
      if (!args.input.search_text) {
        let result = await events.find()
                .limit(limit*1)
                .skip((page - 1) * limit)
               
      const count = await events.countDocuments();
        console.log("result :>> ", result);
  
        return{
          status: constants.success_code,
          message: "successfully listed",
          events,
          totalPages: Math.ceil(count / limit),
          currentPage: page
        };
      }
    } catch (error) {
      throw'error'
    }
  }
  }
}