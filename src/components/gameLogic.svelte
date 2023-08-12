<script context="module">
    // @ts-nocheck
    import { dynamicSort } from "../routes/logic.svelte";

    export function cardComparer(prevCards, nextCards) {
        if (prevCards===null) return true
        if (prevCards.length !== nextCards.length) {
            return false;
        } else if (prevCards.length < 5) {
            return uniformCardCompare(prevCards, nextCards);
        } else if (prevCards.length === 5) {
            return fiveCardCompare(prevCards, nextCards);
        }
        return false;
    }

    function uniformCardCompare(prevCards, nextCards) {
        if (allEqualNumbers(nextCards)) {
            if (prevCards[0].numberRank < nextCards[0].numberRank) {
                return true;
            } else if (prevCards[0].numberRank === nextCards[0].numberRank) {
                if (maxSuit(prevCards) < maxSuit(nextCards)) {
                    return true;
                }
            }
        }
        return false;
    }

    function fiveCardCompare(prevCards, nextCards) {
        let prevCardsRank = fiveCardRank(prevCards);
        let nextCardsRank = fiveCardRank(nextCards);
        prevCards.sort(dynamicSort("numberRank"));
        nextCards.sort(dynamicSort("numberRank"));
        if (prevCardsRank < nextCardsRank) return true;
        else if (prevCardsRank === 3 || prevCardsRank === 4) {
            if (occurenceMax(prevCardsRank) < occurenceMax(nextCards))
                return true;
        } else if (prevCardsRank === 2) {
            if (prevCards[0].suitRank < nextCards[0].suitRank) return true;
        } else if (prevCardsRank === 1) {
            if (prevCards[-1].numberRank < nextCards[-1].numberRank)
                return true;
        } else if (prevCardsRank === 5) {
            if (prevCards[0].suitRank < nextCards[0].suitRank) return true;
            else if (prevCards[-1].numberRank < nextCards[-1].numberRank)
                return true;
        }
        return false;
    }

    function fiveCardRank(cards) {
        if (allEqualSuits(cards)) {
            if (allSequenced(cards)) {
                return 5;
            }
            return 2;
        } else if (occurences(cards) === 4) {
            return 3;
        } else if (occurences(cards) === 3) {
            if (
                Object.values(
                    cards.reduce(
                        (acc, o) => (
                            (acc[o.numberRank] = (acc[o.numberRank] || 0) + 1),
                            acc
                        ),
                        {}
                    )
                ).length === 2
            ) {
                return 4;
            }
        } else if (allSequenced(cards)) {
            return 1;
        } else {
            return 0;
        }
    }

    const maxSuit = (arr) => Math.max(...arr.map((o) => o.suitRank));

    const allEqualNumbers = (arr) =>
        arr.every((val) => val.numberRank === arr[0].numberRank);

    const allEqualSuits = (arr) =>
        arr.every((val) => val.suitRank === arr[0].suitRank);

    const occurences = async (arr) =>
        Math.max.apply(
            null,
            Object.values(
                arr.reduce(
                    (acc, o) => (
                        (acc[o.numberRank] = (acc[o.numberRank] || 0) + 1), acc
                    ),
                    {}
                )
            )
        );

    const occurenceMax = async (arr) => {
        var keys = Object.keys(
            arr.reduce(
                (acc, o) => (
                    (acc[o.numberRank] = (acc[o.numberRank] || 0) + 1), acc
                ),
                {}
            )
        );
        var min = keys[0]; // ignoring case of empty list for conciseness
        var max = keys[0];
        var i;

        for (i = 1; i < keys.length; i++) {
            var value = keys[i];
            if (arr[value] < arr[min]) min = value;
            if (arr[value] > arr[max]) max = value;
        }
        return max;
    };

    const allSequenced = (arr) => {
        arr.sort(dynamicSort("numberRank"));
        for (let i = 0; i < arr.length; i++) {
            if (i === 0) {
            } else {
                if (arr[i - 1].numberRank + 1 !== arr[i].numberRank) {
                    return false;
                }
            }
        }
        return true;
    };
</script>
