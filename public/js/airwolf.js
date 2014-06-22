(function (window, document) {
	'use strict';

	// Initialize objects
	var starfox = new Starfox(),
		nStream = new NodecopterStream(document.getElementById('stream')),
		nStatus = new NodecopterStatus();

	// Handle status change
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
