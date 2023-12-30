<svelte:head>
	<title>WebSensors Live</title>
	<meta name="description" content="A demo of web-sensors" />
</svelte:head>

<div class="text-column">
	<h1>Live Demo</h1>
	<section>
		<video id="video-display"></video>
	</section>

	<GpsDemo></GpsDemo>
</div>

<script lang="ts">
    import { onDestroy } from "svelte";
    import { VideoService } from "../../adapters/VideoExtractor";
	import GpsDemo from "./GpsDemo.svelte"

	const videoService = new VideoService(true)
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
		console.log(media.getVideoTracks()[0].applyConstraints())
	});

	onDestroy(() => {
		videoService.destroy();
	})
</script>
