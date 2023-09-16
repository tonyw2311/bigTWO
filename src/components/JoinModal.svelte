<script>
    // @ts-nocheck
    import Button from "./Button.svelte";
    let groupID = "";
    export let isShown = false;
    export let closeModalFunction;

    function isEmpty(input) {
        input = input.replace(/ /g, "");
        return input == "";
    }

    import { CloseCircle } from "svelte-ionicons";
</script>
<div class={isShown?'modalShown':''}></div>
<div class="modal" style={isShown ? "visibility:shown" : "visibility:hidden"}>
    <CloseCircle
        size="24"
        color="#A51B1E"
        on:click={closeModalFunction}
        style="cursor: pointer; margin-left: 0px; position:absolute; 
        top: 20%;
    right: 0%;
    transform: translate(-50%, -50%);"
    />
    <input
        style={"margin:20px"}
        bind:value={groupID}
        placeholder="Enter code"
    />
    <Button href={`game/${groupID}`} type="link" disabled={isEmpty(groupID)}
        >Join
    </Button>
</div>

<style>
    .modal {
        height: 100px;
        background-color: var(--box-background);
        position: fixed;
        padding: 2vw;
        border-radius: 1vw;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 100;
    }
    .modalShown {
        background-color: rgb(0, 0, 0, 0.5);
        width: 100vw;
        height: 100vh;
        z-index: 50;
        top: 50%;
        right: 50%;
        transform: translate(50%, -50%);
        position: fixed;

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
