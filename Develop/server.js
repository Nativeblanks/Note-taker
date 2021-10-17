const express = require("express")
const app = express()
const path = require("path")
const fs = require("fs")
const { response } = require("express")

let PORT = process.env.PORT  || 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
})

app.get("/api/notes", (req, res) => {
fs.readFile("./db/db.json", "utf-8", (err, data)=>{
    if (err) {
        console.log(err)
    }else{
        res.json(JSON.parse(data))
    }
})
})





app.listen(PORT, ()=> {
    console.log("http://localhost:8080")
})