<svelte:head>
    <title>Quiz</title>
</svelte:head>

<script>
    import { onMount, onDestroy } from "svelte";
    import Loading  from '../components/Loading.svelte';
    import Question from "../components/Question.svelte";
    import {answers} from '../stores/answer'
    import { connectToWebsocket, closeWebSocket } from './ws_con.js'

    let socket;
    let message;
    
    onMount(() => {
        socket = connectToWebsocket()
        // socket.addEventListener("message", (event) => {
        //     message = JSON.parse(event.data)
        //     console.log(message);
        // });
        socket.onmessage = event => {
            let parsedData = JSON.parse(event.data)
            if (parsedData.type == 'question'){
                message = parsedData
            }
            console.log(message);
        }
    });

    onDestroy(() => {
        if (socket) {
            closeWebSocket(socket);
            console.log("It's Closed")
        }
    })
    const handleSubmit = () => {
        // console.log($answers);
        let data = {'answer': true,'question': message.question, 'answers': $answers}
        socket.send(JSON.stringify(data));
    };
</script>

{#if message}
    <Question question={message.data} {handleSubmit} />
{:else}
    <Loading />
{/if}

<style lang="postcss">
    :global(input) {
        border: 2px solid black;
        border-radius: 3px;
    }
</style>
