const dropdown = document.getElementById("dropdown");

function dropIt(artist) {
    
}

function pullTopBar() {
    console.log('pullTopBar');
    if (mainText.innerHTML == defaultText) {
        console.log('defaultText');
    }
    dropdown.style.transition = '0.75s';
    dropdown.style.height = '75%';
    dropdown.style.bottom = '30%';
    dropdown.style.bottom = '-98%';
    surprise.style.transition = '0.75s';
    surprise.style.bottom = '30%';
    surprisetop.style.height = '100%';
    surprise.style.position = 'fixed';
    // mainText.innerHTML = "";
}