<script>
    // @ts-nocheck
    export let messages = new Array(20);
    export let nameArr = new Array();
    export let username = "";
    export let style;
    export let isShown = true;
    export let sendMessage;
    let text;
    import { Send } from "svelte-ionicons";
    function personName(name) {
        for (let i = 0; i < nameArr.length; i++) {
            if (name === nameArr[i].substr(0, 20)) {
                return nameArr[i].substr(20);
            }
        }
        return "NoName";
    }
</script>

<div
    style={isShown ? style : "display:none; position:absolute;"}
    class="chatBox"
>
    <div class="messages">
        {#each messages as message, i}
            <div
                class="message"
                style={message.username !== username
                    ? "text-align:left"
                    : "text-align:right;"}
            >
                <h6>{personName(message.username)}</h6>
                <h5
                    style={message.username !== username
                        ? "background-color:#176B87"
                        : "background-color:#57375D; margin-left:auto"}
                >
                    {message.text}
                </h5>
            </div>
        {/each}
    </div>
    <div class="input-section">
        <input bind:value={text} />
        <Send
            size="2vw"
            color="var(--box-background)"
            style="z-index:40;cursor:pointer;position:absolute;transform:translate(-50%,-50%);top:50%;right:0%;outline:none;"
            on:click={() => {
                sendMessage(text, username, messages);
                text = "";
            }}
        />
    </div>
</div>

<style>
    h6,
    h5 {
        margin: 0;
        font-weight: 800;
        display: block;
    }
    h5 {
        font-size: 1vw;
        font-weight: 500;
        margin-bottom: 1vw;
        padding: 0.4vw;
        background-color: #57375d;
        width: fit-content;
        border-radius: 0.5vw;
    }
    h6 {
        font-size: 0.75vw;
    }
    .input-section {
        position: absolute;
        transform: translate(-50%, -50%);
        bottom: 1%;
        left: 50%;
        width: 100%;
    }
    .messages {
        overflow: scroll;
        width: 95%;
        height: 89%;
        margin: auto;
        padding: 0.5vw;
    }
    input {
        width: 80%;
        margin-left: 3%;
        height: 1.5vw;
    }
    .chatBox {
        width: 30%;
        height: 75%;
        backdrop-filter: blur(8px);
        background-color: rgb(0, 0, 0, 0.7);
        border-radius: 1vw;
    }
</style>
