<script>
    export let style=''
    import { slide, fly } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    export let x = '45vw'
    export let y = '45vw';
    // import './styles.css'
</script>

<div
    class="card"
    {style}
    out:fly={{ delay: 250, duration: 2000, easing: quintOut,x, y}}
/>

<style>
    .card {
        background-color: var(--cardred);
        width: 4.7vw;
        height: 7vw;
        border-radius: 0.3vw;
        border: 0.2vw solid #ddd7d2;
    }
</style>
