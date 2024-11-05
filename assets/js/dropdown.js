const dropdown = document.getElementById("dropdown");
const inside = document.getElementById("dropdown-inner");
dropdown.style.height = '0px';

function dropIt(artist) {
    window.scrollTo(0, 0);
    inside.innerHTML = createDropdownHTML(artist);
    if (dropdown.style.height == '0px') {
        let dropdownArtist = artists.find(artists => artists[0] == artist);
        dropdown.style.transition = '0.75s';
        dropdown.style.height = '75vh';
        // dropdown.style.bottom = '30%';
        dropdown.style.bottom = '-98%';
    }
}

function collapseIt() {
    if (dropdown.style.height != '0px') {
        dropdown.style.height = '0px';
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