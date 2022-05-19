const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

const ObjectId = require("mongodb").ObjectId;
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
    // Mongodb Setup
    await client.connect();
    const taskCollection = client
      .db("taskManager")
      .collection("taskCollection");

    // Create a task
    app.post("/task", async (req, res) => {
      // console.log(req.body);
      const newTask = req.body;
      const result = await taskCollection.insertOne(newTask);
      res.send(result);
    });

    // Read all task
    app.get("/task", async (req, res) => {
      const query = {};
      const cursor = taskCollection.find(query);
      const tasks = await cursor.toArray();
      res.send(tasks);
    });

    app.delete("/task/:id", async (req, res) => {
      console.log(req.params.id);

      const query = { _id: ObjectId(id) };
      const result = await taskCollection.deleteOne(query);
      res.send(result);
    });

    app.get("/new", (req, res) => {
      res.send("this is new");
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

/* app.post("/task", (req, res) => {
  console.log(req.body);
}); */

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
