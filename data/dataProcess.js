//Converter Class
var Converter = require("csvtojson").core.Converter;
var fs = require("fs");
var lorem = require('lorem-ipsum');

var parserMgr = require("csvtojson").core.parserMgr;

parserMgr.addParser("TextScrambler", /^Text/, function (params) {
    var columnTitle = params.head; //params.head be like: *parserRegExp*ColumnName;
    //var fieldName=columnTitle.replace(this.regExp, ""); //this.regExp is the regular expression above.
    params.resultRow['Text'] = lorem({
        sentenceLowerBound: 2,
        sentenceUpperBound: 15
    }); //(params.item);
});
parserMgr.addParser("Date", /^Booked/, function (params) {
    params.resultRow['Date'] = params.item;
});
parserMgr.addParser("Amount", /^Credit/, function (params) {
    params.resultRow['Amount'] = parseFloat(params.item);
});
parserMgr.addParser("ValueDate", /^Valuta/, function (params) {
    //params.resultRow['Date'] = params.item;
});

var _dir = './';

fs.readdir(_dir, function (err, files) {

    files.forEach(function (f) {
        if (/\.csv$/.test(f)) {
            convertToCsv(_dir + f);
        }
    })

});

function convertToCsv(csvFile) {

    var csvFileName = csvFile;
    var fileStream = fs.createReadStream(csvFileName);
//new converter instance
    var param = {delimiter: ';'};
    var csvConverter = new Converter(param);

//end_parsed will be emitted once parsing finished
    csvConverter.on("end_parsed", function (jsonObj) {

        var jsonFile = csvFile.replace(/\.csv$/, '.json');

        fs.writeFile(_dir + jsonFile, JSON.stringify(jsonObj, null, 2), function() {
            console.log('just finished ' + csvFile + ': ' + jsonObj.length); //here is your result json object
        });
    });

//read from file
    fileStream.pipe(csvConverter);
}
