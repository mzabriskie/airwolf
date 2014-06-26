(function (window, document) {
	'use strict';

	// Initialize objects
	var starfox = new Starfox(),
		nStream = new NodecopterStream(document.getElementById('stream')),
		nStatus = new NodecopterStatus();

	// Battery widget
	(function () {
		var batteryEl	= document.getElementById('battery'),
			percentEl	= batteryEl.querySelector('.percent'),
			fillEl		= batteryEl.querySelector('.fill');

		nStatus.on('change', function (message) {
			var data = JSON.parse(message.data);

			if (data && data.demo && typeof data.demo.batteryPercentage !== 'undefined') {
				var p = data.demo.batteryPercentage;

				// Update percentage
				percentEl.innerHTML = p + '%';
				fillEl.style.width = p + '%';

				// Update className
				if (p > 20) {
					batteryEl.className = 'good';
				} else {
					batteryEl.className = 'bad';
				}
			}
		});
	})();

	// Altimeter widget
	(function () {
		var containerEl = document.getElementById('altimeter').querySelector('.container'),
			max = 250, min = -150,
			TICK_OFFSET = 9,
			TICK_HEIGHT = 15,
			METERS_IN_FEET = .3048;

		// Render ticks
		for (var i=max; i>=min; i--) {
			var e = document.createElement('div');
			if (Math.abs(i % 10) === 0 || Math.abs(i % 10) === 5) {
				var l = document.createElement('label');
				l.innerHTML = i;
				e.appendChild(l);
			}
			containerEl.appendChild(e);
		}

		function setAltitude(a) {
			containerEl.style.top = -((max - TICK_OFFSET - (a / METERS_IN_FEET)) * TICK_HEIGHT) + 'px';
		}

		nStatus.on('change', function (message) {
			var data = JSON.parse(message.data);

			if (data && data.demo && typeof data.demo.altitude !== 'undefined') {
				setAltitude(data.demo.altitude);
			}
		});
	})();

	// Handle window scaling
	(function (window) {
		var streamEl	= document.getElementById('stream'),
			canvasEl	= streamEl.querySelector('canvas');

		function scale() {
			streamEl.style.width = window.innerWidth + 'px';
			streamEl.style.height = window.innerHeight + 'px';

			canvasEl.style.width = window.innerWidth + 'px';
			canvasEl.style.height = window.innerHeight + 'px';
		}

		scale();

		window.onresize = scale;
	})(window);
})(window, document);
