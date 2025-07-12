const express = require("express");
const { createShortUrl, getOriginalUrl, updateUrl, deleteUrl, getStats } = require("../controllers/urlController");

const router = express.Router();

router.post("/", createShortUrl);
router.get("/:shortCode", getOriginalUrl);
router.put("/:shortCode", updateUrl);
router.delete("/:shortCode", deleteUrl);
router.get("/:shortCode/stats", getStats);

module.exports = router;