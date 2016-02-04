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

}(document));

/*

var params = window.location.search.length ? window.location.search.replace(/(^\?)/,'').split('&').map(function(i) {
		var node = {};
		node[i.split('=')[0]] = i.split('=')[1];
		return node;
	}) : null;

var profileClass = '.profile';
var el = document.querySelector(profileClass);

if (el && params) {
	console.log('got an elem and params');
	var user = params.reduce(function(obj, param) {
		return Object.assign(obj, param);
	});
}

// var bizzos = [
// 	{ name: 'Coles', e: 3, s: 4, g: 5, f: 4 },
// 	{ name: 'Woolies', e: 2, s: 3, g: 1, f: 4 }
// ];
var bizzos = [{"companyid":4493447,"ticker":"CAB","s":7,"e":6,"companyname":"Cabcharge Australia Ltd.","g":5,"exchange":"ASX"},{"companyid":878952,"ticker":"EWC","s":7,"e":5,"companyname":"Energy World Corp. Ltd.","g":6,"exchange":"ASX"},{"companyid":883163,"ticker":"FGX","s":6,"e":5,"companyname":"Future Generation Investment Fund Limited","g":5,"exchange":"ASX"},{"companyid":877447,"ticker":"ARB","s":6,"e":7,"companyname":"ARB Corporation Limited","g":6,"exchange":"ASX"},{"companyid":878590,"ticker":"ASL","s":7,"e":5,"companyname":"Ausdrill Ltd.","g":6,"exchange":"ASX"},{"companyid":4484424,"ticker":"GBG","s":6,"e":6,"companyname":"Gindalbie Metals Ltd.","g":5,"exchange":"ASX"},{"companyid":3.053747E7,"ticker":"FXL","s":6,"e":5,"companyname":"FlexiGroup Limited","g":6,"exchange":"ASX"},{"companyid":2.227564E7,"ticker":"DMP","s":6,"e":5,"companyname":"Domino\u0027s Pizza Enterprises Limited","g":6,"exchange":"ASX"},{"companyid":744808,"ticker":"CPU","s":6,"e":5,"companyname":"Computershare Ltd.","g":5,"exchange":"ASX"},{"companyid":876903,"ticker":"CIM","s":7,"e":5,"companyname":"CIMIC Group Limited","g":6,"exchange":"ASX"},{"companyid":4509289,"ticker":"AGI","s":6,"e":5,"companyname":"Ainsworth Game Technology Ltd.","g":6,"exchange":"ASX"},{"companyid":2.440449E7,"ticker":"CAR","s":6,"e":5,"companyname":"carsales.com Limited","g":5,"exchange":"ASX"},{"companyid":5.4654017E7,"ticker":"GXL","s":6,"e":6,"companyname":"Greencross Limited","g":5,"exchange":"ASX"},{"companyid":875027,"ticker":"ALQ","s":7,"e":6,"companyname":"ALS Limited","g":5,"exchange":"ASX"},{"companyid":3.034921E7,"ticker":"BCI","s":6,"e":6,"companyname":"BC Iron Limited","g":5,"exchange":"ASX"},{"companyid":662734,"ticker":"ALL","s":6,"e":5,"companyname":"Aristocrat Leisure Ltd.","g":6,"exchange":"ASX"},{"companyid":30402,"ticker":"FXJ","s":7,"e":5,"companyname":"Fairfax Media Limited","g":5,"exchange":"ASX"},{"companyid":3.6340743E7,"ticker":"BDR","s":7,"e":6,"companyname":"Beadell Resources Ltd","g":6,"exchange":"ASX"},{"companyid":4484222,"ticker":"FLT","s":6,"e":5,"companyname":"Flight Centre Travel Group Limited","g":6,"exchange":"ASX"},{"companyid":2.3553609E7,"ticker":"AHG","s":6,"e":5,"companyname":"Automotive Holdings Group Limited","g":6,"exchange":"ASX"},{"companyid":884372,"ticker":"AAD","s":6,"e":5,"companyname":"Ardent Leisure Group","g":6,"exchange":"ASX"},{"companyid":2.52338717E8,"ticker":"CVO","s":6,"e":5,"companyname":"Cover-More Group Limited","g":6,"exchange":"ASX"},{"companyid":6.4736883E7,"ticker":"GEM","s":6,"e":5,"companyname":"G8 Education Limited","g":6,"exchange":"ASX"},{"companyid":875415,"ticker":"ABC","s":7,"e":6,"companyname":"Adelaide Brighton Ltd.","g":6,"exchange":"ASX"},{"companyid":419113,"ticker":"COH","s":6,"e":6,"companyname":"Cochlear Ltd.","g":5,"exchange":"ASX"},{"companyid":1.14127724E8,"ticker":"AZJ","s":6,"e":6,"companyname":"Aurizon Holdings Limited","g":6,"exchange":"ASX"},{"companyid":1.04866469E8,"ticker":"DLX","s":6,"e":6,"companyname":"DuluxGroup Limited","g":6,"exchange":"ASX"},{"companyid":1.1365458E7,"ticker":"BKN","s":6,"e":6,"companyname":"Bradken Limited","g":5,"exchange":"ASX"},{"companyid":4493503,"ticker":"BRG","s":6,"e":5,"companyname":"Breville Group Ltd","g":6,"exchange":"ASX"},{"companyid":5440962,"ticker":"BGA","s":6,"e":6,"companyname":"Bega Cheese Limited","g":6,"exchange":"ASX"},{"companyid":881891,"ticker":"AOG","s":5,"e":5,"companyname":"Aveo Group","g":5,"exchange":"ASX"},{"companyid":2.0333236E7,"ticker":"AGO","s":6,"e":6,"companyname":"Atlas Iron Limited","g":5,"exchange":"ASX"},{"companyid":1719233,"ticker":"ASX","s":6,"e":5,"companyname":"ASX Limited","g":6,"exchange":"ASX"},{"companyid":874859,"ticker":"BOQ","s":5,"e":5,"companyname":"Bank of Queensland Ltd.","g":6,"exchange":"ASX"},{"companyid":1061739,"ticker":"BBG","s":6,"e":5,"companyname":"Billabong International Limited","g":6,"exchange":"ASX"},{"companyid":9560800,"ticker":"CDD","s":7,"e":5,"companyname":"Cardno Limited","g":6,"exchange":"ASX"},{"companyid":7657684,"ticker":"ABP","s":5,"e":5,"companyname":"Abacus Property Group","g":5,"exchange":"ASX"},{"companyid":2.64985733E8,"ticker":"AHY","s":7,"e":7,"companyname":"Asaleo Care Limited","g":6,"exchange":"ASX"},{"companyid":392930,"ticker":"BLD","s":7,"e":6,"companyname":"Boral Ltd.","g":6,"exchange":"ASX"},{"companyid":2.4915054E7,"ticker":"AST","s":7,"e":5,"companyname":"AusNet Services","g":6,"exchange":"ASX"},{"companyid":1.0525123E7,"ticker":"DUE","s":7,"e":5,"companyname":"DUET Group","g":6,"exchange":"ASX"},{"companyid":2.06082E7,"ticker":"CWN","s":6,"e":5,"companyname":"Crown Resorts Limited","g":6,"exchange":"ASX"},{"companyid":4492919,"ticker":"DLS","s":6,"e":5,"companyname":"Drillsearch Energy, Ltd.","g":6,"exchange":"ASX"},{"companyid":4493422,"ticker":"BWP","s":5,"e":5,"companyname":"BWP Trust","g":5,"exchange":"ASX"},{"companyid":2.62493228E8,"ticker":"GMA","s":5,"e":5,"companyname":"Genworth Mortgage Insurance Australia Limited","g":6,"exchange":"ASX"},{"companyid":410066,"ticker":"CSR","s":7,"e":6,"companyname":"CSR Limited","g":6,"exchange":"ASX"},{"companyid":876923,"ticker":"GMG","s":5,"e":5,"companyname":"Goodman Group","g":5,"exchange":"ASX"},{"companyid":877276,"ticker":"APN","s":7,"e":5,"companyname":"APN News \u0026 Media Ltd.","g":5,"exchange":"ASX"},{"companyid":4.4006176E7,"ticker":"BRU","s":6,"e":5,"companyname":"Buru Energy Limited","g":6,"exchange":"ASX"},{"companyid":1.33308271E8,"ticker":"SGR","s":6,"e":5,"companyname":"Echo Entertainment Group Limited","g":6,"exchange":"ASX"},{"companyid":881503,"ticker":"CSL","s":6,"e":6,"companyname":"CSL Ltd.","g":5,"exchange":"ASX"},{"companyid":3799924,"ticker":"APA","s":7,"e":5,"companyname":"APA Group","g":6,"exchange":"ASX"},{"companyid":4493468,"ticker":"AWE","s":6,"e":5,"companyname":"AWE Limited","g":6,"exchange":"ASX"},{"companyid":4569972,"ticker":"GNC","s":6,"e":6,"companyname":"GrainCorp. Ltd.","g":6,"exchange":"ASX"},{"companyid":6125891,"ticker":"BSL","s":6,"e":6,"companyname":"BlueScope Steel Limited","g":5,"exchange":"ASX"},{"companyid":874657,"ticker":"BPT","s":6,"e":5,"companyname":"Beach Energy Limited","g":6,"exchange":"ASX"},{"companyid":878891,"ticker":"BEN","s":5,"e":5,"companyname":"Bendigo and Adelaide Bank Limited.","g":6,"exchange":"ASX"},{"companyid":4038788,"ticker":"ARI","s":6,"e":6,"companyname":"Arrium Limited","g":5,"exchange":"ASX"},{"companyid":1.1234995E7,"ticker":"CMW","s":5,"e":5,"companyname":"Cromwell Property Group","g":5,"exchange":"ASX"},{"companyid":167945,"ticker":"ANN","s":6,"e":6,"companyname":"Ansell Ltd.","g":5,"exchange":"ASX"},{"companyid":2.2277516E7,"ticker":"EHL","s":7,"e":6,"companyname":"Emeco Holdings Limited","g":5,"exchange":"ASX"},{"companyid":877088,"ticker":"CTX","s":7,"e":6,"companyname":"Caltex Australia Ltd.","g":6,"exchange":"ASX"},{"companyid":3.3984952E7,"ticker":"AIO","s":6,"e":6,"companyname":"Asciano Limited","g":6,"exchange":"ASX"},{"companyid":4484407,"ticker":"FMG","s":6,"e":6,"companyname":"Fortescue Metals Group Ltd.","g":5,"exchange":"ASX"},{"companyid":882775,"ticker":"AMP","s":6,"e":5,"companyname":"AMP Limited","g":6,"exchange":"ASX"},{"companyid":884383,"ticker":"CQR","s":5,"e":5,"companyname":"Charter Hall Retail REIT","g":5,"exchange":"ASX"},{"companyid":874903,"ticker":"ERA","s":6,"e":5,"companyname":"Energy Resources of Australia Ltd.","g":6,"exchange":"ASX"},{"companyid":2964740,"ticker":"BRS","s":7,"e":6,"companyname":"Broadspectrum Limited","g":5,"exchange":"ASX"},{"companyid":2.2320693E7,"ticker":"CHC","s":5,"e":5,"companyname":"Charter Hall Group","g":5,"exchange":"ASX"},{"companyid":4509051,"ticker":"CGF","s":6,"e":5,"companyname":"Challenger Limited","g":6,"exchange":"ASX"},{"companyid":7713668,"ticker":"EVN","s":7,"e":6,"companyname":"Evolution Mining Limited","g":6,"exchange":"ASX"},{"companyid":401715,"ticker":"AMC","s":7,"e":6,"companyname":"Amcor Ltd.","g":6,"exchange":"ASX"},{"companyid":191781,"ticker":"AWC","s":6,"e":6,"companyname":"Alumina Ltd.","g":6,"exchange":"ASX"},{"companyid":692765,"ticker":"CCL","s":6,"e":6,"companyname":"Coca-Cola Amatil Limited","g":6,"exchange":"ASX"},{"companyid":256654,"ticker":"BHP","s":6,"e":6,"companyname":"BHP Billiton Ltd.","g":6,"exchange":"ASX"},{"companyid":874736,"ticker":"AGL","s":7,"e":5,"companyname":"AGL Energy Limited","g":6,"exchange":"ASX"},{"companyid":384998,"ticker":"ANZ","s":5,"e":5,"companyname":"Australia \u0026 New Zealand Banking Group Limited","g":6,"exchange":"ASX"},{"companyid":3.4536531E7,"ticker":"BXB","s":7,"e":6,"companyname":"Brambles Ltd.","g":5,"exchange":"ASX"},{"companyid":877819,"ticker":"GPT","s":5,"e":5,"companyname":"GPT Group","g":5,"exchange":"ASX"},{"companyid":879131,"ticker":"DOW","s":7,"e":6,"companyname":"Downer EDI Limited","g":5,"exchange":"ASX"},{"companyid":874262,"ticker":"CBA","s":5,"e":5,"companyname":"Commonwealth Bank of Australia","g":6,"exchange":"ASX"},{"companyid":1.2244417E7,"ticker":"DXS","s":5,"e":5,"companyname":"Dexus Property Group","g":5,"exchange":"ASX"},{"companyid":2.272784E7,"s":6,"e":5,"companyname":"Australia Pacific Airports (Melbourne) Pty Limited","g":5},{"companyid":6520943,"s":6,"e":6,"companyname":"CuDeco Ltd.","g":6},{"companyid":882780,"s":7,"e":5,"companyname":"Australian Gas Networks Limited","g":6},{"companyid":1.0636194E7,"s":6,"e":6,"companyname":"Discovery Metals Ltd.","g":6},{"companyid":4493390,"s":5,"e":5,"companyname":"Commonwealth Property Office Fund","g":5}]

console.log('user is: ', JSON.stringify(user));

function diff(a,b) {
	return Math.abs(a-b);
}

bizzos.forEach(function(bizzo) {
});
/*
for each bizzo
	compare e, s & g with user's e, s & g
	total the differences and store against the bizzo
	sort bizzos by the difference value and display top 20

*/