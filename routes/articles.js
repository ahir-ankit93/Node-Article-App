const express = require('express');
const router = express.Router();

let Article = require('../models/Article');



router.get('/add', (req, res) => {
    res.render('add_articles', {
        title:'Add Articles'
    });
});

router.post('/add', (req, res) => {

    req.checkBody('title','Title is required').notEmpty();
    req.checkBody('author','Author is required').notEmpty();
    req.checkBody('body','Body is required').notEmpty();


    let errors = req.validationErrors();

    if(errors){
        res.render('add_articles', {
            title: 'Add Article',
            errors:errors    
        });
    } else {
        let article = new Article();
        article.title = req.body.title;
        article.author = req.body.author;
        article.body = req.body.body;
    
        article.save((err) =>{
            if(err){
                console.log(err);
                return;
            } else {
                req.flash('success','Article Added')
                res.redirect('/');
            }
        });
    }

   
    // console.log(req.body.title);
    // return;
    // console.log('Submitted');
    // return;
});


router.get('/edit/:id', (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        res.render('edit_article', {
            title:'Edit Article',
            article:article
        });
    });
});

router.post('/edit/:id', (req, res) => {

    let article = {};
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    let query = {_id:req.params.id}

    Article.updateOne(query, article, (err) =>{
        if(err){
            console.log(err);
            return;
        } else {
            req.flash('success','Article Updated')
            res.redirect('/');
        }
    });
});

router.delete('/:id', (req, res) => {
    let query = {_id:req.params.id}

    Article.deleteOne(query, (err) => {
        if(err){
            console.log(err);
        }
        res.send('Success');
    });
});



router.get('/:id', (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        res.render('article', {
            article:article
        });
       
        // console.log(article);
        // return;
    });
});







module.exports = router;