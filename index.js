const words = ["London","NewYork","Paris","Berlin", "NewDelhi" , "Seol", "Tokyo","Beijing","AbuDhabi","Dubai", "Kabul"];
let wordd = "";
let dashes = [];
let noOfErrors = 0;
document.getElementById("nw").addEventListener("click",onButtonClick);

function whatIsWord(){
    console.log(wordd);
}

function whatIsDashes(){
    console.log(dashes.join(""));
}

function enableAllButtons(){
    for(let i = 0 ; i< 26; i++){
        let btn = document.querySelectorAll("button.alph")[i];
        btn.disabled = false;
    }
}

function resetEverything(){
    document.getElementById("correctWord").innerHTML = "The word goes here";
    wordd = "";
    enableAllButtons();
}

function generateRandomWord(){
    let wrd = words[Math.floor(Math.random() * words.length)];
    console.log(wrd);
    wordd = wrd.toUpperCase();
    

    let lengthOfGeneratedWord = wrd.length;

    console.log(lengthOfGeneratedWord);

    dashes = [];

    for(let i = 0; i< lengthOfGeneratedWord; i++){
        dashes[i] = "_";
    }
    document.getElementById("correctWord").innerHTML = dashes.join(" ") ;
}


function replaceDasheshByLetter(arrOfDashesh,word,letter,index){
    if(word.indexOf(letter, index) != -1){
        let nindex = word.indexOf(letter, index)+1;
        arrOfDashesh[nindex-1] = letter;
        //document.getElementById("correctWord").innerHTML = dashes.join(" ") ;

        replaceDasheshByLetter(arrOfDashesh,word,letter,nindex);

    }else if(word.indexOf(letter, index) == word.length || word.indexOf(letter, index) == -1){
        if(index == 0){
            console.log("word not found");
            noOfErrors++;
            if(noOfErrors >= 6){
                alert("You lost the game :(");
                resetEverything();
            }
        }
        return -1;
    }
}

function onButtonClick(){
    generateRandomWord();
    enableAllButtons();
}




for(let i = 0 ; i< 26; i++){

    document.querySelectorAll("button.alph")[i].addEventListener("click",function(){

        if(wordd == ""){
            alert("Please generate word first");
        }else{
            let letter = this.innerHTML;
            // console.log(wordd);
            this.disabled = true;

            replaceDasheshByLetter(dashes, wordd, letter, 0);
            document.getElementById("correctWord").innerHTML = dashes.join(" ") ;
            if(dashes.join("") == wordd){
                alert("You've guessed it correct");
                resetEverything();
            }
        }

        

    });
}
