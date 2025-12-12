<svelte:head>
	<title>WebSensors Tx</title>
	<meta name="description" content="The Transmitter page of web-sensors" />
</svelte:head>

<div class="text-column">
	<h1>Transmit Data</h1>

	<section >
		<h2> Options </h2>
		<ul id="data-election">
			<li>
				<label for="accelerometer"> Accelerometer: </label>
				<input type="checkbox" name="accelerometer"/>
			</li>
			<li>
				<label for="gps"> GPS: </label>
				<input type="checkbox" name="gps"/>
			</li>
			<li>
				<label for="orientation"> Orientation: </label>
				<input type="checkbox" name="orientation"/>
			</li>
		</ul>
	</section>

	<label for="address-bar">Server Address: </label>
	<input name="address-bar" type="text" placeholder="wss://someserver.com:8080" bind:value={serverAddress} >
	<button on:click={changeHandler} class="button">Start</button>
</div>

<script lang="ts">
    import { WSTransmitter } from "../../adapters/transmitters/WSTransmitter";
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
	#data-election {
		display: flex;
		flex-direction: column;
	}

	h2 {
		font-weight: 600;
	}
	.button {
		height: 4vh;
	}
</style>