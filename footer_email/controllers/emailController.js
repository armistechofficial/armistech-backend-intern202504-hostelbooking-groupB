const Email = require("../models/Email");
const { z } = require("zod");

const emailSchema = z.object({
  email: z.string().email("Invalid email format")
});

exports.subscribeEmail = async (req, res) => {
  try {
    const { email } = emailSchema.parse(req.body);

    // Check if email already subscribed
    const existing = await Email.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Already subscribed!" });
    }

    // Save to DB
    await Email.create({ email });
    res.status(201).json({ message: "Subscription successful!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
