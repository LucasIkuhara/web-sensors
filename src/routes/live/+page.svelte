<svelte:head>
	<title>WebSensors Live</title>
	<meta name="description" content="A demo of web-sensors" />
</svelte:head>

<div class="text-column">
	<h1>Live Demo</h1>
	<section>
		<p>Current Position is;</p>
		<p>Latitude: {lat}</p>
		<p>Longitude: {long}</p>
	</section>

	<section>
		<video id="video-display"></video>
		</section>


</div>

<script lang="ts">
    import { GpsExtractor } from "../../adapters/GpsExtractor";
    import { VideoService } from "../../adapters/VideoExtractor";

	const gps = new GpsExtractor(true);
	let lat = 0;
	let long = 0;

	gps.registerCallback(async (pos) => {
		lat = pos.coords.latitude;
		long = pos.coords.longitude;
	})

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
	const videoService = new VideoService(false)
	videoService.registerCallback(async (media) => {

		const video = document.getElementsByTagName("video").item(0);
		if (!video)
			throw new Error("where is ma video")
	
		video.setAttribute('playsinline', '');
		video.setAttribute('autoplay', '');
		video.setAttribute('muted', '');
		video.style.width = '900px';
		video.style.height = '900px';
		video.srcObject = media
	});

</script>
