<script>
	import { page } from '$app/stores';
	import github from '$lib/images/github.svg';
</script>

<header>
	<div class="corner"></div>
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
		</ul>
	</nav>

	<div class="corner">
		<a href="https://github.com/LucasIkuhara/web-sensors">
			<img src={github} alt="GitHub" />
		</a>
	</div>
</header>

<style>

	header {
		display: flex;
		justify-content: space-between;
		background: var(--background-accent);
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
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
