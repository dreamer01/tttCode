
const express = require('express')
const cors = require('cors')
const Result = require('./getResult');
const path = require('path');


const app = express()
app.use(express.json())
app.use(cors())

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.post('/input', (req,res) => {
    //console.log(req.body.number);
    Result.getText(function(result){        
        let output = result.slice(0,parseInt(req.body.number));
        //console.log(output);
        res.json({"words" : output});
    })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT , () => console.log(`Listening on Port ${PORT} ..`))