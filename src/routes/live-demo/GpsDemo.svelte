<section>
    <p>GPS Demo</p>
    <div id="gps-view"></div>
</section>

<script lang="js">
    import { GpsExtractor } from "../../adapters/GpsExtractor";
    // @ts-ignore
    import * as Plotly from "plotly.js-dist";
    import { onMount, onDestroy } from 'svelte';
    

    const gps = new GpsExtractor();
    const options = {displayModeBar: false, responsive: false};
    let graphIsLive = false;
    
    onMount(async () => {
        gps.registerCallback(async (pos) => {
            
            const mapLayout = {
                dragmode: "zoom",
                mapbox: { style: "open-street-map", center: { lat: pos.payload.latitude, lon: pos.payload.longitude }, zoom: 8 },
                margin: { r: 1, t: 1, b: 1, l: 1 }
            };
            const data = {
                type: "scattermapbox",
                lon: [pos.payload.longitude],
                lat: [pos.payload.latitude],
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

    onDestroy(() => {
        gps.destroy();
    })
</script>
