const express = require('express')
const app = express()



app.get('/login',(req,res) => {
    res.send('HI')
})

app.listen(19006, () => {console.log("Server started on port 19006") } )