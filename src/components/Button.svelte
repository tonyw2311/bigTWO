<script>
    // @ts-nocheck
    import { goto } from "$app/navigation";
    export let disabled = false;
    export let type = "button";
    export let href = "";
    export let isVisible = true;
    function routeToPage(route, replaceState) {
        goto(`/${route}`, { replaceState });
    }
</script>

{#if type === "link"}
    <button
        on:click={() => routeToPage(href, false)}
        on:mouseover
        on:focus
        on:mouseenter
        on:mouseleave
        class={"buttonStyle"}
        style={disabled ? "background-color:gray" : ""}
        {disabled}
    >
        <slot />
    </button>
{:else if type === "startButton"}
    <button
        on:click
        on:mouseover
        on:focus
        on:mouseenter
        on:mouseleave
        class={"buttonStyle"}
        style={isVisible ? "visibility:visible" : "visibility:hidden;"}
        disabled={!isVisible}
    >
        <slot />
    </button>

{:else if type === "button"}
    <button
        on:click
        on:mouseover
        on:focus
        on:mouseenter
        on:mouseleave
        class={"buttonStyle"}
        style={disabled
            ? "background-color:gray"
            : ""}
        {disabled}
    >
        <slot />
    </button>
{/if}

<style>
    .buttonStyle {
        color: rgb(213, 198, 226);
        padding: 10px;
        background-color: rgb(54, 53, 100);
        border-radius: 5px;
        margin: 10px;
        font-size: 12px;
        width: fit-content;
        height: fit-content;
    }
    .invisible {
        visibility: hidden;
    }
</style>
