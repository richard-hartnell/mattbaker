const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSk0TXnFkfUp5eu3HR6vAQVnyoT4LC2GtXr3zuiW0S6R2X4o7XRtXNlJOEeAQMkA5h3DljXEjAn5biQ/pub?output=csv';
let artists = [];
let counter = 0;
let lazy = false;
let allShows = [];
let showSection = '';

function addArtist(show, lazy) {
    let showName = show[0];
    let showWeekday = show[1];
    let showTime = show[2];
    let showDate = show[3];
    let showDesc = show[4];
    let showImage = show[5];
    let showAltText = show[6];
    let lazyTag = '';
    if (lazy) {
        lazyTag = 'loading="lazy"';
    }
    let showTemplate = `
        <div class="artist">
            <h4>${artistName}</h4>
            ${artistByline}
            <p><span class="image ${side}"><img src="images/${artistImage}" alt="" /></span>${artistBio}</p>
        </div>
    `;
    allShows.push(showTemplate);
}

function fetchArtistSheet(url) {
    fetch(url)
    .then(response => response.text())
    .then(data => {
        Papa.parse(data, {
            complete: function(results) {
                artists = results.data;
                for (let artist of artists) {
                    if (counter > 3 && !lazy) {
                        lazy = true;
                    }
                    if (artist[7] && artist[7].trim() === 'TRUE') {
                        addShow(artist, lazy);
                    }
                    counter++;
                }

                artistsSection = `
                <h1>HEADLINE?</h1>
                ${allShows.join('\n')}
                `;

                document.getElementById('music-wrapper').innerHTML = artistsSection;
            }
        });
    })
    .catch(error => console.error('Error fetching the Google Sheet:', error));
}

fetchArtistSheet(url);