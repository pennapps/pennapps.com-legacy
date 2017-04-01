var ogs = require('open-graph-scraper');
var jsonfile = require('jsonfile');
var async = require('async');
var links = jsonfile.readFileSync('./data/linksList.json');
var fileName = "./data/links.json";
var currentLinks = jsonfile.readFileSync(fileName);

var keys = Object.keys(links);
var fileData = {};
for (var i = 0; i < keys.length; i++) {
  fileData[keys[i]] = [];
}

async.eachOfSeries(links, (list, key, callback1) => {
  async.eachOfSeries(list, (link, index, callback2) => {
    async.detect(currentLinks[key], (obj, callback3) => {
      obj.url === link ? callback3(null, true) : callback3(null, false);
    }, (err, result) => {
      if (result) {
        fileData[key].push(result);
        callback2();
      } else {
        var item = {};
        var options = {'url': link};
        ogs(options, function (err, results) {
            if (results.success) {
              item.title = results.data.ogTitle ? results.data.ogTitle : results.data.twitterTitle;
              item.site = results.data.ogSiteName ? results.data.ogSiteName : results.data.twitterCreator;
              item.description = results.data.ogDescription ? results.data.ogDescription : results.data.twitterDescription;
              item.url = link;
              item.image = results.data.ogImage ? results.data.ogImage : results.data.twitterImage;
              fileData[key].push(item);
              callback2();
            } else {
              console.log("ALERT: failed to scrape: " + link);
              callback2();
            }
        });
      }
    })
  }, (err) => err ? callback1("error") : callback1());
}, (err) => {
  if (err) {
    process.exit(1);
  }
  
  jsonfile.writeFile(fileName, fileData, function (err) {
    if (err) {
      console.log(err);
      process.exit (1);
    }

    process.exit(0);
  });
});
