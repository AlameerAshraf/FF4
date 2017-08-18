var jsonfile = require('jsonfile');
var path = require('path');


var exported = module.exports = {};

// Function To Load Resources of Translation ...!

exported.LoadResources = function (lang, RequestedPage) {
    var TranslatedPageObject = {};
    var fileDir = path.join(__dirname + '/../Resources/');

    var RequestedPageResource = "res-" + RequestedPage + ".json";
    var resFile = fileDir + RequestedPageResource;

    return new Promise((resolve, reject) => {
        jsonfile.readFile(resFile, function (err, result) {
            if (!err) {
                if (lang == "ar") {
                    for (var Word in result) {
                        TranslatedPageObject[Word] = result[Word].ar;
                    }
                }
                else if (lang = "en") {
                    for (var Word in result) {
                        TranslatedPageObject[Word] = result[Word].en;
                    }
                }
                resolve(TranslatedPageObject);
            }
            else {
                reject({});
            }
        });
    });
}