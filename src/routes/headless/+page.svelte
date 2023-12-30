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
    import { WSTransmitter } from "../../adapters/WSTransmitter";
    import { getTargetServer } from "../../utils/pageUtils";


	let serverAddress = getTargetServer();
	let wsTx: WSTransmitter | null = null;

	/**
	 * Updates the target server address.
	 */
	function changeHandler() {
		console.log(`Server address updated to: ${serverAddress}`);

		if (wsTx) 
			wsTx.changeTargetAddress(serverAddress);

		else
			wsTx = new WSTransmitter(serverAddress);

		setTimeout(()=> {
			wsTx.sendData({
				type: "gps",
				payload: {
					latitude: 1,
					longitude: 1
				}
			})
		}, 5000)
	}

	// If the page was called with a target parameter, start immediately.
	if (serverAddress.trim()) {
		wsTx = new WSTransmitter(serverAddress);
		wsTx.sendData({
			type: "gps",
			payload: {
				latitude: 1,
				longitude: 1
			}
		})
	}
</script>

<style>
	.button {
		height: 4vh;
	}
</style>