var bot = require('fancy-groupme-bot');

// local configuration read from env.
var TOKEN = "0e088af0a4b301327e9a16a8358f1ba3"; // your groupme api token
var USER_TOKEN = "55JqxdWFl4G29PSPDcp6O7Zc2grs74giP3wDIIXz";
var GROUP = "12717380"; // the room you want to join
var NAME = "No1"; // the name of your bot
var URL = "http://azure.chriswbarry.com:8000/GroupmeBot"; // the domain you're serving from, should be accessible by Groupme.

const CONFIG = {
	token: TOKEN,
	group: GROUP,
	name: NAME,
	url: URL
};

var mybot = bot(CONFIG);

mybot.on('botRegistered', function(b) {
	console.log("I am registered");
	b.message("What's up guys?");
});

mybot.on('botMessage', function(b, message) {
	console.log("I got a message, fyi");
	if (message.name != b.name) {
		b.message(message.name + " said " + message.text);
	}
});

console.log("i am serving");
mybot.serve(8000);
