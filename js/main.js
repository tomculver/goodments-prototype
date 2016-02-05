---
---

(function(document) {

/**
 * Forms
 */
var Forms = {
	init: function() {

		$('.start-profile').hide();

		this.input = document.querySelector('.signup-input');
		this.submit = document.querySelector('.signup-submit');

		var self = this;
		if (this.input && this.submit) {
			this.submit.addEventListener('click', self.validate.bind(self));	
		}

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
		var queryString = '?email=' + this.input.value;
		var params = this.getParams();
		if (params && params[0].hasOwnProperty('results')) {
			queryString += '&results=true';
		}
		var profileLink = document.querySelector('a[rel="profile"]');
		profileLink.href += queryString;
		this.displaySuccessMessage();
	},
	displaySuccessMessage: function() {
		$('.signup-form').hide();
		$('.signup-success').show();
		$.colorbox.resize();
		var self = this;
		setTimeout(function() {
			self.displayProfile();
		}, 1500);
	},
	displayProfile: function() {
		$('body').removeClass('landing-home');
		$('.landing').hide();
		$('.start-profile').show();
		$.colorbox.close();
	}
};
Forms.init();



/**
 * Modals
 */
var Modals = {
	init: function() {

		$('a[rel="modal:open"]').colorbox({
			inline: true,
			href: '#signup',
			width: '90%',
			maxWidth: '475px'
		});

	}
};
Modals.init();



/**
 * Modals
 */
var Sorting = {
	init: function() {

		var companies = {{ site.data.companies | jsonify }};

		var params = window.location.search.length ? window.location.search.replace(/(^\?)/,'').split('&').map(function(i) {
				var node = {};
				node[i.split('=')[0]] = i.split('=')[1];
				return node;
			}) : null;

		var profileEl = document.querySelector('.profile');

		var userObj = function() {
			return params.reduce(function(obj, param) {
				return Object.assign(obj, param);
			});
		};

		var clearParams = function() {
			window.location.search = '';
		};

		var diff = function(a,b) {
			var a = a || 5;
			var b = b || 5;
			return Math.abs(parseFloat(a)-parseFloat(b));
		};

		var populateProfile = function(user) {
			var elems = profileEl.querySelectorAll('li[rel]');
			for (var i = 0; i < elems.length; i++) {
				var factor = elems[i].getAttribute('rel');
				elems[i].querySelector('span').textContent = user[factor];
			};
		};

		var sortCompanies = function(user) {
			var companyElems = document.querySelectorAll('.company');
			companies.map(function(company, index) {
				company.diff = 0;
				for (var prop in user) {
					company.diff += diff(company[prop], user[prop]);
				}
				companyElems[index].setAttribute('data-sortorder',company.diff);
				companyElems[index].querySelector('.company-match span').textContent = ((40-company.diff)/40*100) + '%';
			});

			var $companiesList = $('.companies-list');
			$companiesList.empty();
			$(companyElems).sort(function(a, b) {
				return a.dataset.sortorder - +b.dataset.sortorder;
			}).appendTo($companiesList);


		};

		var showLoader = function() {
		};

		var hideLoader = function() {
		};

		if (profileEl && params && companies) {
			var user = userObj();
			// clearParams();
			populateProfile(user);
			sortCompanies(user);
		}
		
	}
};
Sorting.init();

}(document));