const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSk0TXnFkfUp5eu3HR6vAQVnyoT4LC2GtXr3zuiW0S6R2X4o7XRtXNlJOEeAQMkA5h3DljXEjAn5biQ/pub?output=csv';
let artists = [];
let counter = [0,0];
let artistsLeft = [];
let artistsRight = [];
let artistSection = '';
let side = '';

function addArtist(artist, side, column) {
    let artistName = artist[0];
    let artistByline = artist[1];
    let artistCategory = artist[2];
    let artistBio;
    let artistImage = artist[3];
    let altText = artist[4];
    let artistTemplate = `
        <div class="artist">
            <h4>${artistName}</h4>
            <p><span class="image ${side}"><img src="../images/${artistImage}" alt="${altText}" /></span>${artistByline}</p><br><br>
        </div>
    `;
    if (column == 'left') {
        artistsLeft.push(artistTemplate)
    } else {
        artistsRight.push(artistTemplate)
    }
}

function fetchArtistSheet(url) {
    fetch(url)
    .then(response => response.text())
    .then(data => {
        Papa.parse(data, {
            complete: function(results) {
                artists = results.data;
                let column;
                for (let artist of artists) {
                    if (artist[0] != "ARTIST") {
                        if (counter[1] >= counter[0]) {
                            column = 'left';
                            if (counter[0] % 2 != 0) {
                                side = 'left';
                                counter[0]++;
                            } else {
                                side = 'right';
                                counter[0]++;
                            }
                        } else {
                            column = 'right';
                            if (counter[1] % 2 != 0) {
                                side = 'left';
                                counter[1]++;
                            } else {
                                side = 'right';
                                counter[1]++;
                            }
                        }
                        if (artist) { // [7] && artist[7].trim() === 'TRUE'
                            // add coniditional here for category check if in a subcat
                            addArtist(artist, side, column);
                        }
                    }
                }

                let artistsSection = `
                    <div class="col-6 col-12-medium"  id="artist-column-one">
                        ${artistsLeft}
                    </div>
                    <div class="col-6 col-12-medium" id="artist-column-two">
                        ${artistsRight}
                    </div>
                </div>
                `;

                document.getElementById('artistsSection').innerHTML = artistsSection;
            }
        });
    })
    .catch(error => console.error('Error fetching the Google Sheet:', error));
}

fetchArtistSheet(url);

// artist-column-one
// artist-column-two