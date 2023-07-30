<script>
    // @ts-nocheck
    import { io } from "$lib/webSocketConnection.js";
    import { onMount } from "svelte";
    import { spring } from "svelte/motion";

    let username = "";

    let messages = [];

    onMount(() => {
        io.on("name", (name) => {
            username = name;
            console.log(name);
        });
    });

    let distributedCards = [];

    async function distributeCards() {
        const response = await fetch("/distributeCards");
        distributedCards = await response.json();
        arr = [
            new URL(
                `../lib/images/cards/${distributedCards[0]}.png`,
                import.meta.url
            ).href,
            new URL(
                `../lib/images/cards/${distributedCards[1]}.png`,
                import.meta.url
            ).href,
            new URL(
                `../lib/images/cards/${distributedCards[2]}.png`,
                import.meta.url
            ).href,
            new URL(
                `../lib/images/cards/${distributedCards[3]}.png`,
                import.meta.url
            ).href,
            new URL(
                `../lib/images/cards/${distributedCards[4]}.png`,
                import.meta.url
            ).href,
            new URL(
                `../lib/images/cards/${distributedCards[5]}.png`,
                import.meta.url
            ).href,
            new URL(
                `../lib/images/cards/${distributedCards[6]}.png`,
                import.meta.url
            ).href,
            new URL(
                `../lib/images/cards/${distributedCards[7]}.png`,
                import.meta.url
            ).href,
            new URL(
                `../lib/images/cards/${distributedCards[8]}.png`,
                import.meta.url
            ).href,
            new URL(
                `../lib/images/cards/${distributedCards[9]}.png`,
                import.meta.url
            ).href,
            new URL(
                `../lib/images/cards/${distributedCards[10]}.png`,
                import.meta.url
            ).href,
            new URL(
                `../lib/images/cards/${distributedCards[11]}.png`,
                import.meta.url
            ).href,
            new URL(
                `../lib/images/cards/${distributedCards[12]}.png`,
                import.meta.url
            ).href,
            new URL(
                `../lib/images/cards/${distributedCards[13]}.png`,
                import.meta.url
            ).href,
        ];
    }

    let active = [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
    ];
    // @ts-ignore
    let arr = [];
    let i = 0;
</script>

<div class="game-background">
    <div class={"row-of-cards"}>
        {#each arr as x, index}
            <input
                value={"whatsittoyah"}
                type="image"
                src={arr[index]}
                alt=""
                draggable="false"
                class={"card"}
                class:isSelected={active[index]}
                on:click={() => {
                    active[index] = !active[index];
                }}
            />
        {/each}
        <button
            on:click={() => {
                console.log("hi");
                while (i < active.length) {
                    if (active[i]) {
                        console.log(i);
                    }

                    i++;
                }
                i = 0;
            }}>Play Cards</button
        >
    </div>
    <button on:click={distributeCards}>distributeCards</button>
    <h1>{username}</h1>
    <h1>{distributedCards}</h1>
</div>

<style>
    input {
        width: auto;
        height: 7rem;
    }

    .isSelected {
        margin-bottom: 1rem;
        border-color: yellow;
        border-width: 10px;
    }
    .card {
        margin-right: 1rem;
    }
    .card:hover {
        margin-bottom: 1rem;
        border-color: blueviolet;
        border-width: 5px;
        border: #ff3e00;
    }
    .row-of-cards {
        grid-column: 1;
        grid-template-columns: 50px 50px;
        bottom: 0;
        position: absolute;
        margin: 1rem;
    }

    .game-background {
        position: absolute;
        width: 90%;
        height: 80%;
        background-color: green;
    }
</style>
