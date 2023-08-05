<script>
    // @ts-nocheck
    import { io } from "$lib/webSocketConnection.js";
    import { Socket } from "socket.io-client";
    import { onMount } from "svelte";
    import { spring } from "svelte/motion";
    import CardBack from "./CardBack.svelte";
    import { dynamicSort } from "./logic.svelte";
    let username = "lol";
    let i = 0;

    let arr = new Array();
    let turn = "_";
    let selectedCards;
    let myCards;
    let playedCards = new Array();

    const sty = [
        "transform: rotate(-20deg) translate(-6rem);",
        "transform: rotate(-17deg) translate(-5rem);",
        "transform: rotate(-15deg) translate(-4rem);",
        "transform: rotate(-12deg) translate(-3rem);",
        "transform: rotate(-10deg) translate(-2rem);",
        "transform: rotate(-5deg) translate(-1rem);",
        "transform: rotate(0deg) translate(0rem);",
        "transform: rotate(5deg) translate(1rem);",
        "transform: rotate(10deg) translate(2rem);",
        "transform: rotate(15deg) translate(3rem);",
        "transform: rotate(20deg) translate(4rem);",
        "transform: rotate(25deg) translate(5rem);",
        "transform: rotate(30deg) translate(6rem);",
        "transform: rotate(40deg) translate(7rem);",
    ];

    onMount(() => {
        io.on("name", (name) => {
            username = name;
        });
        io.on("cards", (distributedCards) => {
            myCards = distributedCards;
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
            ];
        });

        io.on("playedCards", (data) => {
            playedCards = data.cards;
            console.log(data.cards);
            turn = data.turn === username ? "Your turn" : "";
        });
    });

    function distributeCards() {
        io.emit("distributeCards", "hi");
    }

    /*     async function distributeCards() {
        const response = await fetch("/distributeCards");
        //distributedCards = await response.json();
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
    } */

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
                selectedCards = new Array();
                while (i < active.length) {
                    if (active[i]) {
                        selectedCards.push(myCards[i]);
                    }
                    i++;
                }

                if (turn === "Your turn") {
                    console.log("emitting cards");
                    io.emit("playedCards", selectedCards);
                } else {
                    console.log("stop");
                }

                i = 0;
            }}>Play Cards</button
        >
    </div>
    <button on:click={distributeCards}>distributeCards</button>
    <button on:click={()=>console.log('hi')}>sort</button>

    <div
        style="margin:5rem; position:absolute;transform:rotate(100deg);left:5rem;top:10rem;"
    >
        {#each { length: 13 } as _, i}
            <CardBack style={sty[i]} />
        {/each}
    </div>

    <div
        style="margin:5rem; position:absolute;transform:rotate(-100deg);right:5rem;top:20rem;"
    >
        {#each { length: 13 } as _, i}
            <CardBack style={sty[i]} />
        {/each}
    </div>

    <h1>{username}</h1>
    <h1>{turn}</h1>

    <div class="playedCards">
        {#each playedCards as x, index}
            <img
                value={"whatsittoyah"}
                type="image"
                src={new URL(
                    `../lib/images/cards/${playedCards[index]}.png`,
                    import.meta.url
                ).href}
                alt=""
                draggable="false"
            />
        {/each}
    </div>
</div>

<style>
    input {
        width: auto;
        height: 7rem;
    }
    img {
        width: auto;
        height: 7rem;
        margin: 0.5rem;
    }

    .isSelected {
        margin-bottom: 1rem;
        border-color: yellow;
        border-width: 10px;
    }
    .playedCards {
        margin: auto;
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        grid-column: 1;
        grid-template-columns: 50px 50px;
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
        border: 1rem solid brown;
        border-radius: 5rem;
        padding: 1rem;
    }
</style>
