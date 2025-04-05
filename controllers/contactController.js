const Contact = require("../models/Contact");

exports.createContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ success: true, message: "Message received!" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error sending message" });
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch messages" });
  }
};
