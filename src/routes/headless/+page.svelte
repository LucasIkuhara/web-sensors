<svelte:head>
	<title>WebSensors Tx</title>
	<meta name="description" content="The Transmitter page of web-sensors" />
</svelte:head>

<div class="text-column">
	<h1>Transmit Data</h1>
	<label for="address-bar">Server Address: </label>
	<input name="address-bar" type="text" placeholder="wss://someserver.com:8080" bind:value={serverAddress} >
	<button on:click={changeHandler} class="button">Start</button>
</div>

<script lang="ts">
    import { getTargetServer } from "../../utils/pageUtils";
	let serverAddress = getTargetServer();

	function changeHandler(data: any) {
		console.log(data)
	}
	
	if (serverAddress.trim()) {
		let socket = new WebSocket(serverAddress)
		socket.send("")

	}
</script>

<style>
	.button {
		height: 4vh;
	}
</style>