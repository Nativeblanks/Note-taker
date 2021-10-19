//  Const

const express = require("express")
const app = express()
const path = require("path")
const fs = require("fs")
const { response } = require("express")

// Port number for local
let PORT = process.env.PORT  || 8080

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

//  Get notes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"));
})

app.get("/api/notes", (req, res) => {
fs.readFile("./db/db.json", "utf-8", (err, data)=>{
    if (err) {
        console.log(err);
    }else{
        res.json(JSON.parse(data));
    }
})
})

// Add notes
app.post("/api/notes", (req, res)=> {
    req.body.id = Math.floor(Math.random() * 100);
    let addNote = req.body

    const savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"));
    console.log(savedNotes);
    savedNotes.push(addNote);
    
    fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
    res.status(200).json({added: true});
})

// Delete notes

app.delete("/api/notes/:id", (req, res) => {
    let id = parseInt(req.params.id);
    console.log(id);

    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json"));
    console.log(savedNotes);

    const notes = savedNotes.filter((note) => note.id !== id);
    console.log(notes);

    fs.writeFileSync("./db/db.json", JSON.stringify(notes));
    res.json();
  });



app.listen(PORT, ()=> {
    console.log("http://localhost:8080")
})