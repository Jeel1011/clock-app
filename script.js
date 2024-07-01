// Get the current time
const currentTime = new Date().getHours();

// Function to set background image based on screen size
function setBackgroundImage() {
	const screenWidth = window.innerWidth;

	if (screenWidth <= 580) {
		// For smaller screens (max-width: 580px)
		document.body.style.backgroundImage = currentTime >= 6 && currentTime < 18
			? "url('./assets/mobile/bg-image-daytime.jpg')"
			: "url('./assets/mobile/bg-image-nighttime.jpg')";
	} else if (screenWidth <= 950) {
		// For screens between 581px and 950px (max-width: 950px)
		document.body.style.backgroundImage = currentTime >= 6 && currentTime < 18
			? "url('./assets/tablet/bg-image-daytime.jpg')"
			: "url('./assets/tablet/bg-image-nighttime.jpg')";
	} else {
		// For screens larger than 950px
		document.body.style.backgroundImage = currentTime >= 6 && currentTime < 18
			? "url('./assets/desktop/bg-image-daytime.jpg')"
			: "url('./assets/desktop/bg-image-nighttime.jpg')";
	}
}

// Call the function to set background image initially
setBackgroundImage();

// Update background image when the window is resized
window.addEventListener('resize', setBackgroundImage);


// Function to set background color and text color for footer
function setFooterStyles(isDaytime) {
	const footer = document.querySelector('.container-footer');
	if (isDaytime) {
		// Daytime styles
		footer.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
		footer.style.color = 'black';
	} else {
		// Nighttime styles
		footer.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
		footer.style.color = 'white';
	}
}

// Check if it is daytime or nighttime
if (currentTime >= 6 && currentTime < 18) {
		// Daytime
		document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.263)';
		document.querySelector('.icon').style.backgroundImage = "url('./assets/desktop/icon-sun.svg')";
		document.querySelector('.good-grattings').textContent = "Good morning";

		 // Set footer styles for daytime
		 setFooterStyles(true);
} else {
		// Nighttime
		document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.263)';
		document.querySelector('.icon').style.backgroundImage = "url('./assets/desktop/icon-moon.svg')";
		document.querySelector('.good-grattings').textContent = "Good evening";

		 // Set footer styles for daytime
		 setFooterStyles(false);
}


// quote code
function fetchAndDisplayQuote() {
		fetch('https://api.quotable.io/random')
			.then(response => response.json())
			.then(data => {
				const quoteContainer = document.getElementById('quoteContainer');
				quoteContainer.innerHTML = `<blockquote>"${data.content}"</blockquote><p> ${data.author}</p>`;
				document.getElementById('quoteBtn'); // Change button text to 'Refresh'
			})
			.catch(error => {
				console.error('Error fetching quote:', error);
				const quoteContainer = document.getElementById('quoteContainer');
				quoteContainer.innerHTML = 'Failed to fetch a quote. Please try again later.';
			});
	}

	// Fetch and display a random quote when the page loads
	window.addEventListener('load', fetchAndDisplayQuote);

	// Event listener for the "Refresh" button
	document.getElementById('quoteBtn').addEventListener('click', fetchAndDisplayQuote);


// Function to fetch time, location, and additional details from an API providing Singapore time
function fetchTimeAndLocation() {
		fetch('https://worldtimeapi.org/api/timezone/Asia/Singapore')
				.then(response => response.json())
				.then(data => {
						const currentTimeDisplay = document.querySelector('.container__currentTime-display');
						const locationSpan = document.querySelector('.container__currentTime-location span');
						const timezoneSpan = document.querySelector('.container__currentTime-number-section span');
	
						// Update current time display
						const singaporeTime = new Date(data.utc_datetime); // Using UTC datetime for consistency
						const hours = singaporeTime.getHours();
						const minutes = singaporeTime.getMinutes();
						const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
						currentTimeDisplay.textContent = formattedTime;
	
						// Update location display
						locationSpan.textContent = 'India';
	
						timezoneSpan.textContent = 'IST'; // Assuming IST represents India Standard Time
	
						// Update footer details
						const timezoneDisplay = document.querySelector('.timezone-display');
						const dayOfYearDisplay = document.querySelector('.dayOfYear-display');
						const dayOfWeekDisplay = document.querySelector('.dayOfWeek-display');
						const weekNumDisplay = document.querySelector('.weekNum-display');
	
						// Update timezone display
						timezoneDisplay.textContent = 'India';
	
						// Convert ISO date string to Date object
						const date = new Date(data.utc_datetime);
	
						// Set day of the year
						const dayOfYear = Math.ceil((date - new Date(date.getFullYear(), 0, 1)) / (1000 * 60 * 60 * 24));
						dayOfYearDisplay.textContent = dayOfYear;
	
					 // Set day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
						const dayOfWeek = date.getDay();
						const daysOfWeek = ['0','1', '2', '3', '4', '5', '6'];
						dayOfWeekDisplay.textContent = daysOfWeek[dayOfWeek];

						// Set week number
						const weekNum = Math.ceil(dayOfYear / 7);
						weekNumDisplay.textContent = weekNum;
				})
				.catch(error => {
						console.error('Error fetching time and location:', error);
						// Handle error if necessary
				});
	}
	
	// Call the function to fetch time, location, and additional details when the page loads
	window.addEventListener('load', fetchTimeAndLocation);
	
	// Update time and additional details periodically (every minute)
	setInterval(fetchTimeAndLocation, 60000); // 60000 milliseconds = 1 minute

	
// JavaScript for toggling the footer visibility and changing button text and icon
const footerSection = document.querySelector('.container-footer');
const currentTimeSection = document.querySelector('.container');
const sliderBtn = document.querySelector('.container__sliderBtn');
const sliderText = document.querySelector('.sliderText');
const arrowIcon = document.querySelector('.arrow-icon img');

sliderBtn.addEventListener('click', () => {
	// Toggle footer and current time section visibility
	footerSection.classList.toggle('show');
	currentTimeSection.classList.toggle('show');

	// Toggle button text between "more" and "less"
	if (sliderText.textContent === 'more') {
		sliderText.textContent = 'less';
		// Change button icon to up arrow
		arrowIcon.src = './assets/desktop/icon-arrow-up.svg';
	} else {
		sliderText.textContent = 'more';
		// Change button icon to down arrow
		arrowIcon.src = './assets/desktop/icon-arrow-down.svg';
	}
});