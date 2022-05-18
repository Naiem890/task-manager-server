const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect with mongodb

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h7lye.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const taskCollection = client
      .db("taskManager")
      .collection("taskCollection");
    /* app.post("/task", (req, res) => {
      console.log(req.body);
    }); */

    app.get("/new", (req, res) => {
      console.log("this is new");
    });
  } catch (err) {
    console.log(err);
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

// EndPoints
app.get("/", (req, res) => {
  res.send("Hello Worldddddrrrdsss!");
});
app.get("/home", (req, res) => {
  res.send("Hello !");
});
/* app.post("/task", (req, res) => {
  console.log(req.body);
}); */

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
