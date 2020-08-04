const container = document.querySelector('.container');
// puts all seat classes an a array known as nodeList
const seats = document.querySelectorAll('.row .seat:not(occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

// + makes string into a number
let ticketPrice = +movieSelect.value;

// Save selected moive index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// update total and count
function updateSelectedCount() {
  // put all seats that are selected into a nodelist which is an array
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // copying orginal array of selectedSeats into seatsIndex with ... spread operator then map through it to return array of the index of the seats selected
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  // have to wrap seatsIndex in JSON .stringify cuz seatsIndex is an array
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localstorage and populate UI seats
function populateUI() {
  // JSON.parse will make string into an array again
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}
// movie selct event to change prices based on movie
movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', e => {
  // only logs when seats are clicked that are open
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    //   changes seat to selected color
    e.target.classList.toggle('selected');

    updateSelectedCount();
  }
});

// Initial count and total set
updateSelectedCount();
