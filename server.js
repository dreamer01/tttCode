
const express = require('express')
const cors = require('cors')
const Result = require('./getResult');


const app = express()
app.use(express.json())
app.use(cors())

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