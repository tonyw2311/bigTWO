<script>
    // @ts-nocheck

    /** @type {import('./$types').PageData} */
    const newToken = Math.random().toString(16).slice(5);
    async function refreshGroupID() {
        const newToken = Math.random().toString(16).slice(2);
    }

    export const load = ({ params }) => {
        return {
            slug: newToken,
        };
    };
</script>

<div class="introBlock">
    <h1>hi</h1>
    <a href={`/game/${newToken}`}>New Game</a>
    <button>Join Game</button>
    <h1>{newToken}</h1>
</div>

<style>
    .introBlock {
        position: absolute;
        background-color: lightcoral;
        width: 60%;
        height: 60%;
    }
</style>
