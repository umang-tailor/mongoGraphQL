let mongoose = require("mongoose");

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
const { expect } = require("chai");
let should = chai.should();
const {login_token} = require('../config/constants')

chai.use(chaiHttp);
describe('events',()=>{
    it ('createEvent' , (done) => {
        let newEvent = {
          event_name:"event1"
        }
        chai.request(server)
            .post('/graphql')
            .set('authorization', `Bearer ${login_token}`)
            .send({
              'query' : `mutation Mutation($input: createInput) {
                createEvent(input: $input) {
                  status
                }
              }`,
              'variables' : {
                 'input': newEvent
               }
            })
            .end((err, res) => {
              res.should.have.status(200);
            });
            
            done();
        
      
})
});

