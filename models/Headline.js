const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new Headlinechema object
const HeadlineSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    unique: true,
    required: true
  },
  summary: {
    type: String,
    required: false
  },
  imgUrl: {
    type: String,
    required: false
  },
  // headline set to unsaved initially
  saved: {
    type: Boolean,
    default: false
  },
   // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Headline with an associated Note
  note: {
    type: Schema.Types.ObjectId,
    ref: `Note`
  }
});

// This creates our model from the above schema, using mongoose's model method
const Headline = mongoose.model("Headline", HeadlineSchema);

// Export the Headline model
module.exports = Headline;