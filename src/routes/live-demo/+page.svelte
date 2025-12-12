<svelte:head>
	<title>WebSensors Live</title>
	<meta name="description" content="A demo of web-sensors" />
</svelte:head>

<div class="text-column">
	<h1>Live Demo</h1>
	<section id='widget-grid'>
		<div class="widget-container"> Orientation: {orientation} </div>
		<div class="widget-container"> Acceleration: {acceleration} </div>

		<div class="widget-container">
			 <CameraDemo></CameraDemo>
		</div>
		<div class="widget-container">
			 <GpsDemo></GpsDemo> 
		</div>

	</section>

</div>

<script lang="js">
	import GpsDemo from "./GpsDemo.svelte"
	import CameraDemo from "./CameraDemo.svelte"
    import { OrientationExtractor } from "../../adapters/extractors/OrientationExtractor";
    import { AccelerationExtractor } from "../../adapters/extractors/AccelerationExtractor";

	let orientation = "Sensor data unavailable."
	let acceleration = "Sensor data unavailable."

	const or = new OrientationExtractor();
	const ac = new AccelerationExtractor();

	function toPrecision(data) {
		for (let key in data) {
			data[key] = data[key].toPrecision(2);
		}
	}

	or.registerCallback(async rawData => {
		const data = rawData.payload;
		toPrecision(data)
		orientation = `X: ${data.x}\n Y: ${data.y}\n Z: ${data.z}\n W: ${data.w}`}
	);

	ac.registerCallback(async rawData => {
		const data = rawData.payload;
		toPrecision(data)
		acceleration = `X: ${data.x}\n Y: ${data.y}\n Z: ${data.z}`}
	);
</script>
<style>
	@media only screen and (max-device-width: 768px) {
		#widget-grid {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	}

	@media only screen and (min-device-width: 768px) {
		#widget-grid {
			display: grid;
			grid-template: "A A"
							"B B";
			justify-content: center;
			align-items: center;
		}
	}

    .widget-container {
		background-color: var(--bg-accent);
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
