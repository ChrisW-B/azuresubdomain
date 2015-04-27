//modified version of https://github.com/lgarron/simple-mp3-js/blob/master/app.js

var tags = {
	"short": "playTagShort",
	"full": "playTagFull"
};

function finalize(url, name) {
	console.log("Finalizing!");

	document.getElementById(tags[name]).src = url;
	document.getElementById(tags[name] + "Bar").value = 1;

	var downloadLink = document.createElement("a");
	downloadLink.href = url;
	downloadLink.download = theFilename + "-" + name + ".mp3";
	downloadLink.click();
}

function process(buffer) {
	var config = {
		samplerate: buffer.sampleRate
	};
	var pm = {
		cmd: 'init',
		config: config
	};
	onmsg = function(e) {
		console.log("onmessage: ", e.data);
		if (e.data.cmd == "progress") {
			document.getElementById(tags[e.data.name] + "Bar").value = e.data.fraction;
		}
		if (e.data.cmd == "done") {
			theURL = e.data.url;
			theData = e.data;
			finalize(e.data.url, e.data.name);
		}
	};
	var encoder = new Worker('encoder.js');
	encoder.onmessage = onmsg;
	encoder.postMessage(pm);
	encoder.postMessage({
		cmd: 'encode',
		length: buffer.length,
		left: buffer.getChannelData(0),
		right: buffer.getChannelData(1),
		name: "full"
	});
}
