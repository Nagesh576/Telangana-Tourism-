const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/telangana");

const DistrictSchema = new mongoose.Schema({
  name: String,
  description: String,
  places: [
    {
      placeName: String,
      image: String,
      about: String
    }
  ]
});

const District = mongoose.model("District", DistrictSchema);

// Root route - helpful for testing
app.get("/", (req, res) => {
  res.json({ 
    message: "Telangana Places API is running",
    endpoints: {
      getAllDistricts: "GET /api/districts",
      getDistrictByName: "GET /api/districts/:name"
    }
  });
});

// Your existing routes
app.get("/api/districts", async (req, res) => {
  const data = await District.find();
  res.json(data);
});

app.get("/api/districts/:name", async (req, res) => {
  const data = await District.findOne({ name: req.params.name });
  res.json(data);
});

app.listen(5000, () => console.log("Backend running on 5000"));