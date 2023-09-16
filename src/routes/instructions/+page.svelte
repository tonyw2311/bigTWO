<script>
    import Button from "../../components/Button.svelte";
</script>

<title>Big Two Instructions</title>
<div style="margin:5% 10%" class="instructions">
    <h1>Big Two</h1>

    <h3>Objective:</h3>
    <p>
        The objective of Big Two is to be the first player to get rid of all of
        your cards by playing valid combinations of cards.
    </p>
    <h3>Setup:</h3>
    <ol>
        <li>Use a standard 52-card deck for 4 players.</li>
    </ol>

    <h3>Card Ranking:</h3>
    <ol>
        <li>The cards are ranked based on both value and suit.</li>
        <li>
            Spades are the highest-ranked suit, followed by hearts, clubs, and
            diamonds.
        </li>
        <li>
            Within each suit, the cards are ranked from highest to lowest: 2
            (highest), A, K, Q, J, 10, 9, 8, 7, 6, 5, 4, 3 (lowest).
        </li>
    </ol>

    <h3>Gameplay:</h3>
    <ol>
        <li>Shuffle the deck and deal 13 cards to each player.</li>
        <li>
            Players take turns clockwise. On your turn, you must play one or
            more cards that form a valid combination.
        </li>
        <li>
            Valid combinations include single cards, pairs, triples, straights
            (at least 5 consecutive cards of any suit), full houses (a pair and
            a triple), straight flush, and four of a kind.
        </li>
        <br />
        <h3 style="margin:0">
            Here are the rankings for the five-card combinations:
        </h3>
        <table style="text-align:right;border-spacing:10px">
            <tr>
                <th>Rank</th>
                <th>Combination</th>
            </tr>
            <tr>
                <td>1</td>
                <td>Straight Flush</td>
            </tr>
            <tr>
                <td>2</td>
                <td> Four of a Kind</td>
            </tr>
            <tr>
                <td>3</td>
                <td>Full House</td>
            </tr>
            <tr>
                <td>4</td>
                <td>Flush</td>
            </tr>
            <tr>
                <td>5</td>
                <td>Straight</td>
            </tr>
        </table>
        <li>
            The next player must play a higher-ranking combination of the same
            type (e.g., a pair beats a pair, a straight beats a straight) or
            pass. If you pass, you cannot play cards in the current round.
        </li>
        <li>
            Continue playing until all players pass consecutively. The player
            who played the last valid combination gets to start a new round with
            any valid combination they choose.
        </li>
        <li>
            If a player runs out of cards, they win the round, and the remaining
            players continue to play until everyone runs out of cards.
        </li>
    </ol>
    <div class= 'button'>
        <Button href={``} type="link">Home</Button>
    </div>
</div>

<style>
    .button{
       position:absolute;
       left:50%;
       transform: translate(-50%,-50%);
       margin-top: 10px;
    }
    ol,
    p {
        margin-left: 20px;
        letter-spacing: 1px;
        line-height: 2em;
    }
    h3 {
        margin-bottom: 0;
    }

    /* Add some styling to the instructions for better readability */
    .instructions {
        padding: 10vh;
        border-radius: 5%;
        box-shadow: 0 0 5px rgba(0, 0, 0, 1);
    }
</style>
