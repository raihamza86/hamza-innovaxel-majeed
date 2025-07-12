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

exports.getOriginalUrl = async (req, res) => {
    const { shortCode } = req.params;

    try {
        const found = await Url.findOne({ shortCode });

        if (!found) {
            return res.status(404).json({ error: "URL not found" });
        };

        found.accessCount += 1;
        found.updatedAt = new Date();

        await found.save();

        res.status(200).json(found);

    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    };
};