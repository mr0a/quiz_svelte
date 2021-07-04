<svelte:head>
    <title>Quiz Form</title>
</svelte:head>

<script>
    import { onMount, onDestroy } from "svelte";
    import { connectToWebsocket, closeWebSocket } from './ws_con'

    export let error, status;
    console.log('error', error)
    console.log('status', status)
    let socket, message, question='', quiz_type='radio', options=[], invalidQuestion, formErrors = [], questionSubmitted=false;
    // $:console.log(options)
    let url = 'djangowebdev.herokuapp.com'

    onMount(() => {
        socket = connectToWebsocket()
        socket.onmessage = event => {
            message = JSON.parse(event.data)
            console.log(message);
        }
    });

    onDestroy(() => {
        if (socket) {
            closeWebSocket(socket);
            console.log("It's Closed")
        }
    })

    const handleSubmit = (event) => {
        question = question.trim()
        invalidQuestion = false
        formErrors = []
        questionSubmitted = false

        let questionData = {
            'question': question,
            'quiz_type': quiz_type,
            'options': options
        }
        let data = {'type': 'question', 'data': questionData};
        console.log(data);
        if (question.length < 3){
            invalidQuestion = true
            formErrors.push("Enter a valid question!")
            console.log(formErrors)
        }
        if (question.length > 0 && options.length > 0){
            socket.send(JSON.stringify(data));
            questionSubmitted = true
            console.log("Submitted")
        }
    };

    function handleNextQuestion() {
        question='', quiz_type='radio', options=[], invalidQuestion=undefined, formErrors = [], questionSubmitted=false
    }

</script>

<div>
    <form on:submit|preventDefault={handleSubmit} on:reset|preventDefault={handleNextQuestion}>
        <label>Question: <input name="question" bind:value={question} class:field-danger={invalidQuestion} type="text" /></label>
        <div class="py-5 options">
            <div>
                <p>Quiz type: </p>
                <input type="radio" bind:group={quiz_type} value="radio" id="radio">
                <label for="radio">Radio</label>
                <input type="radio" bind:group="{quiz_type}" value="checkbox" id="checkbox" >
                <label for="checkbox">Checkbox</label>
            </div>
            
            <div class="py-5">
                <label for="option1">Option 1: </label>
                <input type="text" bind:value={options[0]} class="option" />
            </div>
            <div class="py-5">
                <label for="option1">Option 2: </label>
                <input type="text" bind:value={options[1]} class="option" />
            </div>
            <div class="py-5">
                <label for="option1">Option 3: </label>
                <input type="text" bind:value={options[2]} class="option" />
            </div>
            <div class="py-5">
                <label for="option1">Option 4: </label>
                <input type="text" bind:value={options[3]} class="option" />
            </div>
        </div>
        {#if formErrors.length > 0}
        <div class="mb-2">
            <span class="validation-hint">
                {#each formErrors as  formError}
                    <p class="text-red-500">{formError}</p>
                {/each}
            </span>
        </div>
        {/if}
        <button type="submit" class:edit={questionSubmitted} class="btn">
            {#if questionSubmitted}Edit{:else}Submit{/if}
        </button>
        <button type="reset" class="btn next-button ml-4">Next Question</button>

    </form>
    <!-- <div class="py-3">
        <button type="button" on:click={addOption} class="btn">+</button>
    </div> -->
</div>

<style lang="postcss">
    :global(input) {
        border: 2px solid black;
        border-radius: 3px;
    }

    .btn {
        @apply bg-blue-500 text-white font-bold py-2 px-4 rounded;
    }

    .next-button {
        @apply bg-green-500;
    }

    .edit {
        @apply bg-gray-500;
    }

    .field-danger {
		border-color: red;
	}
</style>
