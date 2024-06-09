const selectTag = document.querySelectorAll('select');

selectTag.forEach((tag, id) => {
    for(let countryCode in countries){
        let currSelect;
        if(id === 0){
            currSelect = (countryCode === 'en') ? "currSelect" : "";
        }else{
            currSelect = (countryCode === 'es') ? "currSelect" : "";
        }

        let option = `<option ${currSelect} value="${countryCode}"> ${countries[countryCode]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

document.getElementById('translateBtn').addEventListener('click', function(){
    const text = document.getElementById('input').value;
    const translateFrom = document.getElementById('translateFrom').value;
    const translateTo = document.getElementById('translateTo').value;
    translateText(text, translateFrom, translateTo);
})

function translateText(text, translateFrom, translateTo){
    const api = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${translateFrom}|${translateTo}`;

    fetch(api).then(Response => Response.json()).then(data => {
        if(data.responseData){
            const translatedText = data.responseData.translatedText;
            const formattedtext = removeQuestionMarks(translatedText);
            document.getElementById('output').innerText = formattedtext;
        }else{
            outputText = "error in translating!";
        }
    }).catch(error => {
        console.log("Error : ", error);
        outputText = "Error occurred while Translating";
    });
}


function removeQuestionMarks(inputText) {
    return inputText.replace(/\?/g, '');
}


function speakText(text) {
    const speechSynthesis = window.speechSynthesis;
    const speechUtterance = new SpeechSynthesisUtterance(text);
    speechUtterance.lang = document.getElementById('translateTo').value;
    speechSynthesis.speak(speechUtterance);
}

document.getElementById('speakBtn').addEventListener('click', () => {
    const translatedText = document.getElementById('output').innerText;
    speakText(translatedText);
})
