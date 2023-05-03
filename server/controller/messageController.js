import Message from "./../model/messageModel.js";
export const addMessage = async (req, res) => {
  try {
    const { from, to, message } = req.body;
    const data = await Message.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    if (data)
      return res.json({
        status: 200,
        message: {
          message: data.message.text,
          updatedAt: data.updatedAt,
        },
      });
    return res.json("Message added failed");
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};
export const getAllMessage = async (req, res) => {
  try {
    const { from, to } = req.body;
    let messages = await Message.find({
      users: {
        $all: [from, to],
      },
    }).sort({
      updatedAt: 1,
    });
    messages = messages.map((msg) => ({
      fromSelf: msg.sender.toString() === from,
      message: msg.message.text,
      updatedAt: msg.updatedAt,
    }));
    return res.json({
      status: true,
      messages,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
};
