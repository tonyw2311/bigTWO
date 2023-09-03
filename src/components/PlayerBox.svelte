<script>
    // @ts-nocheck

    import { onMount } from "svelte";
    export let players;
    export let turnPlayer;
    export let style;
    export let username;
    export let nameArr = new Array();
    let finalArray = new Array();
    function filterArray(name) {
        let i = nameArr.length;
        while (i > 0) {
            if (nameArr[i].substr(0, 20) === name) {
                console.log("whyyy");
                return true;
            }
            i--;
        }
        return false;
    }
    const waiting = "Waiting for player...";
</script>

<div class="backgroundBox" {style}>
    {#each players as player, x}
        <div class="playerBox">
            <span
                class={turnPlayer === player ? "dot-active" : "dot-inactive"}
            />
            {#each nameArr as name}
                {#if name.substr(0, 20) === player}
                    <span
                        >{name.substr(20)}{player === username
                            ? " (You)"
                            : ""}</span
                    >
                    <!--                 {:else}
                    <div>
                        {#each waiting as char}
                            <span style="margin:0">{char}</span>
                        {/each}
                    </div> -->
                {/if}
            {/each}
        </div>
    {/each}
</div>

<style>
    .backgroundBox {
        display: inline-block;
        padding: 2%; /* Adjust padding relative to the parent container */
    }

    .playerBox {
        display: grid;
        grid-template-columns:30px 1fr; /* Adjust column width relative to the parent container */
        white-space: nowrap;
        margin: 10px; /* Adjust margin relative to the parent container */
        font-size: 1vw;
    }

    .dot-active {
        position: relative;
        align-self: center;
        border-top: .75vh solid transparent; /* Adjust border width relative to the viewport width */
        border-bottom: .75vh solid transparent; /* Adjust border width relative to the viewport width */
        border-left: 1.5vw solid #00ab00; /* Adjust border width relative to the viewport width */
    }

    .dot-inactive {
        position: relative;
        align-self: center;
        border-top: .75vh solid transparent; /* Adjust border width relative to the viewport width */
        border-bottom: .75vh solid transparent; /* Adjust border width relative to the viewport width */
        border-left: 1.5vw solid var(--main-background);
    }
</style>
