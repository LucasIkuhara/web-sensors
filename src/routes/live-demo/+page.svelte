<section id="demo-page">

	<h1>Live Demo</h1>
	<ul id='widget-grid'>
		<li class="widget-container"> Orientation: {orientation} </li>
		<li class="widget-container"> Acceleration: {acceleration} </li>

		<li class="widget-container">
			 <CameraDemo></CameraDemo>
		</li>
		<li class="widget-container">
			 <GpsDemo></GpsDemo> 
		</li>

	</ul>
</section>

<script lang="js">
	import GpsDemo from "./GpsDemo.svelte"
	import CameraDemo from "./CameraDemo.svelte"
    import { OrientationExtractor } from "../../adapters/extractors/OrientationExtractor";
    import { AccelerationExtractor } from "../../adapters/extractors/AccelerationExtractor";

	let orientation = "Sensor data unavailable."
	let acceleration = "Sensor data unavailable."

	const or = new OrientationExtractor();
	const ac = new AccelerationExtractor();

	// @ts-ignore
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
	#demo-page {
	}
	#widget-grid {
		width: 100%;
		list-style: none;
		padding: 0;
	}

	@media only screen and (max-device-width: 768px) {
		#widget-grid {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		.widget-container {
			margin-top: 1rem;
			width: calc(100% - 2rem);
			box-sizing: border-box;
		}
	}

	/* Desktop */
	@media only screen and (min-device-width: 768px) {
		#widget-grid {
			display: grid;
			grid-template: "A A"
							"B B";
			grid-gap: 1rem;
			padding: 2rem;
			box-sizing: border-box;
		}
		.widget-container {
			margin: 0;
		}
	}

    .widget-container {
		background-color: var(--bg-accent);
        padding: 20px;
        border-radius: 10px;
    }
</style>
