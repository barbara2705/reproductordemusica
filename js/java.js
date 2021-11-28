let list_songs = document.getElementById("list-song-container");
let cover_image = document.getElementById("cover-image");
let title_song = document.getElementById("title-song");
let artist_song = document.getElementById("artist-song");
let audio = document.getElementById("audio-playing");
let progress_bar = document.getElementById("progress-bar");
let volumen = document.getElementById('volume-control')
volumen.value  = 1
let song_selected = {};
let is_playing = false;
setTimeout(()=>{
    progress_bar.setAttribute('max',audio.duration)
},500)

progress_bar.value = 0;
progress_bar.addEventListener('change',()=>{
    audio.currentTime = progress_bar.value;
})
audio.addEventListener('ended',()=>{
    if(pos==canciones.length-1)
    {
        pauseSong()
    }
    else{
        progress_bar.value=0;
        if(pos<canciones.length-1)
        {   pos++;
            play_song(pos)
        }
    }
})
let canciones = [
  {
    id: 1,
    caratula: "imagenes/amapolas.jpg",
    cancion: "audios/Leo Rizzi - Amapolas (Vídeo Oficial)_160k.mp3",
    genero: 'pop',
    artista: "Leo Rizzi",
    titulo: "AMAPOLAS",
  },
  {
    id: 2,
    caratula: "imagenes/spirits.jpg",
    cancion: "audios/X2Download.com - The Strumbellas - Spirits (128 kbps).mp3",
    artista: "The Strumbellas",
    genero: "indie rock",
    titulo: "SPIRITS",
  },
  {
    id: 3,
    caratula: "imagenes/hombres.jpg",
    cancion: "audios/X2Download.com - Devuélveme a mi chica (128 kbps).mp3",
    genero: "pop",
    artista: "Hombres G",
    titulo: "DEVUELVEME A MI CHICA",
  },
  {
    id: 4,
    caratula: "imagenes/princesa.jpg",
    cancion: "audios/X2Download.com - CARYS - Princesses Don't Cry - Official Music Video (128 kbps).mp3",
    genero: "rock",
    artista: "Aviva Mongillo",
    titulo: "PRINCESSES DON'T CRY",
  },
];

const BuildList = (canciones) => {
  list_songs.innerHTML = "";
  canciones.forEach((e) => {
    list_songs.insertAdjacentHTML(
      "beforeend",
      `
       <article class="list-item" id="item-${e.id}">
          <img src="${e.caratula}" alt="" />
          <div class="data-song-container">
            <h2>${e.titulo}</h2>
            <div class="artist-name">${e.artista}</div>
          </div>
        </article>
    `
    );
  });
};

const select_song = (id) => {
  let res = canciones.find((e) => e.id == id);
  if (res) {
    cover_image.src = res.caratula;
    title_song.innerHTML = res.titulo;
    artist_song.innerHTML = res.artista;
    audio.src = res.cancion;
    play_song();
  }
};

const pause_effects = () => {
  play_btn.innerHTML = "▷";
  cover_image.style.animationPlayState = "paused";
};

const play_effects = () => {
  play_btn.innerHTML = "| |";
  cover_image.style.animationPlayState = "running";
};

const play_song = () => {
  progress_bar.value = audio.currentTime;
  audio.play();
  play_effects();
};

let id_aux = 1;

const next_song = () => {
  if (id_aux < canciones.length) {
    select_song(++id_aux);
  }
};
const prev_song = () => {
  if (id_aux > 0) {
    select_song(--id_aux);
  }
};
const first_song = () => {
  cover_image.src = canciones[0].caratula;
  title_song.innerHTML = canciones[0].titulo;
  artist_song.innerHTML = canciones[0].artista;
  audio.src = canciones[0].cancion;
};
volumen.addEventListener('change',()=>{
  audio.volume = volumen.value;
})
let vol = 1;
addEventListener('keydown',(event)=>{
  
  if(event.key === 'ArrowUp'&&vol<1)
  {
      try{
          vol = vol + 0.01;
          audio.volume = vol
          volumen.value = audio.volume;
      }catch(error)
      {
          console.log(error)
      }
  }
  if(event.key === 'ArrowDown'&&vol>0)
  {
      try {
          vol = vol - 0.01;
          audio.volume = vol
          volumen.value = audio.volume;
          
      } catch (error) {
          console.log(error)
      }
      
  }
})
/*EVENTOS */
let play_btn = document.getElementById("play-btn");
let next_btn = document.getElementById("next-btn");
let prev_btn = document.getElementById("prev-btn");
let repetir = document.getElementById("repetir")

play_btn.addEventListener("click", () => {
  if (is_playing) {
    audio.pause();
    pause_effects();
    is_playing = false;
  } else {
    audio.play();
    play_effects();
    is_playing = true;
  }
});
repetir.addEventListener("click", () =>{
  audio.play();
  audio.currentTime=0;
  play_btn.innerHTML= "| |";
  cover_image.style.animationPlayState= "running";


});

window.addEventListener("load", () => {
  first_song();
  progress_bar.value = 0;
  progress_bar.max = audio.duration;

  window.setInterval(() => {
    progress_bar.value = audio.currentTime;
  }, 1000);
  progress_bar.addEventListener("change", () => {
    audio.currentTime = progress_bar.value;
  });

  next_btn.addEventListener("click", () => {
    next_song();
  });
  prev_btn.addEventListener("click", () => {
    prev_song();
  });
  list_songs.addEventListener("click", (event) => {
    if (event.target.matches("imagenes")) {
      select_song(event.target.parentElement.id.slice(5, 6));
    } else if (event.target.matches(".data-song-container")) {
      console.log(event.target.parentElement.id.slice(5, 6));
    } else if (event.target.matches(".artist-name")) {
      select_song(event.target.parentElement.parentElement.id.slice(5, 6));
    } else if (event.target.matches("h2")) {
      select_song(event.target.parentElement.parentElement.id.slice(5, 6));
    } else if (event.target.matches(".list-item")) {
      select_song(event.target.id.slice(5, 6));
    }
  });
audio.addEventListener("ended", () => {
  next_song();
});
});

BuildList(canciones);

let filtrar_genero = document.getElementById('filter-genere')

filtrar_genero.addEventListener('change',(event)=>{
    
    if(filtrar_genero.value === 'all')
    {
        BuildList(canciones)
    }
    else{
        let filtrado = canciones.filter(el => el.genero === filtrar_genero.value)
        BuildList(filtrado);
      }

})

let buscar = document.getElementById("buscar");

buscar.addEventListener("keyup", () => {
  let res = canciones.filter((e) =>
    e.titulo.toLowerCase().includes(buscar.value.toLowerCase())
  );
  if (res) {
    BuildList(res);
  }
});