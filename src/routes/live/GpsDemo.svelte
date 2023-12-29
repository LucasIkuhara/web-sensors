<svelte:head>
	<title>WebSensors Live</title>
	<meta name="description" content="A demo of web-sensors" />
</svelte:head>

<section class="widget-container">
    <p>GPS Demo</p>
    <div id="gps-view"></div>
</section>

<script lang="js">
    import { GpsExtractor } from "../../adapters/GpsExtractor";
    import * as Plotly from "plotly.js-dist";
    import { onMount } from 'svelte';
    
    const gps = new GpsExtractor(true);
    const options = {displayModeBar: false, responsive: false};
    let graphIsLive = false;
    
    onMount(async () => {
        gps.registerCallback(async (pos) => {
            
            const mapLayout = {
                dragmode: "zoom",
                mapbox: { style: "open-street-map", center: { lat: pos.coords.latitude, lon: pos.coords.longitude }, zoom: 8 },
                margin: { r: 1, t: 1, b: 1, l: 1 }
            };
            const data = {
                type: "scattermapbox",
                lon: [pos.coords.longitude],
                lat: [pos.coords.latitude],
                marker: { color: "red", size: 20 }
            }

            if (!graphIsLive) {
                Plotly.newPlot("gps-view", [data], mapLayout, options);
                graphIsLive = true;
            }

            else {
                Plotly.react("gps-view", [data], mapLayout, options)
            }
        })

	});
</script>

<style>
    .widget-container {
        background-color: gainsboro;
        padding: 20px;
        border-radius: 10px;
    }
</style>
