<script>
	import { onMount } from "svelte";
	import { user } from "../stores/auth";

	export let segment;
	// $: console.log(segment);
	$: console.log($user["name"]);
	function handleLogout() {
		user.set({});
	}
	$:console.log($user);

	onMount(() => {
		window.onSignIn = (googleUser) => {
            const profile = googleUser.getBasicProfile();
            // console.log(profile)
            // user.set(profile)
            user.set({
                'name': profile.getName(),
                'email': profile.getEmail(),
                'profile': profile.getImageUrl()
            })
        };
		window.signOut = () => {
			const auth2 = gapi.auth2.getAuthInstance();
			auth2.signOut().then(() => {
				window.location = "/";
				handleLogout();
			});
		};
	});
</script>

<svelte:head>
	<meta
		name="google-signin-client_id"
		content="448076461943-2ukn311n3l386pg26h9i180p2cim1q45.apps.googleusercontent.com"
	/>
	<script src="https://apis.google.com/js/platform.js" async defer></script>
</svelte:head>

<nav>
	<ul>
		<li>
			<a aria-current={segment === "" ? "page" : undefined} href="."
				>home</a
			>
		</li>
		<li>
			<a
				aria-current={segment === "about" ? "page" : undefined}
				href="about">about</a
			>
		</li>

		<!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
		     the blog data when we hover over the link or tap it on a touchscreen -->
		
		<!-- <li>
			<a
				aria-current={segment === "form" ? "page" : undefined}
				href="form">form</a
			>
		</li> -->
		<!-- <li>
			<a
				aria-current={segment === "login" ? "page" : undefined}
				href="login">login</a
			>
		</li> -->

		{#if typeof $user["name"] != "undefined"}
			<li>
				<a
					aria-current={segment === "quiz" ? "page" : undefined}
					href="quiz">quiz</a
				>
			</li>
			<li>
				<a
					aria-current={segment === "logout" ? "page" : undefined}
					on:click|preventDefault={() => {
						window.signOut();
					}}
					href="/">logout</a
				>
			</li>
			<li>
				<span class="someastyle">
					<img
						class="inline rounded-full h-6 w-6"
						src={$user["profile"]}
						alt="ProfilePic"
					/>
					<span>{$user["name"]}</span>
				</span>
			</li>
		{:else}
			<li>
				<span class="someastyle">
					<div
						class="g-signin2"
						data-longtitle="true"
						data-onsuccess="onSignIn"
					/>
				</span>
			</li>
		{/if}
	</ul>
</nav>

<style>
	nav {
		border-bottom: 1px solid rgba(255, 62, 0, 0.1);
		font-weight: 400;
		padding: 0 1em;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: "";
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
		font-weight: 500;
	}

	[aria-current]::after {
		position: absolute;
		content: "";
		width: calc(100% - 1em);
		height: 2px;
		background-color: rgb(255, 62, 0);
		display: block;
		bottom: -1px;
	}

	a, span.someastyle {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
</style>
