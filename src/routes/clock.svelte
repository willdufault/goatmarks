<!-- HTML. -->
<main>
	<div class='has-background-bookmark-container rounded-25 container is-flex is-justify-content-center is-align-items-center p-5'>
		<h1 class='title time-big is-1 pr-2 mb-0'>{hours}:{minutes}</h1>
		<div>
			<div class='time-small'>
				{seconds} {period}
			</div>
			<div class='time-small'>
				{month} {day}
			</div>
		</div>
	</div>
</main>

<!-- CSS. -->
<style>
	.time-big {
		font-size: 5rem;
		font-weight: 700;
	}

	.time-small {
		font-size: 1.5rem;
	}
</style>

<!-- TypeScript. -->
<script lang='ts'>
	// Define variables.
	let hours: number = 0; // How many hours.
	let minutes: string = ''; // How many minutes.
	let seconds: string = ''; // How many seconds.
	let period: string = ''; // The period (am/pm).
	let month: string = ''; // The current month.
	let day: number = 0; // The current day.
	let year: number = 0; // The current year.
	let months: string[] = [ // List of zero-indexed months.
		'Jan', 'Feb', 'Ma', 'Apr', 'May', 'Jun',
		'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
	];

	/*
	Left-pad minutes and seconds with a 0 if they are less than 10.
	*/
	function padMinutes(minutes: number): string {
		return String(minutes).padStart(2, '0');
	}

	/*
	Update the time and date.
	*/
	function updateTimeAndDate(): void {
		// Define variables.
		let now: Date = new Date(); // The time right now.
		let h: number = now.getHours(); // How many hours.
		let m: number = now.getMinutes(); // How many minutes.
		let s: number = now.getSeconds(); // How many seconds.

		// Update the period
		period = h <= 12 ? 'am' : 'pm';

		// If it is past noon, subtract 12 from the hours.
		h %= 12;
		
		// Midnight hour.
		if(h === 0) {
			// We want it to display 12:00 not 0:00.
			h = 12;
		}

		// Update the time.
		hours = h;
		minutes = padMinutes(m);
		seconds = padMinutes(s);

		// Update the date.
		day = now.getDate();
		month = months[now.getMonth()];
		year = now.getFullYear()
	}

	// Update the displayed time.
	updateTimeAndDate();

	// Update the time every second.
	setInterval(updateTimeAndDate, 1000);
</script>