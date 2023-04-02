const dotenv = require("dotenv").config();
require("../scripts/mongodb.script");
const events = require("./events.json");
const Event = require("../models/Event");

const populate = async () => {
  try {
    await Event.insertMany(events);
  } catch (error) {
    console.log(error);
  }
};

populate();
