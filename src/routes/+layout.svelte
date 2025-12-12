<script>
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="app">
	<Header />
	<title>WebSensors Live</title>
	<meta name="description" content="A demo of web-sensors" />
	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100dvh;
	}

	main {
		width: 100%;
		flex: 1;
		display: flex;
		align-items: center;
		flex-direction: column;
		box-sizing: border-box;
	}

</style>
