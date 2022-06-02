const expressss = require("express");
const mongoose = require("mongoose");
const app = expressss();

// connect a database
mongoose.connect("mongodb://localhost:27017/urlShortner", {
    useNewUrlParser: true,
    useUnifiedTopology:true,
},console.log("database connected"));

// set app here 
app.set("view engine", "ejs");

// set url



app.get("/", (req, res) => {
    res.render("index");
});

// connect data base
app.post("/shortUrls", (req, res) => {
    
});


app.listen(process.env.PORT||2341, async (re, res) => {
    try {
        console.log("app is running or port 2341")
    }
    catch (error) {
        console.log(error);
    }
});