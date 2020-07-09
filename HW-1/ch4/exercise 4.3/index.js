const BIRTHDAY = '1992-07-17';
const age = getAge(BIRTHDAY);

function getAge (birth) {	
	let currDate = new Date(),
	    currYear = currDate.getFullYear(),
	    currMonth = currDate.getMonth(),
	    currDayNumber = currDate.getDate();

	let birthDate = new Date(birth),
	    birthYear = birthDate.getFullYear(),
	    birthMonth = birthDate.getMonth(),
  	    birthDayNumber = birthDate.getDate();
		
	let age = currYear - birthYear;
	let corr = (currMonth > birthMonth) ? 1 : (currDayNumber > birthDayNumber) ? 1 : 0;

	return age - corr;
}

console.log(age);