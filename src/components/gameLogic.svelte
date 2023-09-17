<script context="module">
    // @ts-nocheck
    import { dynamicSort } from "../routes/logic.svelte";

    export function cardComparer(prevCards, nextCards) {
        if (prevCards === null) return true;
        if (prevCards.length !== nextCards.length) {
            return false;
        } else if (prevCards.length < 5) {
            return uniformCardCompare(prevCards, nextCards);
        } else if (prevCards.length === 5) {
            return fiveCardCompare(prevCards, nextCards);
        }
        return false;
    }

    export function isValid(card) {
        console.log(card);
        console.log(fiveCardRank(card));
        if (allEqualNumbers(card)) return true;
        else if (fiveCardRank(card) !== 0) return true;
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
            if (occurenceMax(prevCards) < occurenceMax(nextCards)) return true;
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
        if (cards.length !== 5) {
            console.log("huhh?");
            return -1000;
        } else if (allEqualSuits(cards)) {
            if (allSequenced(cards)) {
                return 5;
            }
            return 2;
        } else if (Math.max(...occurenceArr(cards)) === 4) {
            return 4;
        } else if (Math.max(...occurenceArr(cards)) === 3) {
            if (Math.min(...occurenceArr(cards)) === 2) {
                return 3;
            }
        } else if (allSequenced(cards)) {
            return 1;
        }
        return 0;
    }

    const maxSuit = (arr) => Math.max(...arr.map((o) => o.suitRank));

    const allEqualNumbers = (arr) =>
        arr.every((val) => val.numberRank === arr[0].numberRank);

    const allEqualSuits = (arr) =>
        arr.every((val) => val.suitRank === arr[0].suitRank);



    const occurenceArr = (arr) => {
        let count = new Array();
        for (let i = 0; i < arr.length; i++) {
            count.push(
                arr.reduce(
                    (acc, cur) =>
                        cur.numberRank === arr[i].numberRank ? ++acc : acc,
                    0
                )
            );
        }
        return count;
    };

    const occurenceMax =  (arr) => {
        let maxcount = 0;
        let element_having_max_freq;
        for (let i = 0; i < arr.length; i++) {
            let count = 0;
            for (let j = 0; j < arr.length; j++) {
                if (arr[i].numberRank == arr[j].numberRank) count++;
            }

            if (count > maxcount) {
                maxcount = count;
                element_having_max_freq = arr[i].numberRank;
            }
        }

        return element_having_max_freq;
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
