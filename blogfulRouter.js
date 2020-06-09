//create a mini express app with Router
const express = require('express');
const bodyParser = require('body-parser');
const {BlogPosts} = require('./models');

const router = express.Router();
const jsonParser = bodyParser.json();

const starterBlogs = [
    {
        title: "TombRaider is the Best", 
        content: "Tomb Raider series needed a reboot badly. Crystal Dynamics made an amazing franchise that needs our love and support for many years to come!", 
        author: "Lara Croft"
    },
    {
        title: "How to BootStrap Express Apps", 
        content: "to bootstrap an express project install globally $ npm install -g express-generator. Then create the express app while naming it. (Very similar to react) $ express myExpressServer. Then just cd into the project and npm install for dependencies. $ git init  your express app as a git repo (express generator doesn’t auto git init)", 
        author: "David Acosta"
    }
]

//populate/persist some data for visual reference.
starterBlogs.forEach(blog=> {
    return BlogPosts.create(blog.title, blog.content, blog.author);
});

router.get('/', jsonParser,(req,res) => {
    console.log(req.method, req.url);
    res.status(200).json(BlogPosts.get());
});

router.post('/', jsonParser, (req,res) => {
    if(!req.body.title || !req.body.content || ! req.body.author){
        return res.status(400).send("missing either title, content, or author")
    }
    console.log(req.body);
    const {title, content, author} = req.body;
    BlogPosts.create(title, content, author);
    res.status(201).send("new item created");
});

router.put('/:id',jsonParser, (req,res) => {
    if(!BlogPosts.posts.find(post=> post.id === req.params.id)){
        return res.status(400).send("that blog ID is incorrect or nonexistent")
    }
    console.log("so the id is...", req.params.id);
    const updatedItem = req.body;
    console.log("THIS IS THE BODY!!!!!!!", req.body);

    BlogPosts.update(updatedItem);
    return res.status(204).send("blog updated!");
})

router.delete('/:id', (req,res) => {
    BlogPosts.delete(req.params.id);
    return res.status(204).end();
})



//export our router instance.
module.exports = router;