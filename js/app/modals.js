/**
 * Modals
 */
var VanillaModal = require('../vendor/vanilla-modal.js').VanillaModal;

var Modals = {
	init: function() {

		var modalEl = document.createElement('div');
		modalEl.setAttribute('class','modal');
		modalEl.innerHTML = '<div class="modal-inner">' +
			'<a rel="modal:close">Close</a>' +
			'<div class="modal-content">' +
			'</div>' +
			'</div>';
		document.body.appendChild(modalEl);

		var options = {
			loadClass : 'modal-init',
		};

		var modal = new VanillaModal(options);
	}
};

module.exports = Modals;