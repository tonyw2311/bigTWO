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
        style={disabled ? "background-color:gray; cursor:not-allowed;" : ""}
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
        style={isVisible ? (disabled ? "background-color:gray; cursor:not-allowed;":'') : "visibility:hidden;"}
        disabled={!isVisible || disabled}
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
            ? "background-color:gray; cursor:not-allowed;"
            : ""}
        {disabled}
    >
        <slot />
    </button>
{/if}

<style>
.buttonStyle {
    color: rgb(213, 198, 226);
    padding:5%; /* Use percentage-based padding to maintain aspect ratio */
    background-color: rgb(54, 53, 100);
    border-radius: 5px;
    margin:5px; /* Use percentage-based margin */
    font-size: 1vw; /* Use viewport units for font-size (adjust as needed) */
    min-width: fit-content;
    width: auto; /* Set width to auto for content-based sizing */
    height: auto; /* Set height to auto for content-based sizing */
    cursor: pointer;

}


</style>
