<svelte:head>
	<title>WebSensors Live</title>
	<meta name="description" content="A demo of web-sensors" />
</svelte:head>
<script lang="ts">
	const a: number = 3

	/**
	 * Gets the target URL to send data to from the page's query params, if there is one.
	 * In case there isn't, an empty string is returned.
	 * The URL is expected to be an encoded URIComponent.
	 * 
	 * For instructions, see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
	 */
	function getTarget(): string {
		const params = new URLSearchParams(window.location.search);
		const url = params.get("target") ?? "";
		return decodeURIComponent(url)
	}
	let long = 0;
	let lat = 0;

	import { GpsExtractor } from '../../adapters/GpsService';
	const gps = new GpsExtractor(true);
	setInterval(async () => {
		const data = gps.getData();
		lat = data.coords.latitude;
		long = data.coords.longitude;
	}, 2500);

</script>
<div class="text-column">
	<h1>Live Demo</h1>
	<p>Current Position is;</p>
	<p>Latitude: {long}</p>
	<p>Longitude: {lat}</p>

</div>
