<svelte:head>
	<title>WebSensors Live</title>
	<meta name="description" content="A demo of web-sensors" />
</svelte:head>

<div class="text-column">
	<h1>Live Demo</h1>
	<section id='widget-grid'>
		<div class="widget-container"> Acc </div>
		<div class="widget-container">
			 <CameraDemo></CameraDemo>
		</div>
		<div class="widget-container">
			 <GpsDemo></GpsDemo> 
		</div>

	</section>

</div>

<script lang="ts">
	import GpsDemo from "./GpsDemo.svelte"
	import CameraDemo from "./CameraDemo.svelte"
</script>
<style>
	#widget-grid {
		display: grid;
		justify-content: center;
		align-items: center;
	}
    .widget-container {
		background-color: gainsboro;
        padding: 20px;
        border-radius: 10px;
		margin: 10px;
		width: 50dvw;
    }

	@media (max-aspect-ratio: 1/1) {
		.widget-container {
			width: 80dvw;
		}
	}
	</style>
