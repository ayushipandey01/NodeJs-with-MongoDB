var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ayushipandey75:ayushi1598@cluster0.xskc1di.mongodb.net/?retryWrites=true&w=majority');

var db = mongoose.connection;

db.on('error' ,()=> {
    console.log("Error while connecting to database");
})

db.once('open' , ()=> {
    console.log("Connection to database is successful");
})

var app = express();

app.listen(8000 , ()=>{
    console.log("Server started at port 8000");
})

app.use(bodyParser.json());

// const users = [
//     { id : 1 , name : "Ayushi" , age : 24},
//     { id : 2 , name : "Arnav" , age : 23},
//     { id : 3 , name : "Amita" , age : 30},
//     { id : 4 , name : "Ayu" , age : 28},
//     { id : 5 , name : "Pandey" , age : 43},
// ]

// app.listen(8001 , ()=>{
//     console.log("Server started at port 8001");
// })

// app.get("/api/users/" , (req , res)=> {
//     res.json(users);
// })

// app.get("/" , (req , res ) =>{
//     console.log(req.body);
//     res.send("I am learning NodeJS");
// })

// //get call
// app.get("/api/users/:id" , (req , res)=> {

//     const id = req.params.id;

//     const user = users.find((user) => user.id == id);

//     if(!user){
//         res.status(404).json({ "message" : "User does not exist"})
//     }

//     res.json(user);
// })

// //post call

// app.post("/api/users" , (req , res)=>{

//     const name = req.body.name;
//     const age = req.body.age;

//     const user = {id : Math.random() * 100 , name : name , age : age };

//     users.push(user);

//     console.log(users);

//     res.json(users);
// })

// //updating an user
// //put call
// app.put("/api/users/:id" , (req , res)=> {

//     const id = req.params.id;

//     const user = users.find((user) => user.id == id);

//     if(!user){
//         res.status(404).json({"message" : "User does not exist"});
//     }

//     const keys = Object.keys(req.body);

//     keys.forEach(key=>{
//         if(!user[key]){
//             res.status(404).json({"message" : "Invalid details passed in the body"});
//         }

//         user[key] = req.body[key];
//     })
//     res.send(user);
// })

// //Delete call

// app.delete("/api/users/:id" , (req , res )=> {

//     const id = req.params.id;

//     const user = users.find(user => user.id == id);

//     if(!user){
//         res.status(404).json({"message" : "User does not exist"});
//     }

//     var filteredUsers =  users.filter(user => user.id != id);

//     res.send(filteredUsers);
// })

const blogSchema = mongoose.Schema({
    title:  String, // String is shorthand for {type: String}
    author: String,
    body:   String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs:  Number
    }
  });

const Blog = mongoose.model('Blog', blogSchema);

app.post("/api/blogs" , (req , res)=>{

    const {title , author , body , comments , meta} = req.body;
    const newBlog = new Blog({title , author , body , comments ,meta});

    newBlog.save()
    .then(data=>{
        if(!data){
            res.status(400).json({message : "something went wrong"})
        }
        res.send(data);        
    })   

    .catch(err=>{
        res.status(500).json({message : err})
    })
})

app.get("/api/blogs" , (req , res)=>{

    Blog.find()
    .then(data => {
        if(!data){
            res.status(400).json({message : "something went wrong"});
        }
        res.json(data);
    })

    .catch(err => {
        res.status(500).json({message : err});
    })
})

app.get("/api/blogs/:id" , (req , res)=>{

    const id = req.params.id;
    Blog.findById(id)
    .then(data => {
        if(!data){
            res.status(400).json({message : "user does not exist"});
        }
        res.json(data);
    })

    .catch(err => {
        res.status(500).json({message : err});
    })

})

app.put("/api/blogs/:id" , (req , res )=>{
    const id = req.params.id;

    Blog.findByIdAndUpdate(id , { author : "pandey ayushi"} ,{})
    .then(data => {
        if(!data){
            res.status(400).json({message : "user does not exist"});
        }
        res.json(data);
    })

    .catch(err => {
        res.status(500).json({message : err});
    })
})

app.delete("/api/blogs/:id" , (req , res )=>{
    const id = req.params.id;

    Blog.findByIdAndRemove(id ,{})
    .then(data => {
        if(!data){
            res.status(400).json({message : "user does not exist"});
        }
        res.json(data);
    })

    .catch(err => {
        res.status(500).json({message : err});
    })
})

