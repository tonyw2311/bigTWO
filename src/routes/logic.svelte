<script context="module">
    // @ts-ignore
    export function split(card) {
        return card.split('_')
    }

    // @ts-ignore
    export function dynamicSort(property) {
        var sortOrder = 1;
        if (property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        // @ts-ignore
        return function (a, b) {
            /* next line works with strings and numbers,
             * and you may want to customize it to your needs
             */
            var result =
                a[property] < b[property]
                    ? -1
                    : a[property] > b[property]
                    ? 1
                    : 0;
            return result * sortOrder;
        };
    }
</script>

// @ts-ignore // @ts-ignore
