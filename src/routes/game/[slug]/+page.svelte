<script>
// @ts-nocheck

    /** @type {import('./$types').PageData} */
    export let data;
    import GameBoard from "../../GameBoard.svelte";
</script>

<h1>{data.slug}</h1>
<GameBoard CODE = {data.slug}/>
