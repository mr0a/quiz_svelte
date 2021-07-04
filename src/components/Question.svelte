<script>
    import {answers as answer} from '../stores/answer'

    export let question;
    export let handleSubmit;

    let answers = [];
    $: answer.set(answers)
    
</script>

<div class="main">
    <div class="wrapper">
        <form on:submit|preventDefault={() => {handleSubmit()}}>
            <h2 class="text-xl">{question.question}</h2>
            <div class="py-5 options ml-5 mb-5">
                {#if question.quiz_type == 'radio'}
                    {#each question.options as option}
                        <div>
                            <input type="radio" bind:group={answers} id="{option}" value="{option}">
                            <label for="{option}">{option}</label>
                        </div>
                    {/each}
                {:else}
                    {#each question.options as option}
                        <div>
                            <input type="checkbox" bind:group={answers} id="{option}" value="{option}">
                            <label for="{option}">{option}</label>
                        </div>
                    {/each}
                {/if}
            </div>
            <button type="submit" class="btn">Submit</button>
        </form>
    </div>
</div>

<style lang="postcss">
    .btn {
        @apply bg-blue-500 text-white font-bold py-2 px-4 rounded;
    }

    .main {
        background: #e9e9e9;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 80%;
        min-height: 400px;
    }
    .wrapper {
        margin: 30px;
        padding: 30px;
        background: #fff;
        min-width: 360px;
        height: 80%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>
