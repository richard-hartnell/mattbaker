const dropdown = document.getElementById("dropdown");
const inside = document.getElementById("dropdown-inner");
dropdown.style.height = '0px';

innerTemplate = `
<div class="withdraw-bar" style="width: 100%; background-color: blue; color: white; 
<div class="row col-6 col-12" style="left: 0px; margin: 0; align-items: normal">
    <div><img id="dropdownArtistImage" src="./images/pic01.jpg"></div>
    <div id="artistDropdownInfo">
        <h1>Artist Name</h1>
        <h2>Artist Byline<br></h2><br>
        <p>Lorem ipsum<br><br></p>
        <p>Paragraph 2<br><br></p>										
        <p>Paragraph 3<br><br></p>
        <p>Paragraph 4</p>
    </div>
    <div>VIDEO HERE</a>
</div>    
`

function dropIt(artist) {
    inside.innerHTML = createDropdownHTML(artist);
    if (dropdown.style.height != '0px') {
        dropdown.style.height = '0px';
        return false;
    } else if (dropdown.style.height == '0px') {
    let dropdownArtist = artists.find(artists => artists[0] == artist);
    dropdown.style.transition = '0.75s';
    dropdown.style.height = '75vh';
    // dropdown.style.bottom = '30%';
    dropdown.style.bottom = '-98%';
    }
}

function createBio(artist) {
    let dropdownArtist = artists.find(artists => artists[0] == artist);
    let counter = 6;
    let bio = "";
    while (true) {
        if (dropdownArtist[counter] == undefined) {
            return bio;
        }
        let section = dropdownArtist[counter];
        bio += "<p>" + section + "<br><br></p>";
        counter += 1;
    }
    return bio;
}

function createDropdownHTML(artist) {
    let dropdownArtist = artists.find(artists => artists[0] == artist);
    let artistName = dropdownArtist[0];
    let artistByline = dropdownArtist[1];
    let artistImage = dropdownArtist[3];
    let altText = dropdownArtist[4];
    let artistVideo = dropdownArtist[5];
    let artistBio = createBio(artist);
    let innerCode = `
    <div class="row col-6 col-12" style="left: 0px; margin: 0; align-items: normal">
        <div><img class="dropdownArtistImage" src="assets/images/${artistImage}" alt="${altText}"></div>
        <div id="artistDropdownInfo">
            <h1>${artistName}</h1>
            <h2>${artistByline}</h2><br>
            ${artistBio}
        </div>
    </div>    
    `
    return innerCode;
}

function pullTopBar() {
    console.log('pullTopBar');
    if (mainText.innerHTML == defaultText) {
        // console.log('defaultText');
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