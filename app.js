var Player = require('player');
var fs = require('fs');
var keypress = require('keypress');

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);
process.stdin.setRawMode(true);

// create player instance
var player = new Player('./01 - Butter-Fly (TV Size).mp3');

var bpm = '83';

// play now and callback when playend
player.play();
player.on('playing', function(err, player){
	console.log('Start!');
	var time = 0;
	var string = '';
	process.stdin.on('keypress', function (ch, key) {
		string += ch;
	});
	setInterval(function(){
		time += 100;
		console.log(string);
		if(string){
			fs.writeFile('./output.txt', '\r\n' + time + ',' + string , {encoding: 'utf-8', flag: 'a+'}, function(err){
				if(err) return console.log(err);
				//console.log(time);
			});	
			string = '';
		}
	}, 100);
});