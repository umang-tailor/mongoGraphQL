const {gql}=require("apollo-server")
const typeDefs = gql`


scalar DateTime

directive @isAuthorized on FIELD | FIELD_DEFINITION
directive @hasRole(role: String) on FIELD | FIELD_DEFINITION

input InputInviteUser{
    email:String
    event_id:String
    
}

type event{
    event_name:String
    
}


type eventUser{
    status:Int
    message:String

}

type Mutation {
    userInvite(input:InputInviteUser): eventUser @isAuthorized
   
}

`
module.exports = typeDefs;