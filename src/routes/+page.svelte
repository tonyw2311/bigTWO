<script>
    // @ts-nocheck
    import Button from "../components/Button.svelte";
    /** @type {import('./$types').PageData} */
    const newToken = Math.random().toString(16).slice(5);

    import JoinModal from "../components/JoinModal.svelte";
    let modalShown = false;
    import "../routes/styles.css";
    let closeModalFunction = () =>{modalShown=false} 
</script>

<div class="vertical-center">
    <h1 style="font-family:'Dancing Script';font-size:50px">Big TWO</h1>

    <div class="vertical-center2">
        <Button href={`game/${newToken}`} type="link">New Game</Button>
        <br />

        <JoinModal isShown={modalShown} {closeModalFunction}/>
        <br />
        <br />

        <Button on:click={() => {modalShown = true}}>Join Game</Button>
        <br />
        <br />
        <Button href={`instructions`} type="link">Instructions</Button>
    </div>
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
    .vertical-center {
        border-radius: 5%;
        width: 40%;
        height: 70%;
        box-shadow: 0 0 10px rgba(0, 0, 0, 1);
        margin: 0;
        display: block;
        position: fixed;
        justify-content: center;
        align-content: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 3px;
        text-decoration: none;
    }
    .vertical-center2 {
        margin: 0;
        display: block;
        position: fixed;
        justify-content: center;
        align-content: center;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
