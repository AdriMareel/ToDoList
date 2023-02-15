const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"];
let date = new Date();
console.log(date.getMonth());

//fill the datepicker with the current day
function updateDatePicker(date){
	//day - 1
	let dateMinusOne = new Date(date);
	dateMinusOne.setDate(date.getDate() - 1);
	document.getElementsByClassName("day-shorten")[0].innerHTML = weekday[dateMinusOne.getDay()];
	document.getElementsByClassName("number")[0].innerHTML = dateMinusOne.getDate();
	document.getElementsByClassName("month-shorten")[0].innerHTML = months[dateMinusOne.getMonth()] + ".";

	//day
	document.getElementsByClassName("day-shorten")[1].innerHTML = weekday[date.getDay()];
	document.getElementsByClassName("number")[1].innerHTML = date.getDate();
	document.getElementsByClassName("month-shorten")[1].innerHTML = months[date.getMonth()] + ".";

	//day + 1
	let datePlusOne = new Date(date);
	datePlusOne.setDate(date.getDate() + 1);
	document.getElementsByClassName("day-shorten")[2].innerHTML = weekday[datePlusOne.getDay()];
	document.getElementsByClassName("number")[2].innerHTML = datePlusOne.getDate();
	document.getElementsByClassName("month-shorten")[2].innerHTML = months[datePlusOne.getMonth()] + ".";
}
updateDatePicker(date);

//change the datepicker when the user clicks on the arrows
document.getElementsByClassName('left-arrow')[0].addEventListener('click', function(){
	date.setDate(date.getDate() - 1);
	updateDatePicker(date);
});

document.getElementsByClassName('right-arrow')[0].addEventListener('click', function(){
	date.setDate(date.getDate() + 1);
	updateDatePicker(date);
});