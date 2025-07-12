const Url = require("../models/Url");
const generateShortCode = require("../utils/generateShortCode");

exports.createShortUrl = async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    };

    const shortCode = generateShortCode();

    try {
        const newUrl = new Url({ url, shortCode });
        await newUrl.save();
        res.status(201).json(newUrl);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};