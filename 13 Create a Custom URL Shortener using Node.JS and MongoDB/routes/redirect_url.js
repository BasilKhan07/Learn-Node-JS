const express = require("express");
const { handleRedirectShortURL } = require("../controllers/redirect_url");

const router = express.Router();

router.get("/:shortId", handleRedirectShortURL);

module.exports = router;
