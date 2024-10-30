'use strict';

/*------------------------------------------------>
	Utility Functions
<------------------------------------------------*/
function select(selector, scope = document) {
	return scope.querySelector(selector);
}

function listen(event, element, callback) {
	return element.addEventListener(event, callback);
}

/*------------------------------------------------>
	Declarations
<------------------------------------------------*/

const shakenDisplay = select('section');
const timeDisplay = select('h1');
const alarmSet = select('span');
const alarmHourInput = select('.hours');
const alarmMinuteInput = select('.minutes');
const setTimeBtn = select('button');

let alarmHour = null;
let alarmMinute = null;
const alarmSound = new Audio('./src/media/alarm-clock-short-6402.mp3');
alarmSound.type = 'audio/mp3';


/*------------------------------------------------>
Validation 
<------------------------------------------------*/

function validateAlarm() {
	const alarmHourValue = parseInt(alarmHourInput.value);
	const alarmMinuteValue = parseInt(alarmMinuteInput.value);

	if (
		!isNaN(alarmHourValue) && alarmHourValue >= 0 && alarmHourValue <= 23 &&
		!isNaN(alarmMinuteValue) && alarmMinuteValue >= 0 && alarmMinuteValue <= 59
	) {
		alarmHour = alarmHourValue;
		alarmMinute = alarmMinuteValue;
		alarmSet.textContent = `${
			alarmHour.toString().padStart(2, '0')}
			:${alarmMinute.toString().padStart(2, '0')}`;
	} else {
		alarmHourInput.focus();
	}
	alarmHourInput.value = '';
	alarmMinuteInput.value = '';
}

/*------------------------------------------------>
Display Animation
<------------------------------------------------*/

function shakeDisplay() {
			shakenDisplay.classList.add('shake');
			setTimeout(() => {
				shakenDisplay.classList.remove('shake');
			}, 8000)
}

/*------------------------------------------------>
Time Display and Alarm Condition
<------------------------------------------------*/

function displayTime() {
	const now = new Date();
	const currentHour = now.getHours();
	const currentMinute = now.getMinutes();

	const timeString = `${currentHour.toString().padStart(2, '0')
	}:${currentMinute.toString().padStart(2, '0')}`;
	timeDisplay.textContent = timeString;

	if (currentHour === alarmHour && currentMinute === alarmMinute) {
		alarmSound.play();
		shakeDisplay();
		alarmHour = null;  
		alarmMinute = null;
		alarmSet.textContent = "";
	}
}

/*------------------------------------------------>
Internal and Button Listerner
<------------------------------------------------*/

setInterval(displayTime, 1000);

listen('click', setTimeBtn, validateAlarm);
