<script>
    // @ts-nocheck
    export let winnerIsShown = true;
    export let players = new Array();
    export let nameArr = new Array();
    export let winners = new Array();
    export let playAgainFunction;
    $: difference = players
        .filter((x) => !winners.includes(x))
        .concat(winners.filter((x) => !players.includes(x)));
    import { Star } from "svelte-ionicons";
    import Button from "./Button.svelte";
</script>

<div
    class="backgroundBox"
    style="visibility:{winnerIsShown ? 'visible' : 'hidden'}"
>
    <h1>Leaderboard</h1>

    {#each nameArr as name}
        {#if name.substr(0, 20) === winners[0]}
            <div class='playerBox'>
                <Star size="24" color="#D1B000" />
                <span>{name.substr(20)}</span>
            </div>
            <br /><br />
        {:else if name.substr(0, 20) === winners[1]}
            <div class='playerBox'>
                <Star size="24" color="#C0C0C0" />
                <span>{name.substr(20)}</span>
            </div>
            <br /><br />
        {:else if name.substr(0, 20) === winners[2]}
            <div class="playerBox">
                <Star size="24" color="#B87333" />
                <span>{name.substr(20)}</span>
            </div>
            <br /><br />
        {:else if name.substr(0, 20) === difference[0]}
            <div class="playerBox">
                <Star size="24" color="gray" style="align-self:center" />
                <span>{name.substr(20)}</span>
            </div>
            <br /><br />
        {/if}
    {/each}
    <div
        style="position:absolute;bottom:5%;left:50%;transform: translate( -50%);"
    >
        <Button on:click={playAgainFunction}>Play Again</Button>
    </div>
</div>

<style>
    span{
        margin-left:10px;
    }
    .backgroundBox {
        display: inline-block;
        padding: 2%; /* Adjust padding relative to the parent container */
        background-color: #485d86;
        width: 50%;
        height: 50%;
        border-radius: 10px;
        z-index: 100;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }
    .playerBox {
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }
</style>
