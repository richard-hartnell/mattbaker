const dropdown = document.getElementById("dropdown");
const inside = document.getElementById("dropdown-inner");


function dropIt(artist) {
    if (dropdown.style.height == '75vh') {
        dropdown.style.height = '0px';
        return false;
    } else if (dropdown.style.height == '0px') {
    let dropdownArtist = artists.find(artists => artists[0] == artist);
    console.log(dropdownArtist);
    console.log(dropdownArtist[5]);
    inside.innerHTML = dropdownArtist[5];
    dropdown.style.transition = '0.75s';
    dropdown.style.height = '75vh';
    // dropdown.style.bottom = '30%';
    dropdown.style.bottom = '-98%';
    }
    
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