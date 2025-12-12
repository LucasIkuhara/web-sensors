<script>
	import { page } from '$app/stores';
	import github from '$lib/images/github.svg';
</script>

<header>
	<nav>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="./">Home</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/live-demo') ? 'page' : undefined}>
				<a href="./live-demo">Live Demo</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/headless') ? 'page' : undefined}>
				<a href="./headless">Transmit</a>
			</li>
			<li>
				<a href="https://github.com/LucasIkuhara/web-sensors">
					GitHub
				</a>
			</li>
		</ul>
	</nav>
</header>

<style>
	header {
		justify-content: space-between;
		width: 100dvw;
	}

	
	@media only screen and (max-device-width: 768px) {
		header {
			background: var(--background-accent);
		}

		ul, nav {
			width: 100dvw;
		}
	}

	@media only screen and (min-device-width: 768px) {
		header {
			top: 2rem;
			background: var(--background-accent);
		}
	}

	nav {
		display: flex;
		justify-content: center;
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--bg-accent);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--c1-accent);
	}
</style>
