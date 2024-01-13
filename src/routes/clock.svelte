<!-- HTML. -->
<main>
	<div class='card'>{time}</div>
</main>

<!-- CSS. -->
<style></style>

<!-- TypeScript. -->
<script lang='ts'>
	let time: string = '';

	/*
	Update the time variable to contain a string with the current time and period.
	*/
	function updateTime(): void {
		// Define variables.
		let now: Date = new Date(); // The time right now.
		let hours: number = now.getHours(); // How many hours.
		let minutes: number = now.getMinutes(); // How many minutes.
		let period = hours <= 12 ? 'am' : 'pm' // The period right now (12-hour clock).

		// If it is past noon, subtract 12 from the hours.
		hours %= 12;

		// Update the time.
		time = `${String(hours)}:${String(minutes).padStart(2, '0')} ${period}`;
	}

	// Update the displayed time.
	updateTime();

	// Update the time every second.
	setInterval(updateTime, 1000);
</script>