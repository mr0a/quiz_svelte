<style style lang="postcss">
	h1, figure, p {
		@apply text-center my-0 mx-auto;
	}

	h1 {
		@apply text-3xl uppercase font-bold m-0 mb-4 font-sans;
	}
	
	figure {
		@apply m-0 mb-4;
	}
	
	img {
		@apply w-full max-w-5xl m-0 mb-4;
	}
	
	p {
		@apply my-0 mx-auto;
	}

</style>

<svelte:head>
	<title>Home</title>
</svelte:head>

<h1>Great success!</h1>

<figure>
	<img alt='Success Kid' src='/successkid.jpg'>
</figure>

<p><strong>Lets Start</strong></p>

<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
	Button
</button>

<script>
	import { amp, browser, dev, prerendering } from '$app/env';
// import { onMount } from 'svelte';
// 	onMount(() => {
// 		alert(browser);
// 		alert(dev)
// 	})
</script>
