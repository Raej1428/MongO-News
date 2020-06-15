const db = require("../models");
const scrape = require("../scripts/scrape");

module.exports = {
  scrapeHeadlines: function (req, res) {
    return scrape()
      .then(articles => {
        console.log(articles);
        return db.Headline.create(articles);
      })
      .then(dbHeadline => {
        console.log(dbHeadline);
        if (dbHeadline.length === 0) {
          res.json({
            message: `No New Articles Currently Available.`
          });
        }
        else {
          res.json({
            message: `Added ${dbHeadline.length} New Articles.`
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.json({
          message: `Article Scrape ${err}`
        });
      });
  }
};