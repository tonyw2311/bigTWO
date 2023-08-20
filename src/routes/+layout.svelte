<script>
	import "./styles.css";
</script>

<div class="app">
	<h1 style='margin:0'>big TWO</h1>

	<main>
		<slot />
	</main>

	<footer>
	
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
