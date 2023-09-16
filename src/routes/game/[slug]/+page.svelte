<script>
    // @ts-nocheck

    /** @type {import('./$types').PageData} */
    export let data;
    import GameBoard from "../../GameBoard.svelte";
    import { ClipboardOutline } from "svelte-ionicons";
    let copyMessage = "Copy to Clipboard";
    import Button from "../../../components/Button.svelte";
</script>

<div style="display: inline-flex; align-items: center;margin-top:5%">
    <h5 style="margin: 10px;">Group Code: {data.slug}</h5>

    <div class="tooltip">
        <ClipboardOutline
            size="20"
            style="cursor: pointer; margin-left: 0px;"
            on:click={() => {
                navigator.clipboard.writeText("https://bigtwo.pages.dev/game/" + data.slug);
                copyMessage = "Copied!"
            }}
            on:mouseout={() => {
                copyMessage = "Copy to Clipboard";
            }}
        />
        <span class="tooltiptext">{copyMessage}</span>
    </div>
    <div style='position:absolute;z-index:40;right:3%'>
        <Button type='link' href=''>Home</Button>
    </div>
</div>


<GameBoard CODE={data.slug} />

<style>
    .tooltip {
        position: relative;
        display: inline-block;
    }

    .tooltip .tooltiptext {
        visibility: hidden;
        width: 140px;
        background-color: #555;
        color: #fff;
        text-align: center;
        border-radius: 6px;
        padding: 5px;
        position: absolute;
        z-index: 1;
        bottom: 150%;
        left: 50%;
        margin-left: -75px;
        opacity: 0;
        transition: opacity 0.3s;
    }

    .tooltip .tooltiptext::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #555 transparent transparent transparent;
    }

    .tooltip:hover .tooltiptext {
        visibility: visible;
        opacity: 1;
    }
</style>
