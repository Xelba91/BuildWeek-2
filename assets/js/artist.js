const url = "https://striveschool-api.herokuapp.com/api/deezer/artist/";

// const artistId = new URLSearchParams(window.location.search).get("id");
const prova = "https://striveschool-api.herokuapp.com/api/deezer/artist/100/top?limit=50";
const artistId = new URLSearchParams(window.location.search).get("artistId");
console.log(artistId);

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const numeroCasuale = random(300, 400);

const sinistra = document.querySelector("#sinistra");
const destra = document.querySelector("#destra");
const imgArtist = document.querySelectorAll(".imgArtist");
const titleArtist = document.querySelectorAll(".titleArtist");
const numId = document.querySelectorAll(".numId");
const time = document.querySelectorAll(".time");

const lastCards = document.querySelectorAll(".lastCards");
const visualizza = document.querySelector(".visualizza");
const nonVisualizza = document.querySelector(".nonVisualizza");

const artFetch = (artistId) => {
  fetch(url + artistId, {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore!");
      }
    })
    .then((artist) => {
      console.log(artist);
      document.querySelector(".nomeArtista").innerText = artist.name;
      const heroDiv = document.querySelector(".heroDiv");
      heroDiv.style.backgroundImage = `url(${artist.picture_xl})`;
      // albumFetch(artist.tracklist);
      albumFetch(prova);
    })
    .catch((errore) => console.log(errore));
};

const albumFetch = (prova) => {
  fetch(prova, {
    method: "GET",
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore!");
      }
    })
    .then((data) => {
      const dataData = data.data;

      dataData.forEach((x, i) => {
        const album = x.album;

        imgArtist[i].src = album.cover;
        imgArtist[i].style.width = "50px";
        titleArtist[i].innerText = album.title;
        numId[i].innerText = album.id;
      });
    })
    .catch((errore) => console.log(errore));
};

const showCards = () => {
  lastCards.forEach((x) => {
    x.classList.remove("d-none");
  });

  visualizza.innerText = "Mostra meno";
  nonVisualizza.addEventListener("click", () => {
    removeCards();
    visualizza.addEventListener("click", () => {
      showCards();
    });
  });
};

const removeCards = () => {
  lastCards.forEach((x) => {
    x.classList.add("d-none");
  });

  nonVisualizza.innerText = "Visualizza altro";
};

window.onload = () => {
  artFetch(artistId);
  sinistra.addEventListener("click", () => {
    const changeId = Math.floor(Math.random() * 900);
    artFetch(changeId);
  });
  destra.addEventListener("click", () => {
    const changeId = Math.floor(Math.random() * 900);
    artFetch(changeId);
    console.log(destra);
  });

  visualizza.addEventListener("click", () => {
    showCards();
  });
};
