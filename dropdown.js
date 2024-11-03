const dropdown = document.getElementById("dropdown");
const inside = document.getElementById("dropdown-inner");
dropdown.style.height = '0px';

function dropIt(artist) {
    if (dropdown.style.height != '0px') {
        dropdown.style.height = '0px';
        return false;
    } else if (dropdown.style.height == '0px') {
    let dropdownArtist = artists.find(artists => artists[0] == artist);
    console.log(dropdownArtist);
    console.log(dropdownArtist[5]);
    // inside.innerHTML = dropdownArtist[5];
    dropdown.style.transition = '0.75s';
    dropdown.style.height = '75vh';
    // dropdown.style.bottom = '30%';
    dropdown.style.bottom = '-98%';
    }
    
}

function createBio(artist) {
    let counter = 6;
    let bio = "";
    if (artist[counter] != "") {
        bio += `${artist[counter]}<br><br>`;
        counter++;
    } else {
        return bio;
    }
}

function createDropdownHTML(artist) {
    let artistName = artist[0];
    let artistByline = artist[1];
    let artistImage = artist[3];
    let altText = artist[4];
    let artistVideo = artist[5];
    let artistBio = createBio(artist);

    let template = `
        <h1>${artistName}</h1>
        <h2>${artistByline}</h2>
        `
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