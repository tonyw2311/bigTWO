<script>
    // @ts-nocheck
    import { gsap } from "gsap";
    import Flip from "gsap/dist/Flip";
    gsap.registerPlugin(Flip);

    import { slide } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import "./styles.css";
    import { io } from "$lib/webSocketConnection.js";
    import { onMount } from "svelte";
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
    import WinnerBox from "../components/WinnerBox.svelte";
    let username = "lol";
    export let CODE;
    let winnerIsShown = false;
    let winners = new Array(3);
    for (let i = 0; i < 3; ++i) winners[i] = 0;
    let myCards = new Array();
    let turn = false;
    let lessThanFivers = new Array();
    let turnPlayer;
    let isShown = true;
    let selectedCards;
    let playedCards;
    let playedName = "";
    let players = new Array();
    $: otherPlayers = players.filter((x) => {
        if (x === username) {
            return false;
        }
        return true;
    });
    let skippedTurn = 0;
    let yourName = "";
    let nameArr = new Array();
    let isStarted = false;
    let winner = "";
    let isActive = new Array();
    let isTransitionMiddle = true;
    let isTransition1 = true;
    let isTransition2 = true;
    let isTransition3 = true;
    let x = "100";
    let y = "45vw";
    let middleCardShown = true;
    let name1 = "";
    let name2 = "";
    let name3 = "";

    onMount(() => {
        io.emit("groupID", CODE);

        io.on("isStarted", (gameStarted) => {
            isStarted = gameStarted;
            console.log("wow game started");
        });

        io.on("winner", (username) => {
            for (var i = 0; i < nameArr.length; i++) {
                if (nameArr[i].substr(0, 20) === username) {
                    winner = nameArr[i].substr(20) + " won!";
                    break;
                }
            }
        });

        io.on("lessThanFive", (arr) => {
            lessThanFivers = arr;
        });

        io.on("players", (playerArr) => {
            players = playerArr;
            otherPlayers = players.filter((x) => {
                if (x === username) {
                    return false;
                }
                return true;
            });
            console.log(otherPlayers);
            //players = players
        });
        io.on("groupID", (sum) => {
            console.log(sum);
        });

        io.on("name", (name) => {
            username = name;
        });
        io.on("set-your-name", (data) => {
            console.log(data.username + "hi");
            nameArr = data.arr;
            name1 = personName(otherPlayers[0]);
            name2 = personName(otherPlayers[1]);
            name3 = personName(otherPlayers[2]);

            if (data.username === username) {
                isShown = false;
            }
        });
        io.on("cards", (distributedCards) => {
            myCards = new Array();
            for (let i = 0; i < distributedCards.length; i++) {
                let splitted = split(distributedCards[i]);
                myCards.push({
                    isAnimated: false,
                    isShown: false,
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
            startGameAnimation();
        });

        io.on("playedCards", (data) => {
            playedCards = data.cards;
            playedName = data.playerName;
            turn = data.turn === username;
            turnPlayer = data.turn;
            turn = turn;
            skippedTurn = data.skippedTurn;
            if (otherPlayers[0] === data.playerName && data.skippedTurn === 0) {
                isTransition1 = !isTransition1;
            } else if (
                otherPlayers[1] === data.playerName &&
                data.skippedTurn === 0
            ) {
                isTransition2 = !isTransition2;
            } else if (
                otherPlayers[2] === data.playerName &&
                data.skippedTurn === 0
            ) {
                isTransition2 = !isTransition2;
            }

            if (turn) {
                console.log("wow");
                if (myCards.length === 0) {
                    skipTurn();
                    console.log("Turn skipped");
                }
            }
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
            playedName,
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
    function personName(name) {
        for (let i = 0; i < nameArr.length; i++) {
            if (name === nameArr[i].substr(0, 20)) {
                return nameArr[i].substr(20);
            }
        }
        return "NoName";
    }

    function isEmpty(input) {
        input = input.replace(/ /g, "");
        return input == "";
    }
    const timer = (ms) => new Promise((res) => setTimeout(res, ms));

    async function startGameAnimation() {
        for (let j = 0; j < 13; j++) {
            for (let i = 0; i < 4; i++) {
                if (i === 0) {
                    y = "30vh";
                    x = 0;
                } else if (i === 1) {
                    y = 0;
                    x = "-40vw";
                } else if (i === 2) {
                    y = "-30vh";
                    x = 0;
                } else if (i === 3) {
                    x = "40vw";
                    y = 0;
                }
                await timer(300);
                isTransitionMiddle = !isTransitionMiddle;
            }
            myCards[j].isShown = true;
            await timer(200);
            myCards[j].isAnimated = true;
        }
        middleCardShown = false;
    }
</script>

<div class={isShown || winnerIsShown ? "modalShown" : ""} />
<WinnerBox {players} {winners} {nameArr} {winnerIsShown} />
<Button
    on:click={() => {
        winnerIsShown = !winnerIsShown;
        console.log(otherPlayers);
    }}>Winner</Button
>
<div class="demoWrapper">
    <div class="game-background">
        {#key isTransitionMiddle}
            <div
                style="position:absolute; transform:translate(-50%,-50%); top:50%;left:50%;   justify-content: center;
                align-items: center;{middleCardShown
                    ? 'visibility:visible'
                    : 'visibility:hidden'}"
            >
                <CardBack {x} {y} />
            </div>
        {/key}
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
            <Button on:click={setYourName} disabled={isEmpty(yourName)}
                >Join</Button
            >
        </div>

        <div class={"row-of-cards"}>
            {#each myCards as card, index (card.url)}
                <div
                    class="card2"
                    style={card.isShown
                        ? "visibility:visible"
                        : "visibility:hidden"}
                    class:isSelected={isActive.includes(index)}
                >
                    <input
                        value={"whatsittoyah"}
                        type="image"
                        src={card.url}
                        alt=""
                        draggable="false"
                        class="card front"
                        class:card-selected={isActive.includes(index)}
                        style={card.isAnimated
                            ? "transform: rotateY(-360deg);"
                            : ""}
                        on:click={() => {
                            if (isActive.includes(index)) {
                                isActive = isActive.filter(
                                    (item) => item !== index
                                );
                                myCards = myCards;
                            } else {
                                isActive.push(index);
                                myCards = myCards;
                            }
                        }}
                    />
                    <div
                        class="back"
                        style={card.isAnimated
                            ? "transform: rotateY(-180deg);"
                            : ""}
                    />
                </div>
                <!--                 <div class="card2">
                    <div class="front"><span>Front</span></div>
                    <div class="back"><span>Back</span></div>
                </div> -->
            {/each}
        </div>

        <span style={"display:grid;bottom:5px;right:5px ;position:absolute "}>
            <Button
                disabled={!turn}
                on:click={() => {
                    selectedCards = new Array();
                    if (turn && isActive.length !== 0) {
                        isActive.sort();
                        let i = isActive.length - 1;
                        while (i >= 0) {
                            selectedCards.push(myCards[isActive[i]]);
                            i--;
                        }

                        if (!playedCards || skippedTurn >= players.length - 1) {
                            if (isValid(selectedCards)) {
                                console.log("null or skipped");
                                if (
                                    myCards.length - selectedCards.length ===
                                    0
                                ) {
                                    io.emit("winner", { CODE, username });
                                }
                                if (
                                    myCards.length - selectedCards.length <=
                                    5
                                ) {
                                    lessThanFivers.push(username);
                                    io.emit("lessThanFive", {
                                        CODE,
                                        lessThanFivers,
                                    });
                                }
                                io.emit("playedCards", {
                                    cards: selectedCards,
                                    code: CODE,
                                    skippedTurn: 0,
                                    user: username,
                                });
                                i = isActive.length - 1;
                                while (i >= 0) {
                                    removeByAttr(
                                        myCards,
                                        "cardName",
                                        myCards[isActive[i]].cardName
                                    );
                                    i--;
                                }
                            }
                        } else if (cardComparer(playedCards, selectedCards)) {
                            console.log("Passed Card comparer");
                            if (myCards.length - selectedCards.length === 0) {
                                io.emit("winner", { CODE, username });
                            }
                            io.emit("playedCards", {
                                cards: selectedCards,
                                code: CODE,
                                user: username,
                                skippedTurn: 0,
                            });
                            i = isActive.length - 1;
                            while (i >= 0) {
                                removeByAttr(
                                    myCards,
                                    "cardName",
                                    myCards[isActive[i]].cardName
                                );
                                i--;
                            }
                        } else {
                            console.log("Failed Card comparer");
                        }

                        isActive = new Array();
                    } else {
                        console.log("stop");
                    }
                }}>Play Cards</Button
            >
            <Button disabled={!turn} on:click={skipTurn}>Skip Turn</Button>
        </span>

        <span
            style="position:absolute;  top: 50%; right: 50%;
        transform: translate(50%,-50%) z-index:100;"
        >
            <Button
                on:click={distributeCards}
                isVisible={!isStarted}
                disabled={players.length !== 4 ? false : false}
                type="startButton">Start Game</Button
            >
        </span>
        <span style="display:grid;position:absolute;bottom:5px;left:5px">
            <Button
                on:click={() => {
                    myCards.sort(fieldSorter(["suitRank", "numberRank"]));
                    myCards = myCards;
                    console.log(myCards);
                }}>Suit Sort</Button
            >

            <Button
                on:click={() => {
                    myCards.sort(fieldSorter(["numberRank", "suitRank"]));
                    myCards = myCards;
                }}>Number Sort</Button
            >
        </span>
        <h1>{winner}</h1>
        {#key isTransition1}
            <div
                style="
                position:absolute; transform:translate(-50%,-50%) rotate(90deg); top:50%;left:5%;  text-align:center"
                class="tooltip"
            >
                <CardBack y="-45vw" x="0" style="margin:auto" />
                {#if name1 !== "NoName" && name1 !== ''}
                    <h5 class="name">{name1}</h5>
                {/if}
            </div>
        {/key}

        {#key isTransition2}
            <div
                style="
            position:absolute; transform:translate(-50%,-50%); top:10%;left:50%;  text-align:center"
                class="tooltip"
            >
                {#if name2 !== "NoName" && name2 !== ''}
                    <h5 class="name">{name2}</h5>
                {/if}
                <CardBack y="20vh" x="0" style="margin:auto" />
            </div>
        {/key}

        {#key isTransition3}
            <div
                style="
            position: absolute; 
            transform:translate(-50%,-50%) rotate(-90deg); top:10%;right:0%; 
            justify-content: center;
            align-items: center;
             top: 50%; right: 0%; text-align:center"
                class="tooltip"
            >
                <CardBack y="45vw" x="0" style="margin:auto" />
                {#if name3 !== "NoName" && name3 !== ''}
                    <h5 class="name">{name3}</h5>
                {/if}
            </div>
        {/key}

        <h1 class={turn ? "glow2" : ""}>{turn ? "Your turn" : ""}</h1>

        <PlayerBox
            {players}
            {turnPlayer}
            {username}
            {nameArr}
            {lessThanFivers}
            style={"right:0;position:absolute;top:0"}
        />

        <div class="playedCards tooltip">
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
                <span class="tooltiptext"
                    >{personName(playedName)} played this set</span
                >
            {/if}
        </div>
    </div>
</div>

<style>
    .name {
        background-color: darkcyan;
        border-radius: 10px;
        margin: .5vw 0;
        padding: 0.5vw 0;
        font-size: 1vw;
    }
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

    .card2 {
        position: relative;
        width: 5vw;
        height: 7vw;
        perspective: 500px;
        border-radius: 2px;
        margin-right: 0.5vw;
    }

    .front,
    .back {
        position: absolute;
        width: 100%;
        height: 100%;

        transition: transform 1s;
        backface-visibility: hidden;
        transform-style: preserve-3d;
    }

    .back {
        background-color: var(--cardred);
        width: 4.7vw;
        height: 7vw;
        border-radius: 0.3vw;
        border: 0.2vw solid #ddd7d2;
    }

    .card {
        margin-right: 0.5vw; /* Use viewport width */
        width: auto;
        height: 7vw;
        border: solid transparent 3px;
        border-radius: 4px;
        transition: transform 1s;
        transform-style: preserve-3d;
    }

    .card:hover {
        border: #ccff15 solid 3px;
        border-radius: 5px;
    }
    .card-selected {
        border: #04d9ff solid 3px;
        border-radius: 5px;
    }

    .row-of-cards {
        display: grid;
        grid-template-columns: repeat(13, 1fr);
        /* Use viewport width */
        bottom: 0;
        position: absolute;
        left: 8vw;
        margin: 0.5vw; /* Use viewport width */
        height: 9vw;
        align-items: end;
    }
    .demoWrapper {
        margin: 0.5vw;
        box-sizing: border-box;
        resize: horizontal;
        max-width: 95%;
        height: calc(100vh - 16px);
    }

    .game-background {
        position: relative;
        background: var(--game-background);
        border: 2vw solid var(--game-border); /* Use viewport width */
        border-radius: 3vw; /* Use viewport width */
        width: 100%;
        padding-bottom: 45.25%;
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
        left: 20%;
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
