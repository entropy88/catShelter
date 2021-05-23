const express = require('express');
const app = express();
const bodyParser=require('body-parser');
const fs=require('fs');
const handlebars=require('express-handlebars');

const catsArray=[];
const catsJson=require('./data/catsCat.json');

const breedsArray=[];
const breedsJson=require('./data/breedsCat.json');



const port = 3000;

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use('/static', express.static('public'));
app.engine('handlebars',handlebars());
app.set('view engine','handlebars')

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/home/index.html');
});

app.get('/cats', function (req, res) {
    res.sendFile(__dirname + '/views/addCat.html');
});

app.post('/cats', function(req, res) {
    console.log(req.body.name)

    const catName = req.body.name;
    const catDesc=req.body.description;
    const breed=req.body.breed;

    catsArray.push({catName,catDesc,breed})
    fs.writeFile('./data/catsCat.json',JSON.stringify(catsArray), function(err, result) {
        if(err) console.log('error', err);
    });
    console.log(req.body)
    res.send('<h1>Hello</h1> '+catName);
});


app.get('/breeds', function (req, res) {
    res.sendFile(__dirname + '/views/addBreed.html');
});

app.post('/breeds', function (req,res){
    console.log(req.body)
    const breedName=req.body.breed;
    breedsArray.push(breedName);
    fs.writeFile('./data/breedsCat.json',JSON.stringify(breedsArray), function(err, result){
        if (err){
            console.log(err)
        }
    })
    res.send("yay, breed added")
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})