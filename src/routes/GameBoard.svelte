<script>
    // @ts-nocheck
    import "./styles.css";
    import { io } from "$lib/webSocketConnection.js";
    import { Socket } from "socket.io-client";
    import { onMount } from "svelte";
    import { spring } from "svelte/motion";
    import CardBack from "./CardBack.svelte";
    import {
        split,
        fieldSorter,
        suitRank,
        numberRank,
        removeByAttr,
    } from "./logic.svelte";

    import Button from "../components/Button.svelte";

    import { cardComparer, isValid } from "../components/gameLogic.svelte";
    let username = "lol";
    export let CODE;
    let arr = new Array();
    let turn;
    let turnPlayer;
    let selectedCards;
    let playedCards;
    let players = new Array();
    let skippedTurn = 0;
    import PlayerBox from "../components/PlayerBox.svelte";

    const sty = [
        "transform: rotate(-20deg) translate(-7.5vw);",
        "transform: rotate(-17deg) translate(-6vw);",
        "transform: rotate(-15deg) translate(-5vw);",
        "transform: rotate(-12deg) translate(-3.5vw);",
        "transform: rotate(-10deg) translate(-2.5vw);",
        "transform: rotate(-5deg) translate(-1.25vw);",
        "transform: rotate(0deg) translate(0);",
        "transform: rotate(5deg) translate(1.25vw);",
        "transform: rotate(10deg) translate(2.5vw);",
        "transform: rotate(15deg) translate(3.5vw);",
        "transform: rotate(20deg) translate(5vw);",
        "transform: rotate(25deg) translate(6vw);",
        "transform: rotate(30deg) translate(7.5vw);",
        "transform: rotate(40deg) translate(8.5vw);",
    ];

    onMount(() => {
        io.emit("groupID", CODE);

        io.on("players", (playerArr) => {
            players = playerArr;
            //players = players
        });
        io.on("groupID", (sum) => {
            console.log(sum);
        });

        io.on("name", (name) => {
            username = name;
        });
        io.on("cards", (distributedCards) => {
            arr = new Array();
            for (let i = 0; i < distributedCards.length; i++) {
                let splitted = split(distributedCards[i]);
                arr.push({
                    number: Number(splitted[0]),
                    numberRank: numberRank(Number(splitted[0])),
                    suit: splitted[1],
                    suitRank: suitRank(splitted[1]),
                    url: new URL(
                        `../lib/images/cards/${distributedCards[i]}.png`,
                        import.meta.url
                    ).href,
                    cardName: distributedCards[i],
                });
            }
        });

        io.on("playedCards", (data) => {
            playedCards = data.cards;
            turn = data.turn === username;
            turnPlayer = data.turn;
            turn = turn;
            skippedTurn = data.skippedTurn;
        });
    });

    function distributeCards() {
        io.emit("distributeCards", CODE);
    }

    function skipTurn() {
        io.emit("playedCards", {
            cards: playedCards,
            code: CODE,
            user: username,
            skippedTurn: skippedTurn + 1,
        });
    }

    let isActive = new Array();
    // @ts-ignore
</script>

<div class="game-background">
    <div class="bottom-row">
        <div class={"row-of-cards"}>
            {#each arr as card, index (card.url)}
                <input
                    value={"whatsittoyah"}
                    type="image"
                    src={card.url}
                    alt=""
                    draggable="false"
                    class={"card"}
                    class:isSelected={isActive.includes(index)}
                    on:click={() => {
                        if (isActive.includes(index)) {
                            isActive = isActive.filter(
                                (item) => item !== index
                            );
                            arr = arr;
                        } else {
                            isActive.push(index);
                            arr = arr;
                        }
                    }}
                />
            {/each}
            <span style="display:flex;grid-rows-template:1fr 1fr">
                <button
                    on:click={() => {
                        selectedCards = new Array();
                        if (turn) {
                            isActive.sort();
                            let i = isActive.length - 1;
                            while (i >= 0) {
                                selectedCards.push(arr[isActive[i]]);
                                i--;
                            }

                            console.log(typeof playedCards);
                            if (
                                !playedCards ||
                                skippedTurn === players.length - 1
                            ) {
                                console.log("null or skipped");
                                io.emit("playedCards", {
                                    cards: selectedCards,
                                    code: CODE,
                                    skippedTurn: 0,
                                    user: username,
                                });

                                i = isActive.length - 1;
                                while (i >= 0) {
                                    removeByAttr(
                                        arr,
                                        "cardName",
                                        arr[isActive[i]].cardName
                                    );
                                    i--;
                                }
                            } else if (
                                cardComparer(playedCards, selectedCards)
                            ) {
                                console.log("Passed Card comparer");
                                io.emit("playedCards", {
                                    cards: selectedCards,
                                    code: CODE,
                                    user: username,
                                    skippedTurn: 0,
                                });
                                i = isActive.length - 1;
                                while (i >= 0) {
                                    removeByAttr(
                                        arr,
                                        "cardName",
                                        arr[isActive[i]].cardName
                                    );
                                    i--;
                                }
                            } else {
                                console.log("Failed Card comparer");
                            }

                            //if ( cardComparer({},{}))
                            /*                     arr = arr;
                    io.emit("playedCards", {
                        cards: selectedCards,
                        code: CODE,
                        user: username,
                    }); */
                            isActive = new Array();
                        } else {
                            console.log("stop");
                        }
                    }}>Play Cards</button
                >
                <button on:click={skipTurn}>Skip Turn</button>
            </span>
        </div>
    </div>
    <button on:click={distributeCards}>distributeCards</button>
    <button
        on:click={() => {
            arr.sort(fieldSorter(["suitRank", "numberRank"]));
            arr = arr;
            console.log(arr);
        }}>Suit Sort</button
    >

    <button
        on:click={() => {
            arr.sort(fieldSorter(["numberRank", "suitRank"]));
            arr = arr;
        }}>Number Sort</button
    >

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
    <PlayerBox
        {players}
        {turnPlayer}
        {username}
        style={"right:1vw;position:absolute;top:1vw"}
    />
    <!--     {#each players as player, index}
        <h2 style={"text-align:center"}>
            {turnPlayer === player ? "> " : ""}{player}{player === username
                ? " (You)"
                : ""}
        </h2>
    {/each} -->

    <div class="playedCards">
        {#if playedCards}
            {#each playedCards as x, index}
                <img
                    value={"whatsittoyah"}
                    type="image"
                    src={new URL(
                        `../lib/images/cards/${playedCards[index].cardName}.png`,
                        import.meta.url
                    ).href}
                    alt=""
                    draggable="false"
                />
            {/each}
        {/if}
    </div>
</div>

<style>
    input {
        width: auto;
        height: 7vw; /* Use viewport width */
    }

    img {
        width: auto;
        height: 7vw; /* Use viewport width */
        margin: 1vw; /* Use viewport width */
    }

    .isSelected {
        margin-bottom: 2vh; /* Use viewport height */
        border-color: yellow;
        border-width: 2vw; /* Use viewport width */
    }
    .bottom-row {
        position: absolute;
        bottom: 0;
        display: flex;
        flex-direction: row;
    }
    .playedCards {
        margin: auto;
        padding: 2vh; /* Use viewport height */
        display: flex;
        justify-content: center;
        align-items: center;
        grid-column: 1;
        grid-template-columns: 15vw 15vw; /* Use viewport width */
        position: absolute;
    }

    .card {
        margin-right: 1vw; /* Use viewport width */
    }

    .card:hover {
        margin-bottom: 2vh; /* Use viewport height */
        border-color: blueviolet;
        border-width: 1vw; /* Use viewport width */
        border: #ff3e00;
    }

    .row-of-cards {
        grid-column: 1;
        grid-template-columns: repeat(
            auto-fit,
            minmax(5vw, 1fr)
        ); /* Use viewport width */
        bottom: 0;
        position: relative;
        margin: 1vw; /* Use viewport width */
    }

    .game-background {
        position: absolute;
        width: 90vw; /* Use viewport width */
        height: 80vh; /* Use viewport height */
        border: 2vw solid var(--game-border); /* Use viewport width */
        border-radius: 3vw; /* Use viewport width */
        background: var(--game-background);
        padding: 1vw; /* Use viewport width */
    }

    @media (max-width: 768px) {
        /* Adjust styles for smaller screens */
        .playedCards {
            grid-template-columns: 1fr;
        }

        .row-of-cards {
            grid-template-columns: repeat(
                auto-fit,
                minmax(3vw, 1fr)
            ); /* Use viewport width */
        }
    }
</style>
