const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const {Post} = require('./models/post');

const app = express();
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","GET","POST","DELETE",'delete');
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    next()
})
//user body-paser in middle ware

app.use(bodyParser.json());


//index page 
app.get('/',(req,res)=>{
    
    res.send("hello")
})
//list all posts 
app.get('/posts',(req,res)=>{
    Post.find().then((posts)=>{
        res.send(posts)
    },(e)=>{
        res.send({e})
    })
})
//create posts
app.post('/create',(req,res)=>{
    const postItem = new Post({
        title:req.body.title,
        post:req.body.post
    })
    postItem.save().then((doc)=>{
        res.status(200).send({doc})
    },(e)=>{
        res.status(400).send(e)
    })
    
})

//get single post 
app.get('/posts/:id',(req,res)=>{
    const id = req.params.id
    Post.findById(id).then((post)=>{
        if(post){
            console.log({post})
            res.send(post)
        }else{
            res.status(400).send()
        }
    }).catch((e)=>{
        res.status(400).send()
    })
}).delete('/posts/:id',(req,res)=>{
    const id = req.params.id
    Post.findByIdAndRemove(id).then((post)=>{
        if(post){
            console.log({post})
            res.send(post)
            
        }else{
            res.status(400).send()
        }
    }).catch((e)=>{
        res.status(400).send()
    })
})

app.listen(8000,()=>{
   console.log("listening in port 3000")
})
