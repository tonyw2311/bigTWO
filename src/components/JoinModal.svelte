<script>
    // @ts-nocheck
    import Button from "./Button.svelte";
    let groupID = "";
    export let isShown;

</script>

<div class="modal" style={isShown ? "visibility:shown" : "visibility:hidden"}>
    <input style={"margin:20px"} bind:value={groupID} />
    <Button href={`game/${groupID}`} type='link'>Join</Button>
</div>

<style>
    .modal {
        height: 100px;
        background-color: var(--box-background);
        position: absolute;
        padding: 1vw;
    }
/*     .modal-overlay {
        display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    overflow: auto;
    } */
</style>
