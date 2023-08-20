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
    import PlayerBox from "../components/PlayerBox.svelte";
    import { cardComparer, isValid } from "../components/gameLogic.svelte";
    let username = "lol";
    export let CODE;
    let arr = new Array();
    let turn = false;
    let turnPlayer;
    let isShown = true;
    let selectedCards;
    let playedCards;
    let players = new Array();
    let skippedTurn = 0;
    let yourName = "";
    let nameArr;

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
        io.on("set-your-name", (data) => {
            console.log("hi");
            console.log(data.username + "hi");
            nameArr = data.arr;
            if (data.username === username) {
                isShown = false;
            }
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

    function setYourName() {
        io.emit("set-your-name", {
            name: yourName,
            username: username,
            CODE,
        });
    }

    function isEmpty(input) {
        input = input.replace(/ /g, "");
        return input == "";
    }

    let isActive = new Array();
</script>

<div class={isShown ? "modalShown" : ""} />
<div class="game-background">

    <div
        class="modal"
        style={isShown ? "visibility:shown" : "visibility:hidden"}
    >
        <input
            style={"margin:20px"}
            maxlength="20"
            placeholder="Your name"
            bind:value={yourName}
            required
        />
        <Button on:click={setYourName} disabled={isEmpty(yourName)}>Join</Button
        >
    </div>

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
                        isActive = isActive.filter((item) => item !== index);
                        arr = arr;
                    } else {
                        isActive.push(index);
                        arr = arr;
                    }
                }}
            />
        {/each}
    </div>

    <span style={"display:grid;right:0;bottom:0;position:absolute; "}>
        <Button
            disabled={!turn}
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
                    if (!playedCards || skippedTurn === players.length - 1) {
                        if (isValid(selectedCards)) {
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
                        }
                    } else if (cardComparer(playedCards, selectedCards)) {
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
            }}>Play Cards</Button
        >
        <Button disabled={!turn} on:click={skipTurn}>Skip Turn</Button>
    </span>

    <Button
        on:click={distributeCards}
        disabled={players.length !== 4 ? true : false}>Start Game</Button
    >
    <span style="display:grid;position:absolute;bottom:0;left:0">
        <Button
            on:click={() => {
                arr.sort(fieldSorter(["suitRank", "numberRank"]));
                arr = arr;
                console.log(arr);
            }}>Suit Sort</Button
        >

        <Button
            on:click={() => {
                arr.sort(fieldSorter(["numberRank", "suitRank"]));
                arr = arr;
            }}>Number Sort</Button
        >
    </span>

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
    <h1 class={turn ? "glow2" : ""}>{turn ? "Your turn" : ""}</h1>
    <PlayerBox
        {players}
        {turnPlayer}
        {username}
        {nameArr}
        style={"right:1vw;position:absolute;top:1vw"}
    />
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
    .modalShown {
        background-color: rgb(0, 0, 0, 0.5);
        width: 100vw;
        height: 100vh;
        z-index: 100;
        top: 50%;
        right: 50%;
        transform: translate(50%, -50%);
        position: fixed;
    }
    .isSelected {
        margin-bottom: 2vh; /* Use viewport height */
        border-color: yellow;
        border-width: 2vw; /* Use viewport width */
    }

    .playedCards {
        position: absolute;
        margin: auto;
        padding: 2vh; /* Use viewport height */
        display: flex;
        justify-content: center;
        align-items: center;
        grid-column: 1;
        grid-template-columns: 15vw 15vw; /* Use viewport width */
        top: 50%;
        right: 50%;
        transform: translate(50%, -50%);
    }
    .modal {
        width: 25vw;
        background-color: var(--box-background);
        display: flex;
        position: fixed;
        padding: 1vw;
        top: 50%;
        right: 50%;
        transform: translate(50%, -50%);
        align-items: center;
        justify-content: center;
        z-index: 500;
        border-radius: 1vw;
    }

    .card {
        margin-right: 1vw; /* Use viewport width */
        width: auto;
        height: 7vw;
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
        position: absolute;
        left: 8vw;
        margin: 0.5vw; /* Use viewport width */
    }

    .game-background {
        position: absolute;
        width: 90vw; /* Use viewport width */
        height: 80vh; /* Use viewport height */
        border: 2vw solid var(--game-border); /* Use viewport width */
        border-radius: 3vw; /* Use viewport width */
        background: var(--game-background);
        padding: 1vw; /* Use viewport width */
        margin-left: 2vw;
    }

    img {
        width: auto;
        height: 7vw; /* Use viewport width */
        margin: 1vw; /* Use viewport width */
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

    .glow2 {
        width: fit-content;
        color: #fff;
        text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff,
            0 0 42px #bc13fe, 0 0 82px #bc13fe, 0 0 92px #bc13fe,
            0 0 102px #bc13fe, 0 0 151px #bc13fe;
        border: 0.2rem solid #fff;
        border-radius: 1rem;
        padding: 1rem;
        box-shadow: 0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 2rem #bc13fe,
            0 0 0.8rem #bc13fe, 0 0 2.8rem #bc13fe, inset 0 0 1.3rem #bc13fe;

        font-size: 18px;
        font-family: "Sacramento", sans-serif;
        background-color: #010a01;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;

        top: 10%;
        right: 50%;
        transform: translate(50%, -50%);

        animation: pulsate 1.5s infinite alternate;
    }

    @keyframes pulsate {
        100% {
            text-shadow: 0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff,
                0 0 40px #bc13fe, 0 0 80px #bc13fe, 0 0 90px #bc13fe,
                0 0 100px #bc13fe, 0 0 150px #bc13fe;
        }

        0% {
            text-shadow: 0 0 2px #fff, 0 0 4px #fff, 0 0 6px #fff,
                0 0 10px #bc13fe, 0 0 45px #bc13fe, 0 0 55px #bc13fe,
                0 0 70px #bc13fe, 0 0 80px #bc13fe;
        }
    }
</style>
