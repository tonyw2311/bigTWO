<script>
    // @ts-nocheck
	import Button from "../components/Button.svelte";
	/** @type {import('./$types').PageData} */
    const newToken = Math.random().toString(16).slice(5);

    import JoinModal from "../components/JoinModal.svelte";
    let modalShown = false;
    let socketID;


</script>


<div class="introBlock">

    <div class="vertical-center">

        <Button href={`game/${newToken}`} type='link' >New Game</Button>
        <JoinModal isShown={modalShown} />
        <Button on:click={() => (modalShown = true)} > Join Game</Button>
    </div>

</div>

<style>
    .introBlock {
        height: 14vw;
        position: relative;

    }
    .vertical-center {
        margin: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }


    /* Styles for the modal */
    .modal {
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 20px;
        z-index: 1001;
    }

    /* Close button styles */
    .modal-close {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
    }
</style>
