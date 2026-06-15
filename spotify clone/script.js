console.log("Spotify Clone Started");

// Current song ko control karne ke liye Audio object banaya
let currentsong = new Audio();


// Songs folder se saare mp3 songs fetch karne ke liye function
async function getsongs() {

    let a = await fetch("http://127.0.0.1:5500/songs/");
    let response = await a.text();

    let div = document.createElement("div");
    div.innerHTML = response;

    let as = div.getElementsByTagName("a");

    let songs = [];

    for (let i = 0; i < as.length; i++) {

        const element = as[i];

        // Sirf mp3 files ko songs array me store karna
        if (element.href.endsWith(".mp3")) {

            songs.push(
                decodeURIComponent(
                    element.href.split("/songs/")[1]
                )
            );

        }
    }

    return songs;
}


// Kisi song ko play karne ke liye function
const playmusic = (track) => {

    currentsong.src =
        "http://127.0.0.1:5500/songs/" + track;

    currentsong.play();

    // Current song ka naam UI me dikhana
    document.querySelector(".songinfo").innerHTML =
        track;

    // Play button ko pause icon me badalna
    play.src = "pause.svg";
}


// Main function jaha se pura application start hota hai
async function main() {

    // Songs folder se saare songs lana
    let songs = await getsongs();

    console.log(songs);

    // Playlist ka ul select karna
    let songul =
        document.querySelector(".songlist ul");

    songul.innerHTML = "";

    // Har song ko playlist me dikhana
    for (const song of songs) {

        songul.innerHTML += `

        <li>

            <img src="music.svg"
                 class="invert"
                 width="25">

            <div class="info">

                <div>${song}</div>

                <div>Sahil</div>

            </div>

            <div class="playnow">

                <span>Play Now</span>

                <img src="play.svg"
                     class="invert"
                     width="20">

            </div>

        </li>

        `;
    }


    // Har song par click event lagana
    Array.from(
        document.querySelectorAll(".songlist li")
    ).forEach(e => {

        e.addEventListener("click", () => {

            let track =
                e.querySelector(".info")
                 .firstElementChild
                 .innerHTML;

            playmusic(track);

        });

    });


    // Play/Pause button ko control karne ke liye event listener
    play.addEventListener("click", () => {

        if (currentsong.paused) {

            currentsong.play();

            play.src = "pause.svg";

        }

        else {

            currentsong.pause();

            play.src = "play.svg";

        }

    });


    // Song ke current time aur duration ko update karne ke liye
    currentsong.addEventListener(
        "timeupdate",
        () => {

            let current =
                Math.floor(
                    currentsong.currentTime
                );

            let duration =
                Math.floor(
                    currentsong.duration
                );

            document.querySelector(
                ".songtime"
            ).innerHTML =
                current +
                " / " +
                duration;

        }
    );

}


// Pura application start karne ke liye main function call kiya
main();