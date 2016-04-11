// sound.js
"use strict";
// if app exists use the existing copy
// else create a new object literal
var app = app || {};

// define the .sound module and immediately invoke it in an IIFE
app.sound = (function(){
	console.log("sound.js module loaded");
	var bgAudio = undefined;
	var effectAudio = undefined;
	var currentEffect = 0;
	var currentDirection = 1;
	var effectSounds = ["1.wav", "2.wav", "3.wav"]
	var gameOver = "gameOver.wav";
	

	function init(){
		bgAudio = document.querySelector("#bgAudio");
		bgAudio.volume=0.25;
		effectAudio = document.querySelector("#effectAudio");
		effectAudio.volume = 0.3;
	}
		
	function stopBGAudio(){
		bgAudio.pause();
		bgAudio.currentTime = 0;
	}
	
	function playEffect(){
		effectAudio.src = "media/" + effectSounds[currentEffect];
		effectAudio.play();
		currentEffect += currentDirection;
		if (currentEffect == effectSounds.length || currentEffect == -1){
			currentDirection *= -1;
			currentEffect += currentDirection;
		}
	}
	function playGameOver(){
		effectAudio.src = "media/" + gameOver;
		effectAudio.play();
	}
	
	function playBGAudio(){
		bgAudio.play();
	}
	
	
	return {
		init: init,
		stopBGAudio: stopBGAudio,
		playEffect: playEffect,
		playBGAudio: playBGAudio,
		playGameOver: playGameOver,
	};
		
	// export a public interface to this module
	// TODO
}());

