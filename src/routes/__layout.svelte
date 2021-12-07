<header>
	<nav>
		<a href="/">Home</a>
		<a href="/styling">Styling</a>
		<a href="/api">API</a>
	</nav>
</header>

<main>
	<slot />
</main>

<style lang="scss">
	header,
	main {
		width: 100vw;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
	header nav {
		margin: 1rem 0;
		a {
			margin: 0 1rem;
			font-size: 2rem;
		}
	}
	:global(.omnia-editor) {
		max-width: 700px;
	}
</style>
