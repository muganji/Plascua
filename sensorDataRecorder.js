/*!
 * sensorDataRecorder.js v1.0.0
 * Author: Julius Muganji & Dr. Engineer Bainomugisha
 * (c) 2018 Makerere University All events Listener
 * Released under the Makerere University License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.sensorDataRecorder = factory());
}(this, (function () { 'use strict';
/**
 * sensorDataRecorder constructor that defines initial variables and
 * sets browser width and height.
 * @knownbug: if user decides to change browser window size on-the-go
 * 		it may cause bugs during playback
 */
function sensorDataRecorder() {
	if (this === undefined) {
		console.error('Have you initialized sensorDataRecorder with "new" statement? (i.e. var sensorDataRecorder = new sensorDataRecorder())');
		return;
	}
	this.events = [];
	this.timeouts = [];
	this.startedAt = 0;
	this.finishedAt = 0;
	this.recording = false;
	this.window = {
		width : window.outerWidth,
		height : window.outerHeight
	};

	// Stores initial listeners
	this.onmousemove = window.onmousemove;
	this.onmousedown = window.onmousedown;
	this.onscroll = window.onscroll;
};

/**
 * Here goes all sensorDataRecorder magic
 */
sensorDataRecorder.prototype = {
	
	/** sensorDataRecorder Listeners **/

	/**
	 * Listener intended to be used with onmousemove
	 * @param callback function a callback fnc
	 * @return function the mouse move listener
	 */
	moveListener : function(callback) {
		return function(e) {
			if (callback) callback(['m', e.clientX, e.clientY]);
		}
	},

	/**
	 * Listener intended to be used with onmousedown
	 * @param callback function a callback fnc
	 * @return function the mouse click listener
	 */
	clickListener : function(callback) {
		return function(e) {
			if (callback) callback(['c', e.clientX, e.clientY]);
		}
	},

	/**
	 * Listener intended to be used with onscroll
	 * @param callback function a callback fnc
	 * @return function the window scroll listener
	 */
	scrollListener : function(callback) {
		return function(e) {
			if (callback) callback(['s', document.scrollingElement.scrollLeft, document.scrollingElement.scrollTop]);
		}
	},

	/** sensorDataRecorder recording tools **/

	/**
	 * Starts screen recording
	 */
	record : function() {
		if (this.recording) return;

		var self = this;
		if (self.startedAt == 0) self.startedAt = new Date().getTime() / 1000;

		// Sets initial scroll position of the window
		self.frames.push(['s', document.scrollingElement.scrollLeft, document.scrollingElement.scrollTop]);
		
		// Defines Mus listeners on window
		window.onmousemove = this.moveListener(function(pos) {
			self.frames.push(pos);
		});
		window.onmousedown = this.clickListener(function(click) {
			self.frames.push(click);
		});
		window.onscroll = this.scrollListener(function(scroll) {
			self.frames.push(scroll);
		});

		// Sets our recording flag
		self.recording = true;
	},

	/**
	 * Stops screen recording
	 */
	stop : function() {
		this.finishedAt = new Date().getTime() / 1000;
		window.onmousemove = this.onmousemove;
		window.onmousedown = this.onmousedown;
		window.onscroll = this.onscroll;

		// Sets our recording flag
		this.timeouts = [];
		this.recording = false;
	},
	/**
	 * Releases Mus instance
	 */
	release : function() {
		this.frames = [];
		this.startedAt = 0;
		this.finishedAt = 0;
		this.stop();
	},

	/** sensorDataRecorder internal functions **/

	/**
	 * Clears all timeouts stored
	 */
	clearTimeouts : function() {
		for (var i in this.timeouts) {
			clearTimeout(this.timeouts[i]);
		}

		this.timeouts = [];
	},

	/**
	 * Calculates time elapsed during recording
	 * @return integer time elapsed
	 */
	timeElapsed : function() {
		return this.finishedAt - this.startedAt;
	},

	/**
	 * Calculates current X coordinate of mouse based on window dimensions provided
	 * @param x integer the x position
	 * @return integer calculated x position
	 */
	getXCoordinate : function(x) {
		if (window.outerWidth > this.window.width) {
			return parseInt(this.window.width * x / window.outerWidth);
		}

		return parseInt(window.outerWidth * x / this.window.width);
	},

	/**
	 * Calculates current Y coordinate of mouse based on window dimensions provided
	 * @param y integer the y position
	 * @return integer calculated y position
	 */
	getYCoordinate : function(y) {
		if (window.outerHeight > this.window.height) {
			return parseInt(this.window.height * y / window.outerHeight);
		}

		return parseInt(window.outerHeight * y / this.window.height);
	},

	/** Public getters and setters **/

	/**
	 * Get all generated sensorDataRecorder data
	 * @return array generated sensorDataRecorder data
	 */
	getData : function() {
		return {
			frames : this.frames,
			timeElapsed : this.timeElapsed(),
			window : {
				width : window.outerWidth,
				height : window.outerHeight
			}
		};
	},

	/**
	 * Sets generated Mus data for playback
	 * @param data array generated Mus data
	 */
	setData : function(data) {
		if (data.frames) this.frames = data.frames;
		if (data.window) this.window = data.window;
	},

	/**
	 * Sets custom window size for playback
	 * @param width integer window width
	 * @param height integer window height
	 */
	setWindowSize : function(width, height) {
		this.window.width = width;
		this.window.height = height;
	},

	/**
	 * Informs if sensorDataRecorder is currently recording
	 * @return boolean is recording?
	 */
	isRecording : function() {
		return this.recording;
	},


};

return sensorDataRecorder;

})));