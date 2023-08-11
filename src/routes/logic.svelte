<script context="module">
    // @ts-nocheck

    export function removeByAttr(arr, attr, value) {
        var i = arr.length;
        while (i--) {
            if (
                arr[i] &&
                arr[i].hasOwnProperty(attr) &&
                arguments.length > 2 &&
                arr[i][attr] === value
            ) {
                arr.splice(i, 1);
            }
        }
        return arr;
    };
    // @ts-ignore
    export function split(card) {
        return card.split("_");
    }

    // @ts-ignore
    export function suitRank(suit) {
        switch (suit) {
            case "spades":
                return 3;

            case "hearts":
                return 2;

            case "clubs":
                return 1;

            case "diamonds":
                return 0;
        }
    }

    export function numberRank(num) {
        switch (num) {
            case 2:
                return 15;

            case 1:
                return 14;

            default:
                return num;
        }
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

    // @ts-ignore
    export function fieldSorter(fields) {
        // @ts-ignore
        return function (a, b) {
            return (
                fields
                    // @ts-ignore
                    .map(function (o) {
                        var dir = 1;
                        if (o[0] === "-") {
                            dir = -1;
                            o = o.substring(1);
                        }
                        if (a[o] > b[o]) return dir;
                        if (a[o] < b[o]) return -dir;
                        return 0;
                    })
                    // @ts-ignore
                    .reduce(function firstNonZeroValue(p, n) {
                        return p ? p : n;
                    }, 0)
            );
        };
    }
</script>
