<script>
// @ts-nocheck

    /** @type {import('./$types').PageData} */
    export let data;
    import GameBoard from "../../GameBoard.svelte";
</script>
<h5 style='margin:10px;position:relative;align-self:center'>Group Code: {data.slug}</h5>
<GameBoard CODE = {data.slug}/>
