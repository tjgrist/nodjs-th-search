var fs = require('fs');

function mergeValues(values, data){
    for(var key in values){
        data = data.replace("{{" + key + "}}", values[key]);
    }
    return data;
}

function view(template, values, response){
    //read from the template files and insert values into the content
    //write response
    var data = fs.readFileSync("./views/" + template + ".html", {encoding: "utf8"});
    data = mergeValues(values, data);
    response.write(data);
}

module.exports.view = view;