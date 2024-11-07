document.addEventListener('DOMContentLoaded',function(){
const Words = ["Plain","Retro","Great","Vinyl","Video","Audio","Coded","Dream","Books","Digit"];//indexed 0-9
Chosen=Words[Math.floor(Math.random()*10)];//pick one of the words
ChosenA=Array.from(Chosen);//array for the word display
var r1=Math.floor(Math.random()*5);//index of revealed letters
var r2=Math.floor(Math.random()*5);
var gr=5;
while(r1==r2)
{
    r2=Math.floor(Math.random()*5);//incase r1=r2
}
var Blank ="_ ".repeat(5);
Blank=Array.from(Blank);
Blank[r1*2]=ChosenA[r1];
Blank[r2*2]=ChosenA[r2];// "_ " and the space is another index

Blank=Blank.join('');//because everything else i tried doesnt work :((((((((
document.getElementById("wordDisplay").innerHTML= Blank;//write as a string so there are no commas between the letters

document.getElementById("GuessesLeft").innerHTML= "Guesses Remaining: " + gr;

//line 16 prints the blank word//

//onto the game//

    document.getElementById("submitButton").addEventListener("click",function()
        {
            
            if(gr!==0)
            {
                var a=document.getElementById("inputLetter").value.toUpperCase();//match cases to test input
                if(a===Chosen.toUpperCase())
                {
                   document.getElementById("wordDisplay").innerHTML=Chosen;
                   document.getElementById("result").innerHTML="Congratulations! You guessed correctly!";
                   document.getElementById("submitButton").disabled=true;
                   popup("You won! Click OK to play again!");
                   
                }
                else
                {
                    document.getElementById("result").innerHTML="Wrong! Try again!";
                    gr--;
                    document.getElementById("GuessesLeft").innerHTML = "Guesses Remaining: "+ gr;
                }
            }
            else
            {
                document.getElementById("result").innerHTML="Game over! The word was: "+ Chosen;
                popup("Game over! The word was " + Chosen + ". Would you like to play again?");
            }


        })

        function popup(message)
        {
            let ok=window.confirm(message);//dushata mi ispadna :( WINDOW CONFIRM INSTEAD OF WINDOW ALERT
            if(ok)
            {
                location.reload();//reloads page
            }
        
        }
})
