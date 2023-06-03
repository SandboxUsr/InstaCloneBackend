let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
let bodyParser = require("body-parser");
require("./postDetails");
let mongo_url = process.env.mongo_url;

let app = express();
app.use(cors());
app.use(bodyParser.json());

let post = mongoose.model("postDetails")

mongoose.connect("mongodb+srv://mahajandhiraj99:FBL4kgw5LNpTjP0h@cluster0.u2zjdpm.mongodb.net/?retryWrites=true&w=majority")
.then((res) => {
    console.log("Connected to MongoDb Server");
}).catch((err) => {
    console.log(mongo_url);
    console.log("Connection failed");
})

app.post("/uploadPost", async (req, res) => {
    let data = req.body;
    try {
        await post.create({
            image: data.image,
            author: data.author,
            location: data.location,
            description: data.description
        });

        res.header("Access-Control-Allow-Origin", "*");
        res.send({status: "OK"});

    }
    catch (err) {
        console.log(err);
    }
})

app.get("/get-post", async (req, res) => {
    try {
        await post.find({}).then((data) => {
            res.status(200).json({
                messege: "Data fetched Successfully",
                data: data
            })
        })
    }
    catch (err) {
        console.log(err);
    }
})

app.listen(process.env.PORT || 5000,() => {
    console.log("App is listening on port 5000")
})