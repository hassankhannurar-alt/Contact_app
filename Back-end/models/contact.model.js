import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  contacts: [{ name: String, number: String }],
  user_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
});
export default mongoose.model("contacts", ContactSchema);
