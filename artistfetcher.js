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
    let artistBio = artist[3];
    let artistImage = artist[4];
    let altText = artist[5];
    let artistTemplate = `
        <div class="artist">
            <h4>${artistName}</h4>
            ${artistByline}
            <p><span class="image ${side}"><img src="../images/${artistImage}" alt="${altText}" /></span>${artistBio}</p>
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
                        } else {
                            side = 'right';
                        }
                    }
                    if (artist) { // [7] && artist[7].trim() === 'TRUE'
                        addArtist(artist, side, column);
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
    .catch(error => console.error('Error fetching the Google Shefetet:', error));
}

fetchArtistSheet(url);

// artist-column-one
// artist-column-two