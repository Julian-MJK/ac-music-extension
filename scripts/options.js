'use strict';

function saveOptions() {
	let volume = document.getElementById('volume').value;
	let enableNotifications = document.getElementById('enable-notifications').checked;
	// 2 separate KK variables to preserve compatibility with old versions
	let alwaysKK = document.getElementById('always-kk').checked;
	let enableKK = alwaysKK || document.getElementById('enable-kk').checked;
	let enableTownTune = document.getElementById('enable-town-tune').checked;
	let zipCode = document.getElementById('zip-code').value;
	let countryCode = document.getElementById('country-code').value;
	let enableBadgeText = document.getElementById('enable-badge').checked;

	let music;
	let weather;
	if (document.getElementById('animal-crossing').checked) music = 'animal-crossing';
	else if (document.getElementById('wild-world').checked) music = 'wild-world';
	else if (document.getElementById('new-leaf').checked) music = 'new-leaf';
	else if (document.getElementById('game-random').checked) music = 'game-random';

	if (document.getElementById('sunny').checked) weather = 'sunny';
	else if (document.getElementById('snowing').checked) weather = 'snowing';
	else if (document.getElementById('raining').checked) weather = 'raining';
	else if (document.getElementById('live').checked) weather = 'live';
	else if (document.getElementById('weather-random').checked) weather = 'weather-random';

	let kkVersion;
	if (document.getElementById('kk-version-live').checked) kkVersion = 'live';
	else if (document.getElementById('kk-version-aircheck').checked) kkVersion = 'aircheck';
	else if (document.getElementById('kk-version-both').checked) kkVersion = 'both';

	document.getElementById('raining').disabled = music == 'animal-crossing';

	let enabledKKVersion = !(document.getElementById('always-kk').checked || document.getElementById('enable-kk').checked);
	document.getElementById('kk-version-live').disabled = enabledKKVersion;
	document.getElementById('kk-version-aircheck').disabled = enabledKKVersion;
	document.getElementById('kk-version-both').disabled = enabledKKVersion;

	chrome.storage.sync.set({
		volume,
		music,
		weather,
		enableNotifications,
		enableKK,
		alwaysKK,
		kkVersion,
		enableTownTune,
		zipCode,
		countryCode,
		enableBadgeText
	});
}

function restoreOptions() {
	chrome.storage.sync.get({
		volume: 0.5,
		music: 'new-leaf',
		weather: 'sunny',
		enableNotifications: true,
		enableKK: true,
		alwaysKK: false,
		kkVersion: 'live',
		enableTownTune: true,
		zipCode: "98052",
		countryCode: "us",
		enableBadgeText: true
	}, items => {
		document.getElementById('volume').value = items.volume;
		document.getElementById(items.music).checked = true;
		document.getElementById(items.weather).checked = true;
		document.getElementById('enable-notifications').checked = items.enableNotifications;
		document.getElementById('no-kk').checked = true;
		document.getElementById('enable-kk').checked = items.enableKK;
		document.getElementById('always-kk').checked = items.alwaysKK;
		document.getElementById('kk-version-' + items.kkVersion).checked = true;
		document.getElementById('enable-town-tune').checked = items.enableTownTune;
		document.getElementById('zip-code').value = items.zipCode;
		document.getElementById('country-code').value = items.countryCode;
		document.getElementById('enable-badge').checked = items.enableBadgeText;

		// Disable raining if the game is animal crossing, since there is no raining music for animal crossing.
		document.getElementById('raining').disabled = items.music == 'animal-crossing';

		let enabledKKVersion = !(document.getElementById('always-kk').checked || document.getElementById('enable-kk').checked);
		document.getElementById('kk-version-live').disabled = enabledKKVersion;
		document.getElementById('kk-version-aircheck').disabled = enabledKKVersion;
		document.getElementById('kk-version-both').disabled = enabledKKVersion;
	});
}

document.addEventListener('DOMContentLoaded', restoreOptions);

const onClickElements = [
	'animal-crossing',
	'wild-world',
	'new-leaf',
	'game-random',
	'sunny',
	'snowing',
	'raining',
	'live',
	'weather-random',
	'no-kk',
	'enable-kk',
	'always-kk',
	'enable-town-tune',
	'enable-notifications',
	'enable-badge',
	'update-location',
	'kk-version-live',
	'kk-version-aircheck',
	'kk-version-both'
];

document.getElementById('volume').oninput = saveOptions;

onClickElements.forEach(el => {
	document.getElementById(el).onclick = saveOptions;
});

// About/Help
document.getElementById('get-help').onclick = function () {
	window.open('https://github.com/PikaDude/ac-music-extension-revived/issues');
};
document.getElementById('report-an-issue').onclick = function () {
	window.open('https://github.com/PikaDude/ac-music-extension-revived/issues');
};
document.getElementById('help-us-out').onclick = function () {
	window.open('https://github.com/PikaDude/ac-music-extension-revived');
};
