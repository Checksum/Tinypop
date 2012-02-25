/**
 * TINYPOP - Lightweight growl like notifications in JavaScript
 *
 * Version: 1.0
 * Date: Feb 25th, 2012
 * Author: Srinath
 * Source: http://github.com/Checksum/tinypop
 * Demo: http://iambot.net/demo/tinypop/
 *
 */
;(function(window) {
	// Default options	
	var	count			= 0,
		  speed			= {
				slow	: {
					step	 	: 5,
					timeout	: 75
				},
				normal: {
					step		: 7.5,
					timeout	: 50
				},
				fast	: {
					step		: 10,
					timeout	:	25
				}
			},			
			defaults 	= {
				position: 'bottom-right',
				timeout	: 1500,
				sticky	: false,
				speed		: 'medium'
			};
	
	// Some private methods
	function $(id) {
		return document.getElementById(id);
	}

	// This fades in the popup
	function fadein() {
		var that = this;
		that.handle = setInterval(function() {
			that.opacity = that.opacity + speed[that.o.speed].step || speed[that.o.speed].step;
			that.popup.style.opacity = that.opacity / 100;
			that.popup.style.filter  = 'alpha(opacity='+that.opacity+')';
			if( that.opacity >= 90 ) {
				clearInterval(that.handle);
				that.o.sticky || setTimeout(function() { 
						fadeout.apply(that); 
					}, that.o.timeout);
			}
		}, speed[that.o.speed].timeout);
	}
	
	// This fades out the popup
	function fadeout() {
		var that = this;
		that.handle = setInterval(function() {
			that.opacity = that.opacity - speed[that.o.speed].step;
			that.popup.style.opacity = that.opacity / 100;
			that.popup.style.filter  = 'alpha(opacity='+that.opacity+')';
			if( that.opacity <= 0 ) {
				clearInterval(that.handle);
			}
		}, speed[that.o.speed].timeout);
	}
	
	// Our main object
	var TINYPOP = function(msg, opts) {
		var wrapper, 
				that = this;
		
		// Replace all " with \"
		msg = msg ? msg.replace('"','\"') : ' ';
		this.o = opts || {};
		
		// Override default options
		for( opt in defaults ) {
			if( !this.o.hasOwnProperty(opt) ) {
				this.o[opt] = defaults[opt];
			}
		}
		
		// Create the wrapper div if not exists
		wrapper = $("popwrap-"+this.o.position);
		if( !wrapper ) {
			wrapper = document.createElement("div");
			wrapper.className = 'popwrap '+this.o.position;
			document.body.appendChild(wrapper);
		}
		// Now create our popup div if it doesn't exist
		this.popup = document.createElement("div");
		this.popup.innerHTML = "<span class='close' id='close"+count+"'>&times;</span>";
		this.popup.innerHTML += "<div class='poptext'>"+msg+"</div>";
		this.popup.className = "popup";
		this.popup.id = "popup"+count;
		// This is the important property to "animate"
		this.opacity = this.popup.style.opacity =  0;
		this.popup.style.filter  = 'alpha(opacity=0)';
		// Add our popup to our wrapper
		wrapper.appendChild(this.popup);
		// For sticky popups, this binds the close icon
		if( this.o.sticky ) {
			$("close"+count).onclick = function() {
				fadeout.apply(that);
			};
		}
		// Now increment our popup count
		count = count + 1;
		
		// Animate and show our popup
		fadein.apply(that);
	};
	
	// Expose these methods to our instance
	TINYPOP.prototype = {
		// Show a different message in the popup
		show: function(msg) {
			this.popup.children[1].innerHTML = msg;
			fadein.apply(this);
		},
		// Hide the popup
		hide: function() {
			fadeout.apply(this);
		}
	};
	
	// Now expose our object to the global scope so that
	// you can create a new popup by doing new POPUP(msg)
	window.TINYPOP = TINYPOP;

})(window);
