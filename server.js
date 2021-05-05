const express = require('express')
const app = express();
const port = 3000

const {MongoClient} = require('mongodb');
var url = "mongodb://localhost:27017";

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
 });

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.use(express.static('static'))


app.get('/webresources/kierunki', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if(err)
            res.status(500).json({error: err})
        else {
            var opaDB = db.db("opa");
            var collection = opaDB.collection("kierunki");  
            opaDB.collection("kierunki").find({}).toArray(function(err, result) {
                db.close();
                if (err) {
                    res.status(500).json({error: err});
                } else {
                    res.send(result);
                }
            });
        }
    });
})


app.post('/webresources/kierunki', (req, res) => {
    console.log(req.body);
    data = {
        nazwa: req.body.nazwa,
        kod: req.body.kod,
        rodzaj: req.body.stopien,
        specjalnosc: req.body.specjalnosc.split('\n')
    }
    console.log(data);      // \todo validate data !!!
    
    MongoClient.connect(url, function(err, db) {
        if(err)
            res.status(500).json({error: err})
        else {
            var opaDB = db.db("opa");
            var collection = opaDB.collection("kierunki");    
            collection.insertOne(data, function(err, result) {
                db.close();
                if(err) {
                    res.status(500).json({error: err})
                } else {
                    res.send("Kierunek utworzony: id=" + result.insertedId);
                }
            });
        }
    });
})



app.post('/webresources/deletingKierunki', (req, res) => {
    console.log(req.body);

    MongoClient.connect(url, function(err, db) {
        if(err)
            res.status(500).json({error: err})
        else {
            var opaDB = db.db("opa"); 
            opaDB.collection("kierunki").remove({ kod: req.body.kod , nazwa: req.body.nazwa}, function(err, result) {
                db.close();
                if (err) {
                    res.status(500).json({error: err});
                } else {
                    console.log('success');
                    res.send('deleted');
                }
            });
        }
    });

})

app.post('/webresources/editingKierunki', (req, res) => {
    console.log(req.body);

    MongoClient.connect(url, function(err, db) {
        if(err)
            res.status(500).json({error: err})
        else {
            var opaDB = db.db("opa"); 
            opaDB.collection("kierunki").findOneAndReplace(
                { kod: req.body.kodChosen, nazwa: req.body.nazwaChosen},
                { kod: req.body.kodEdited, nazwa: req.body.nazwaEdited, rodzaj: req.body.stopienEdited, specjalnosc: req.body.specjalnoscEdited.split('\n')}
            , function(err, result) {
                db.close();
                if (err) {
                    res.status(500).json({error: err});
                } else {
                    console.log('success');
                    res.send('edited');
                }
            });
        }
    });
})





app.listen(port, () => {
    console.log(`Example app listening at ` + 
                `http://localhost:${port}`   );
  })
