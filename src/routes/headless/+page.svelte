<svelte:head>
	<title>WebSensors Tx</title>
	<meta name="description" content="The Transmitter page of web-sensors" />
</svelte:head>

<div class="text-column">
	<h1>Transmit Data</h1>
	<label for="address-bar">Server Address: </label>
	<input name="address-bar" type="text" placeholder="wss://someserver.com:8080" bind:value={serverAddress} >
</div>

<script lang="ts">
    import { getTargetServer } from "../../utils/pageUtils";

	let serverAddress = getTargetServer();
</script>
