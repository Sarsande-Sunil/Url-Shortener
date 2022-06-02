const expressss = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./Models/ShortUrl.model");
const app = expressss();

// connect a database
mongoose.connect("mongodb://localhost:27017/urlShortner", {
    useNewUrlParser: true,
    useUnifiedTopology:true,
});

// set app here 
app.set("view engine", "ejs");
app.use(expressss.urlencoded({ extended: false }));
// set url



app.get("/", async (req, res) => {
    try {
        const shortUrls = await ShortUrl.find();
        res.render("index", { shortUrls: shortUrls });
    }
    catch (error) {
        console.log(error.message);
    }
});


// connect data base
app.post("/shortUrls", async (req, res) => {
    try {
        await ShortUrl.create({ full: req.body.fullUrl });
        res.redirect("/")
    }
    catch (error) {
        console.log(error.message)
    }
});

// get back our short and redirect through that
app.get("/:shortUrl", async (req, res) => {
    try {
        const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
        if (shortUrl == null) return res.status(404);

        shortUrl.clicks++;
        shortUrl.save();

        res.redirect(shortUrl.full);
    }
    catch (error) {
        console.log(error);
    }
});


app.listen(process.env.PORT||2341, async (re, res) => {
    try {
        console.log("app is running or port 2341")
    }
    catch (error) {
        console.log(error);
    }
});