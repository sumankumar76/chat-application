import Message from "../models/messageModel.js";

// Function to handle the creation of a new message.
const createMessage = async (req, res) => {
  const { chatId, senderId, text } = req.body;

// Creating a new instance of the Message model with the provided data.
  const message = new Message({
    chatId,
    senderId,
    text,
  });

// Saving the new message to the database and sending a success response with the saved message.
  try {
    const response = await message.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    // Finding all messages in the database that match the given chatId.
    const messages = await Message.find({ chatId });
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export { createMessage, getMessages };
