<script>
    // @ts-nocheck
    export let winnerIsShown = true;
    export let players = new Array();
    export let nameArr = new Array();
    export let winners = new Array();
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
    {#each nameArr as name}
        {#if name.substr(0, 20) === winners[0]}
            <Star size="24" color="yellow" />
            <span>{name.substr(20)}</span>
        {:else if name.substr(0, 20) === winners[1]}
            <Star size="24" color="gray" />
            <span>{name.substr(20)}</span>
        {:else if name.substr(0, 20) === winners[2]}
            <Star size="24" color="orange" />
            <span>{name.substr(20)}</span>
        {:else if name.substr(0, 20) === difference[0]}
            <Star size="24" color="black" style="align-self:center" />
            <span>{name.substr(20)}</span>
        {/if}
    {/each}
    <div
        style="position:absolute;bottom:0;left:50%;transform: translate( -50%);"
    >
        <Button>Play Again</Button>
    </div>
</div>

<style>
    .backgroundBox {
        display: inline-block;
        padding: 2%; /* Adjust padding relative to the parent container */
        background-color: darkblue;
        width: 50%;
        height: 50%;
        border-radius: 10px;
        z-index: 100;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

</style>
