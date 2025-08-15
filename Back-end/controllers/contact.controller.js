import contactModel from "../models/contact.model.js";

// GET all contacts
const getContact = async (req, res) => {
  try {
    console.log("Request received");
    const contacts = await contactModel.find();
    if (contacts && contacts.length > 0) {
      res.status(200).json({ message: "Contacts found", contacts });
    } else {
      res.status(404).json({ message: "No contacts found", contacts: [] });
    }
  } catch (error) {
    console.error("Error fetching contacts:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET contacts by user ID
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const contactsById = await contactModel.findOne({ user_id: id });

    if (!contactsById) {
      const newContact = await contactModel.create({
        user_id: id,
        contacts: [],
      });

      return res.status(201).json({
        message: "No existing contacts, new record created",
        contacts: newContact,
      });
    }

    return res.status(200).json({
      message: "User contacts found",
      contacts: contactsById,
    });
  } catch (error) {
    console.error("Error in getById:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// CREATE a contact
const CreateContact = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, number } = req.body;

    if (!name || !number) {
      return res.status(400).json({
        message: "Incomplete data! Name and number are required.",
      });
    }

    let dbContact = await contactModel.findOne({ user_id: userId });

    if (!dbContact) {
      dbContact = new contactModel({
        user_id: userId,
        contacts: [],
      });
    }

    const isNumberAlreadyExists = dbContact.contacts.some(
      (contact) => contact.number === number && contact.name === name
    );

    if (isNumberAlreadyExists) {
      return res.status(409).json({
        message: "Contact with the same name and number already exists.",
      });
    }

    dbContact.contacts.push({ name, number });
    await dbContact.save({ validateModifiedOnly: true });

    return res.status(201).json({
      message: "Contact created successfully.",
    });
  } catch (error) {
    console.error("Error in CreateContact:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// UPDATE a contact number
const UpdateContact = async (req, res) => {
  try {
    const { userId, numberId } = req.params;
    const { name, number } = req.body;

    if (!userId || !numberId) {
      return res.status(400).json({
        message: "User ID and number ID are required!",
      });
    }

    if (!name || !number) {
      return res.status(400).json({
        message: "Name and number are required!",
      });
    }

    const dbContact = await contactModel.findOne({ user_id: userId });

    if (!dbContact) {
      return res.status(404).json({
        message: "Contacts document not found!",
      });
    }

    const numberIndex = dbContact.contacts.findIndex(
      (con) => con._id.toString() === numberId
    );

    if (numberIndex === -1) {
      return res.status(404).json({
        message: "Number not found!",
      });
    }

    dbContact.contacts[numberIndex].name =
      name || dbContact.contacts[numberIndex].name;
    dbContact.contacts[numberIndex].number =
      number || dbContact.contacts[numberIndex].number;

    await dbContact.save({ validateModifiedOnly: true });

    return res.status(200).json({
      message: "Updated successfully.",
    });
  } catch (error) {
    console.error("Error in UpdateContact:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE a contact number by numberId
const DeleteContact = async (req, res) => {
  try {
    const { userId, numberId } = req.params;

    if (!userId || !numberId) {
      return res.status(400).json({
        message: "User ID and number ID are required!",
      });
    }

    const dbContact = await contactModel.findOne({ user_id: userId });

    if (!dbContact) {
      return res.status(404).json({ message: "Contacts not found!" });
    }

    dbContact.contacts = dbContact.contacts.filter(
      (contact) => contact._id.toString() !== numberId
    );

    await dbContact.save({ validateModifiedOnly: true });

    return res.status(200).json({ message: "Contact deleted successfully." });
  } catch (error) {
    console.error("Error in DeleteContact:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET a specific number by numberId
const getSpecificNumber = async (req, res) => {
  try {
    console.log(req.body);
    const userId = req.params.userId || "";
    const numberId = req.params.numberId || "";

    if (!userId || !numberId) {
      return res.status(400).json({
        message: "User ID and number ID are required!",
      });
    }

    const dbContact = await contactModel.findOne({ user_id: userId });

    if (!dbContact) {
      return res.status(404).json({ message: "Contacts not found!" });
    }

    const number = dbContact.contacts.find(
      (con) => con._id.toString() === numberId
    );

    if (number) {
      return res.status(200).json({
        message: "Number found",
        contact: number,
      });
    } else {
      return res.status(404).json({
        message: "Number not found!",
      });
    }
  } catch (error) {
    console.error("Error in getSpecificNumber:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Export all controllers
export {
  CreateContact,
  DeleteContact,
  UpdateContact,
  getContact,
  getById,
  getSpecificNumber,
};
