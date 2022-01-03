import mongoose from "mongoose";

const { Schema } = mongoose;
mongoose.set('useCreateIndex', true);

const peopleSchema = new Schema({
  ssn: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  severity: { type: Number, required: true },
  location: {
    name: { type: String, required: true },
    description: { type: String, required: false },
  },
});

const People = mongoose.model("People", peopleSchema);
const db = { People };

export default db;