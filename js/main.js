(function() {

var bizzos = [
	{ name: 'Coles', e: 3, s: 4, g: 5, f: 4 }
];

var params = window.location.search.length ? window.location.search.replace(/(^\?)/,'').split('&').map(function(i) {
		var node = {};
		node[i.split('=')[0]] = i.split('=')[1];
		return node;
	}) : null;

var profileClass = '.profile';
var el = document.querySelector(profileClass);

if (el && params) {
	console.log(JSON.stringify(params));
}

function diff(a,b) {
	return Math.abs(a-b);
}

}());




