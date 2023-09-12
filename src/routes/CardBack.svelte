<script>
    // @ts-nocheck

    export let style = "";
    import { quintOut } from "svelte/easing";
    export let x = "45vw";
    export let y = "45vw";
    export let r = 0;
    // import './styles.css'
    function split_css_unit(value) {
        const split =
            typeof value === "string" &&
            value.match(/^\s*(-?[\d.]+)([^\s]*)\s*$/);
        return split
            ? [parseFloat(split[1]), split[2] || "px"]
            : [/** @type {number} */ (value), "px"];
    }
    function rotateFly(
        node,
        {
            delay = 0,
            duration = 400,
            easing = cubicOut,
            x = 0,
            y = 0,
            r = 0,
            opacity = 0,
        } = {}
    ) {
        const style = getComputedStyle(node);
        const target_opacity = +style.opacity;
        const transform = style.transform === "none" ? "" : style.transform;
        const od = target_opacity * (1 - opacity);
        const [xValue, xUnit] = split_css_unit(x);
        const [yValue, yUnit] = split_css_unit(y);
        return {
            delay,
            duration,
            easing,
            css: (t, u) => `
			transform: ${transform} translate(${(1 - t) * xValue}${xUnit}, ${
                (1 - t) * yValue 
            }${yUnit}) rotate(${(1-t)*r}deg);
			opacity: ${target_opacity - od * u}`,
        };
    }
</script>

<div
    class="card"
    {style}
    out:rotateFly={{ delay: 250, duration: 2000, easing: quintOut, x, y, r }}
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
