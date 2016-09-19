var renderer = require('./renderer.js');
var queryString = require("querystring");
const Profile = require("./profile.js");
const commonHeaders = {"Content-type": "text/html"}

function home(request, response){
    if(request.url === "/"){
        if (request.method.toUpperCase() === "GET"){
            response.writeHead(200, commonHeaders);
            renderer.view("header", {}, response);
            renderer.view("search", {}, response);
            renderer.view("footer", {}, response);
            response.end();
        }
        else{
            request.on("data", function(post){
                console.log(post.toString());
                var query = queryString.parse(post.toString());
                //redirect
                response.writeHead(303, {"location": "/" + query.username});
                response.end();    
            })
            
        }
    }
}
function user(request, response){
    var username = request.url.replace("/", "");
    if (username.length > 0){
        response.writeHead(200, commonHeaders);
        renderer.view("header", {}, response);
        var studentProfile = new Profile(username);
        studentProfile.on("end", function(profileJSON){
            //show profile
           var user = {
                avatarUrl: profileJSON.gravatar_url,
                username: profileJSON.profile_name, 
                badges: profileJSON.badges.length, 
                javaScriptPoints: profileJSON.points.JavaScript,
            }
            //simple response
        renderer.view("profile", user, response);
        renderer.view("footer", {}, response);
        response.end();    
        });
        
        studentProfile.on("error", function(error){
            //show error
            renderer.view("error", {errorMessage: error.message }, response);
            renderer.view("search", {}, response);
            renderer.view("footer", {}, response);
            response.end();
        });
    }
}

module.exports.home = home;
module.exports.user = user;