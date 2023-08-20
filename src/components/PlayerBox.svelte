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
        <div
            style="display:grid;grid-template-columns:30px 1fr; white-space:nowrap;margin:20px 0; grid-cols:2;"
        >
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
    @keyframes pulse {
        0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 3px #00ab00, inset 0 0 3px #00ab00;
        }

        70% {
            transform: scale(1);
            box-shadow: 0 0 0 4px #00ab00, inset 0 0 3px #00ab00;
        }

        100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 3px #00ab00, inset 0 0 3px #00ab00;
        }
    }

    .backgroundBox {
        display: inline-block;
        padding: 10px;
    }
    .dot-active {
        position: relative;
        vertical-align: middle;
        align-self: center;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-left: 18px solid #00ab00;
    }
    .dot-inactive {
        position: relative;
        align-self: center;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
        border-left: 18px solid var(--main-background);
    }

    .waveTextAnimated span:nth-of-type(1) {
        -webkit-animation-delay: 0s;
        animation-delay: 0s;
    }
    .waveTextAnimated span:nth-of-type(2) {
        -webkit-animation-delay: 0.1s;
        animation-delay: 0.1s;
    }
    .waveTextAnimated span:nth-of-type(3) {
        -webkit-animation-delay: 0.2s;
        animation-delay: 0.2s;
    }
    .waveTextAnimated span:nth-of-type(4) {
        -webkit-animation-delay: 0.3s;
        animation-delay: 0.3s;
    }
    .waveTextAnimated span:nth-of-type(5) {
        -webkit-animation-delay: 0.4s;
        animation-delay: 0.4s;
    }
    @keyframes wave-text {
        00% {
            transform: translateY(0em);
        }
        60% {
            transform: translateY(-0.6em);
        }
        100% {
            transform: translateY(0em);
        }
    }
</style>
