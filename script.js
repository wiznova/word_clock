// CONSTANTS
const hours = [
    "twelve", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven"
]
const minutes = [
    "half", "five", "ten", "a quarter", "twenty", "twenty five",
]
const words = [
    "IT", "l", "IS", "as", "AM", "PM",
    "A", "c", "QUARTER", "dc", 
    "TWENTY", "FIVE", "x",
    "HALF", "s", "TEN", "f", "TO",
    "PAST", "eru", "NINE",
    "ONE", "SIX", "THREE",
    "FOUR", "FIVE", "TWO",
    "EIGTH", "ELEVEN", 
    "SEVEN", "TWELVE",
    "TEN", "se", "OCLOCK",
]

let watchFace = document.getElementsByClassName("watchface-container")[0]
let isMinutes = true;

for (let k = 0; k < words.length; k++){
    let w = words[k];
    if (w === "TO")
        isMinutes = false;

    for (let j = 0; j < w.length; j++){
        let l = w[j];
        let classes = [];
        let newLetter = document.createElement("div");

        newLetter.innerText = l.toUpperCase();
        classes.push("letter")
        if (l === l.toUpperCase())
            classes.push(w.toLowerCase());
        if (isMinutes)
            classes.push("minutes");

        newLetter.classList = classes.join(" ");
        watchFace.appendChild(newLetter);
    }
}

function clearStyles(){
    let letters = document.getElementsByClassName("letter");
    for (let el of letters) {
        if (el.classList.value.includes("current")){
            el.classList.remove("current");
        }
    }

}

function displayFromList(wordList) {
    let isMinutes = true;

    clearStyles();
    wordList.forEach(el => {
        let w = document.getElementsByClassName(el);
        if (el === "to" || el === "past" || el === "oclock")
            isMinutes = false;

        for (let l of w){
            if (isMinutes){
                if (l.classList.value.includes("minutes"))
                    l.classList.add('current');
            } else {
                if (!l.classList.value.includes("minutes"))
                    l.classList.add('current');
            }
        }
    });
}

function currentTimeToString(now = new Date()){
    let ret = "it is ";

    let h = now.getHours();
    let hRem = h % 12;
    let m = Math.round(now.getMinutes() / 5);
    let mRem = m % 6;
    
    let past = m <= 6 ? true : false;
    let pastto = past ? " past " : " to ";
    let ampm = h >= 12 ? "pm " : "am ";
    
    if (h === 11 && hRem === 0) // 23:55 --> five to twelve PM
        ampm = "pm ";           // 11:55 --> five to twelve AM
    if (h === 23 && hRem === 0)
        ampm = "am ";
    ret += ampm;

    if (m > 6)
        mRem = (30 - m) % 6;
    if (!past)
        hRem = (h + 1) % 12;
    if (mRem === 0 && m !== 6){
        ret += "oclock " + hours[hRem];
        return ret;
    }

    ret += minutes[mRem];
    ret += pastto;
    ret += hours[hRem];
    

    console.log(ret);
    return ret;
}

        

let strDate = currentTimeToString();
displayFromList(strDate.split(' '));
setInterval(_ => { 
    let newStrDate = currentTimeToString();
    if (strDate !== newStrDate){
        strDate = newStrDate;
        displayFromList(strDate.split(' ')); 
    }
}, 1000 * 60 * 3);

// function testTimeToString(){
//     // Logs all possible strings in 24h period to console;
//
//     let ms = 1601900775251;
//     for (let i = 0; i < 24 * 60 * 60 * 1000; i += 1000 * 60){
//         let dt = new Date(ms + i);
//         console.log(dt.toString().split(" ").slice(4, 5)[0], currentTimeToString(dt));
//     }
// }
