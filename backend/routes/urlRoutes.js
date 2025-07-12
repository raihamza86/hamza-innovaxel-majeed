const express = require("express");
const { createShortUrl, getOriginalUrl, updateUrl } = require("../controllers/urlController");

const router = express.Router();

router.post("/", createShortUrl);
router.get("/:shortCode", getOriginalUrl);
router.put("/:shortCode", updateUrl);

module.exports = router;