---
---

(function(document) {

/**
 * Utilities
 */
 var Utils = {
	getParams: function() {
		var params = [];
		document.location.search.replace(/(^\?)/,'').split("&").map(function(i) {
			var node = {};
			node[i.split('=')[0]] = i.split('=')[1];
			params.push(node);
			return true;
		});
		return params;
	},
	isPage: function(pageName) {
		return $('body').hasClass(pageName);
	}
 };



/**
 * Landing page
 */
var Landing = {

	init: function() {

		if (Utils.isPage('landing')) {

			var input = document.querySelector('.signup-input');
			var submit = document.querySelector('.signup-submit');

			hideProfile();
			setupModal();

			submit.addEventListener('click', validate);

		}

		function validate() {
			if (!input.checkValidity()) {
				// Do error
			} else {
				submitForm();
			}
		}

		function submitForm() {
			buildQueryString();
			saveEmail();
		}

		function buildQueryString() {
			var queryString = '?email=' + input.value;
			var params = Utils.getParams();
			if (params && params[0].hasOwnProperty('results')) {
				queryString += '&results=true';
			}
			if (document.referrer != '') {
				queryString += '&referrer=' + document.referrer;
			}
			var profileLink = document.querySelector('a[rel="profile"]');
			profileLink.href += queryString;
		}

		function saveEmail() {
			var $formGroup = $('div[role="group"]');
			$formGroup.addClass('submitting');

			var created_at = new Date();

			$.post(
				'https://sheetsu.com/apis/9439a7ef',
				{ "email_address": input.value, "created_at": created_at },
				function(msg) {
					console.log('Success', msg);
				}
			).done(function(data) {
				console.log('Done', data);
				$formGroup.removeClass('submitting');
				displaySuccessMessage();
			}).fail(function(error) {
				console.log('Error', error);
				// Do error state
			});
		}

		function displaySuccessMessage() {
			$('.signup-form').hide();
			$('.signup-success').show();
			$.colorbox.resize();
			setTimeout(function() {
				displayProfile();
			}, 1500);
		}

		function hideProfile() {
			$('.start-profile').hide();
		}

		function displayProfile() {
			$('body').removeClass('landing-home');
			$('.landing-intro').hide();
			$('.start-profile').show();
			$.colorbox.close();
		}

		function setupModal() {
			$('a[rel="modal:open"]').colorbox({
				inline: true,
				href: '#signup',
				width: '90%',
				maxWidth: '475px'
			});
		}

	}
};
Landing.init();



/**
 * Displaying and sorting the list of companies on the results page
 */
var Results = {

	init: function() {

		var params = Utils.getParams();
		var profileEl = getProfileElem();
		var companies = listCompanies();

		if (Utils.isPage('thanks')) {

			var showResults = null;
			params.forEach(function(param) {
				if (param.hasOwnProperty('results')) {
					showResults = param['results'] === 'true' ? true : false;
				}	
			});

			if (showResults) {
				redirectToResultsPage();
			}

		} else if (Utils.isPage('results')) {
			var user = createUserProfile();
			// clearParams();
			populateProfile(user);
			sortCompanies(user);
		}

		function redirectToResultsPage() {
			window.location.pathname = '/results/';
		}

		function listCompanies() {
			return {{ site.data.companies | jsonify }}.filter(isNotExcluded);
		}

		function isNotExcluded(item) {
			return !item.exclude;
		}
		function getProfileElem() {
			return document.querySelector('.profile');
		}

		function createUserProfile() {

			var user = {};
			var factors = ['f','e','s','g'];

			var parsedVals = params.map(function(param) {
				var key = Object.keys(param)[0];
				var val = param[key];
				if (factors.indexOf(key) > -1) {
					val = parsedValueFromRaw(val);
					user[key] = val;
				}
				return param;
			});

			return user;

		};

		function parsedValueFromRaw(rawValue) {
			var scale = ['E','D','C','B','A']; // Where A = most important & E = least important
			return (scale.indexOf(rawValue.split('.')[0]) + 1) *2;
		}

		function clearParams() {
			window.location.search = '';
		}

		function diff(a,b) {
			var a = a || 1;
			var b = b || 1;
			return Math.abs(parseFloat(a)-parseFloat(b));
		}

		function populateProfile(user) {
			var elems = profileEl.querySelectorAll('li[rel]');
			for (var i = 0; i < elems.length; i++) {
				var factor = elems[i].getAttribute('rel');
				elems[i].querySelector('span').textContent = user[factor];
			};
		}

		function sortCompanies(user) {
			var companyElems = document.querySelectorAll('.company');
			companies.map(function(company, index) {
				company.diff = 0;
				for (var prop in user) {
					company.diff += diff(company[prop], user[prop]);
				}
				companyElems[index].setAttribute('data-sortorder',company.diff);
				var percentMatch = ((40-company.diff)/40*100).toFixed(2) + '%';
				companyElems[index].querySelector('.company-match span').textContent = percentMatch;
			});

			var $companiesList = $('.companies-list');
			$companiesList.empty();
			$(companyElems).sort(function(a, b) {
				return a.dataset.sortorder - +b.dataset.sortorder;
			}).appendTo($companiesList);
			$companiesList.addClass('sorted');

		}

		function showLoader() {
		}

		function hideLoader() {
		}
		
	}
};
Results.init();

}(document));
