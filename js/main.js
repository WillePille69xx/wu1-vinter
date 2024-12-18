/* Om du vill ändra snöfärgen */
const color = [255, 255, 255];
/* justera hur snabbt snön faller */
const speed = 5;

/* Ändra här nedanför på egen risk */

const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const canvas = document.createElement("canvas");
canvas.setAttribute("id", "bg");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");
const pi2 = 2 * Math.PI;

const bodyElement = document.querySelector("body");
bodyElement.appendChild(canvas);

let particles = [];

window.onresize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

window.onscroll = () => {
  canvas.setAttribute("style", `top: ${window.scrollY}px`);
};

const spawnParticles = (amount) => {
  for (let i = 0; i < amount; i++) {
    particles.push(new Particle(randomInt(0, canvas.width), 0, color));
  }
};

const step = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle) => {
    particle.draw();
    particle.update();
  });

  particles = particles.filter((particle) => !particle.toDelete);

  if (particles.length < 400) {
    spawnParticles(3);
  }

  window.requestAnimationFrame(step);
};

window.requestAnimationFrame(step);

/* Ladda in text från URL-parametrar */
const getQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  const title = params.get('title');
  const message = params.get('message');
  return { title, message };
};

const { title, message } = getQueryParams();
console.log(`Title: ${title}, Message: ${message}`);

if (title || message) {
  const titleElement = document.querySelector("#title");
  if (titleElement) titleElement.textContent = title;
  const messageElement = document.querySelector("#message");
  if (messageElement) messageElement.textContent = message;
}

// Select the existing audio player and track display
const audioPlayer = document.getElementById("audioPlayer");
const trackDisplay = document.getElementById("currentTrack");

// List of songs for the playlist
const playlist = [
  "audio/it-s-that-time-of-year-pecan-pie-main-version-6006-02-21.mp3", 
  "audio/christmas-rap-kevin-macleod-main-version-9983-03-06.mp3"
];

let currentTrackIndex = 0;

// Function to update the track display
const updateTrackDisplay = () => {
  const currentTrack = playlist[currentTrackIndex].split("/").pop(); // Extract filename
  trackDisplay.textContent = `Now Playing: ${currentTrack}`;
};

// Function to play the next track
const playNextTrack = () => {
  currentTrackIndex++;
  if (currentTrackIndex < playlist.length) {
    audioPlayer.src = playlist[currentTrackIndex];
    audioPlayer.play();
  } else {
    console.log("Playlist ended");
  }
  updateTrackDisplay();
};

// Initialize the audio player with the first track
audioPlayer.src = playlist[currentTrackIndex];
updateTrackDisplay();

// Play the next song when the current one ends
audioPlayer.addEventListener("ended", playNextTrack);

// Optional: Automatically start playing (if browser policy allows)
audioPlayer.play().catch((error) => {
  console.log("Autoplay failed:", error.message);
});
