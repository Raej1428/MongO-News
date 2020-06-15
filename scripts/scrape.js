//scripts - scrape
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");

const scrape = function () {
  // scrape NPR site
  return axios.get("https://www.vox.com/").then(function (response) {
    const $ = cheerio.load(response.data);
    console.log(response.data);
    // empty array to hold article data
    const articles = [];
    // For each element article.item
    $("div.c-compact-river__entry ").each((i, element) => {
      articles.push({// Save data of each link enclosed in the current element
        title: $(element).find("h2.c-entry-box--compact__title").find("a").text().trim(),
        url: $(element).find("h2.c-entry-box--compact__title").find("a").attr("href"),
        summary: $(element).find("span.c-byline__author-name").text().trim(),
        image: $(element).find("div.c-entry-box--compact__image").find("img").attr("src")
      });
    });
    return articles;
  });
};

module.exports = scrape;



  // If statement worked with NPR and CNN not Vox
  // if (title && url && summary && imgUrl) {
  //   console.log(title);
  //   console.log(url);
  //   console.log(summary);
  //   console.log(imgUrl);
  //   //Remove noise
  //   let titleNeat = title.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
  //   let summaryNeat = summary.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
  //   // Insert the data in the Headline collection
  //   let dataToAdd = {
  //     title: titleNeat,
  //     url: url,
  //     summary: summaryNeat,
  //     image: image
  //   };
  //   console.log(dataToAdd);
  //   // push each article data into 'articles' array

  // }


// axios.get("https://www.vox.com/world/").then(function (response) {
//       var $ = cheerio.load(response.data);
//       $("div.c-compact-river__entry").each(function (i, element) {
//         var result = {};

//         result.title = $(this).find("h2.c-entry-box--compact__title").text().trim();
//         result.link = $(this).find("h2.c-entry-box--compact__title").children().attr("href");
//         result.summary = $(this).find("div.c-byline").text().trim();
//         result.image = $(this).find("a.c-entry-box--compact__image-wrapper").find("div.c-entry-box--compact__image").find("img").attr("src");
//         console.log(result);