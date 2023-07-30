import { json } from '@sveltejs/kit';

// @ts-ignore
function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
let arr = [
    '1_spades',
    '2_spades',
    '3_spades',
    '4_spades',
    '5_spades',
    '6_spades',
    '7_spades',
    '8_spades',
    '9_spades',
    '10_spades',
    '11_spades',
    '12_spades',
    '13_spades',

    '1_hearts',
    '2_hearts',
    '3_hearts',
    '4_hearts',
    '5_hearts',
    '6_hearts',
    '7_hearts',
    '8_hearts',
    '9_hearts',
    '10_hearts',
    '11_hearts',
    '12_hearts',
    '13_hearts',

    '1_clubs',    
    '2_clubs',    
    '3_clubs',    
    '4_clubs',    
    '5_clubs',    
    '6_clubs',    
    '7_clubs',    
    '8_clubs',    
    '9_clubs',    
    '10_clubs',    
    '11_clubs',    
    '12_clubs',
    '13_clubs',
    
    '1_diamonds',  
    '2_diamonds',  
    '3_diamonds',  
    '4_diamonds',  
    '5_diamonds',  
    '6_diamonds',  
    '7_diamonds',  
    '8_diamonds',  
    '9_diamonds',  
    '10_diamonds',  
    '11_diamonds',  
    '12_diamonds',  
    '13_diamonds',  
]



export async function GET() {
	const shuffledArr = shuffle(arr)
	return json(shuffledArr.slice(-13));
}
