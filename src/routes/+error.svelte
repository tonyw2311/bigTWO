<script>
    import Button from "../components/Button.svelte";
</script>

<div class="vertical-center">
    <h1>This page does not exist... <br />Please go Home</h1>
    <div style='position:absolute;        
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%);'>
        <Button href={``} type="link">Home</Button>
    </div>
</div>

<style>
    .vertical-center {
        margin: 0;
        display: block;
        position: fixed;
        justify-content: center;
        align-content: center;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>
