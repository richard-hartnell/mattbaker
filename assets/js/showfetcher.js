// const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRsA8WweuIqAmaLf9oY38_ezsd_LCOrgTrGEh7eXQBy91d2xwD-NqBlFdc6GvBkay8ZgRCWbwzjHAZM/pub?output=csv';
const url = 'https://docs.google.com/spreadsheets/d/1tFTQRY0HDTZCMGWQy0helNDCgRiW73HlDQtfo9FKldg/pub?output=csv';
let rows = [];
let counter = 0;
let lazy = false;
let allArtists = [];
let artistTemplate = '';

function addArtist(artist) {
    let artistName = artist[0];
    let artistByline = artist[1];
    let artistCategory = artist[2];
    let artistDesc = artist[3];
    let artistImage = artist[5];
    let artistAltText = artist[6];
    let lazyTag = '';
    if (lazy) {
        lazyTag = 'loading="lazy"';
    }
    let artistTemplate = `
        <figure class="artist">
            <img class="artist-pic" src="/images/music/${artistImage}" alt="${artistAltText}" />
            <figcaption class="artist-info">
                <section class="music-bio">
                    <h2>${artistName}</h2>
                    <h6>${artistDesc}</h6>
                </section>
                <section class="artisttime">
                    <h6>${artistWeekday}, ${artistDate}<br>${artistTime}</h6>
                </section>
            </figcaption>
        </figure>
    `;
    allArtists.push(artistTemplate);
}

function fetchArtistSheet(url) {
    fetch(url)
    .then(response => response.text())
    .then(data => {
        Papa.parse(data, {
            complete: function(results) {
                rows = results.data;
                for (let artist of rows) {
                    if (counter > 3 && !lazy) {
                        lazy = true;
                    }
                    if (artist[7] && artist[7].trim() === 'TRUE') {
                        addArtist(artist, lazy);
                    }
                    counter++;
                }

                artistSection = `
                <h1>MUSIC</h1>
                ${allArtists.join('\n')}

                `;

                document.getElementById('music-wrapper').innerHTML = artistSection;
            }
        });
    })
    .catch(error => console.error('Error fetching the Google Sheet:', error));
}

fetchArtistSheet(url);