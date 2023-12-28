<svelte:head>
	<title>WebSensors Live</title>
	<meta name="description" content="A demo of web-sensors" />
</svelte:head>
<script lang="ts">

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

	console.log(getTarget())
	import { GpsExtractor } from '../../adapters/GpsService';
	const gps = new GpsExtractor(true);
	// gps.registerCallback(async data => {console.log(data)})
</script>
<div class="text-column">
	<h1>Live</h1>
</div>
