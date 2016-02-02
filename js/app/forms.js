/**
 * Forms
 */

var Forms = {
	init: function() {
		this.input = document.querySelector('.signup-input');
		this.submit = document.querySelector('.signup-submit');

		var self = this;
		this.submit.addEventListener('click', self.validate.bind(self));
	},
	validate: function() {
		if (!this.input.checkValidity()) {
			// Do error
		} else {
			this.submitForm();
		}
	},
	getParams: function() {
		return params = window.location.search.length ? window.location.search.replace(/(^\?)/,'').split('&').map(function(i) {
			var node = {};
			node[i.split('=')[0]] = i.split('=')[1];
			return node;
		}) : null;
	},
	submitForm: function() {
		var url = this.submit.dataset.href + '?email=' + this.input.value;
		var params = this.getParams();
		if (params[0] && params[0].hasOwnProperty('results')) {
			url += '&results=true';
		}
		window.location = url;
	}
};

module.exports = Forms;