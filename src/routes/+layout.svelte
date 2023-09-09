<script>
	import "./styles.css";
</script>

<div class="app">
	<a style='margin:0;color:white;text-decoration:none' href='/'>big TWO</a>

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


	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
