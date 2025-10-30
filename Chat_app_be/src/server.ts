import express from "express"

const app = express();

app.use(express.json()); //check Usages

app.listen(3000);