<script>
	import '../styles.css';
	import Nav from '../components/Nav.svelte';
	import { page } from '$app/stores'

	// export let segment;
	let segment;
	$: segment = $page.path.split('/')[1];
</script>

<style>
	main {
		font-family: 'Playfair Display', serif;
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
		height: 90%;
	}
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>