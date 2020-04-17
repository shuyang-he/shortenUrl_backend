const validUrl = require("valid-url");
const UrlShorten = require('../models/UrlShorten');
const shortid = require("shortid");
const errorUrl='http://localhost/error';

const getAll = async (req, res) => {
  try {
    const query = await UrlShorten.find();
    res.status(200).json(query);
  } catch (err) {
    console.log(err);
  }
}

const postShortenUrl = async (req, res) => {
  const { originalUrl, shortBaseUrl } = req.body;
  if (validUrl.isUri(shortBaseUrl)) {
  } else {
    return res
      .status(401)
      .json(
        "Invalid Base Url"
      );
  }
  const urlCode = shortid.generate();
  const updatedAt = new Date();
  if (validUrl.isUri(originalUrl)) {
    try {
      const query = await UrlShorten.findOne({ originalUrl: originalUrl });
      if (query) {
        res.status(200).json(query);
      } else {
        shortUrl = shortBaseUrl + "/" + urlCode;
        const newItem = new UrlShorten({
          originalUrl,
          shortUrl,
          urlCode,
          updatedAt
        });
        await newItem.save();
        res.status(200).json(newItem);
      }
    } catch (err) {
      res.status(401).json("Invalid User Id");
    }
  } else {
    return res
      .status(401)
      .json(
        "Invalid Original Url"
      );
  }
};

module.exports = {
  getAll: getAll,
  postShortenUrl: postShortenUrl
};
