<script>
    // @ts-nocheck
    export let players;
    export let turnPlayer;
    export let style;
    export let username;
</script>

<div class="backgroundBox" style ={style}>
    {#each players as player, x}
        <div
            style="display:grid;grid-template-columns:30px 1fr; white-space:nowrap;margin:20px 0; grid-cols:2"
        >
            <span class={turnPlayer===player ? "dot-active":"dot-inactive"} />
            <span>{player}{player===username?' (You)': ''}</span>
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
        padding:10px
    }
    .dot-active {
        position: relative;
        width: 10px;
        height: 10px;
        border-radius: 50px;
        animation: pulse 1.5s linear 1s infinite;
        align-self: center;
        background-color: #00ab00;
        margin-left:1.5px

    }
    .dot-inactive {
        position: relative;
        width: 16px;
        height: 16px;
        border-radius: 50px;
        align-self: center;
        background-color: var(--main-background);

    }
</style>
