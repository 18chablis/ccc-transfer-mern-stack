var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/mongodb.config');
const mongoose = require('mongoose');

const Clergy = require('./models/clergy.model.js');
 
mongoose.Promise = global.Promise;


// Connecting to the database
mongoose.connect(dbConfig.url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        console.log("Successfully connected to MongoDB."); 

        const clergy = [
            {
                clergy_id : 'h3j8k4kl329',
                personal_details : {
                    firstname : ['Chablis'],
                    lastname : 'Dossou-gouin',
                    date_of_birth : '05-18-96'
                },
                contact : {
                    phone : ['09130454559'],
                    email : '18chablis@gmail.com'
                },
                address : {
                    city : ['Pk10'],
                    state_province : 'Seme',
                    area : 'Littoral',
                    country : 'Benin'
                }
            },
          ]

        for(let i=0; i<clergy.length; i++){

            const clergy = new Clergy({
                personal_details: clergy[i].personal_details,
                contact: clergy[i].contact,
                address: clergy[i].address
              });

            // Save a Customer in the MongoDB
            await clergy.save();
        }
    })
    .catch(err => {
        console.log('Could not connect to MongoDB.');
        process.exit();
    });
    
require('./routes/clergy.router.js')(app);
// Create a Server
var server = app.listen(8080, function () { 
    var host = server.address().address
    var port = server.address().port
    
    console.log("App listening at http://%s:%s", host, port) 
})