<script>
    import { onMount } from 'svelte'

    onMount(() => {
        window.onSignIn = (googleUser) => {
            const profile = googleUser.getBasicProfile();
            console.log('ID: ' + profile.getId());
            console.log('Name: ' + profile.getName());
            console.log('Image URL: ' + profile.getImageUrl());
            console.log('Email: ' + profile.getEmail());
        };
    })
</script>

<svelte:head>
    <!-- <meta
        name="google-signin-client_id"
        content="994186259491-i0985lqqvkqb3dmdfaoqtvrm55ono52q.apps.googleusercontent.com"
    /> -->
    <meta
        name="google-signin-client_id"
        content="448076461943-39c9d7u8va00lt7tr9uq48abd259bt61.apps.googleusercontent.com"
    />
    <script src="https://apis.google.com/js/platform.js" async defer></script>
</svelte:head>

<div>
    <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div> -->
    <div class="g-signin2" data-longtitle="true" data-onsuccess=onSignIn />
</div>
