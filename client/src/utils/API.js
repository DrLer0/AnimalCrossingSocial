import axios from "axios";

export default {

//events
//post event & push data to user model
saveEvent: function(eventData){
    return axios.post("api/events/:userId", eventData);
},

//delete event
deleteEvent: function(id){
    return axios.delete("api/events/:id" + id);
}, 

//update event's entry fee
updateEvent: function(id){
    return axios.put("api/events/:id" + id);
},


//designs

//create
saveDesign: function(designData){
    return axios.post("api/desigs/:userId", designData);
},

//delete event
deleteDesign: function(id){
    return axios.delete("api/designs/:id" + id);
}, 

//update event's entry fee
updateEvent: function(id){
    return axios.put("api/designs/:id" + id);
}, 


//users

//user profile is created with authentication, do not need post route? 


getUsers: function(){
    return axios.get("api/users");
},

//get one user

getUser: function(id){
    return axios.get("api/users/" + id);
}, 

//update user

updateUser: function(id){
    return axios.put("/api/users" + id);
},

//delete user?






    //once user has a profile, they can add additional information about themselves
        //island name
        //island fruit

    //get all users
    //get specific user
        //populate events
        //populate designs
    


}

