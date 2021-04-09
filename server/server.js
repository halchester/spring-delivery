const app = require("express")();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());

let options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Route imports
const riderRoute = require("./routes/rider.route");
app.use("/", riderRoute);

app.get("/", (req, res) => {
  res.send("Hi");
});

mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.x3hwc.mongodb.net/spring-snacks?retryWrites=true&w=majority`,
  options,
  () => console.log("Connected to db.")
);

app.listen(process.env.PORT || 8000, () => console.log("Server up!"));
