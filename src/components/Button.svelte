<script>
    // @ts-nocheck

    export let type='button';
    export let href='';
    let buttonProps = {
        class: [$$restProps.class],
    };
</script>

{#if (type === "link")}
    <a {href} class="buttonStyle"><slot/></a>
{:else if (type === "button")}
    <button on:click on:mouseover on:focus on:mouseenter on:mouseleave class='buttonStyle'>
        <slot/>
    </button>
{/if}

<style>
    .buttonStyle {
        color: rgb(213, 198, 226);
        padding: 10px;
        background-color: rgb(54, 53, 100);
        border-radius: 5px;
        margin:10px;
    }
</style>
