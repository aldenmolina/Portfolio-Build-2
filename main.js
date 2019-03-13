const track = document.querySelector('.carousel-track')
const cards = Array.from(track.children);
const nextButton = document.querySelector('.carousel-button-right');
const previousButton = document.querySelector('.carousel-button-left');
const dotNav = document.querySelector('.carousel-nav');
const dots = Array.from(dotNav.children);
const cardWidth = cards[0].getBoundingClientRect().width;

//arrange cards next to one another
const setCardPosition = (card, index) => {
  card.style.left = cardWidth * index + "px";
};
cards.forEach(setCardPosition);

const moveToCard = (track, currentCard, targetCard) => {
  track.style.transform = 'translateX(-' + targetCard.style.left + ')';
  currentCard.classList.remove('current-card');
  targetCard.classList.add('current-card');
}

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current-card');
  targetDot.classList.add('current-card');
}

const hideShowArrows = (cards, previousButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    previousButton.classList.add('is-hidden');
    nextButton.classList.remove('is-hidden');
  } else if (targetIndex === cards.length - 1){
    previousButton.classList.remove('is-hidden');
    nextButton.classList.add('is-hidden');
  } else {
    previousButton.classList.remove('is-hidden');
    nextButton.classList.remove('is-hidden');
  }
};

//when i click left, card moves left.
previousButton.addEventListener('click', e => {
  const currentCard = track.querySelector('.current-card');
  const previousCard = currentCard.previousElementSibling;
  const currentDot = dotNav.querySelector('.current-card');
  const previousDot = currentDot.previousElementSibling;
  const previousIndex = cards.findIndex(card => card === previousCard);
  moveToCard(track, currentCard, previousCard);
  updateDots(currentDot, previousDot);
  hideShowArrows(cards, previousButton, nextButton, previousIndex);
})

//when i click right, card moves right.
nextButton.addEventListener('click', e => {
  const currentCard = track.querySelector('.current-card');
  const nextCard = currentCard.nextElementSibling;
  const currentDot = dotNav.querySelector('.current-card');
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = cards.findIndex(card => card === nextCard);
  moveToCard(track, currentCard, nextCard);
  updateDots(currentDot, nextDot);  
  hideShowArrows(cards, previousButton, nextButton, nextIndex);
})

//when i click nav indicators, move to that slide.
dotNav.addEventListener('click', e => {
  //what indicator was clicked on?
  const targetDot = e.target.closest('button');

  if (!targetDot) return;

  const currentCard = track.querySelector('.current-card');
  const currentDot = dotNav.querySelector('.current-card');
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  const targetCard = cards[targetIndex];
  
  moveToCard(track, currentCard, targetCard);
  updateDots(currentDot, targetDot);
  hideShowArrows(cards, previousButton, nextButton, targetIndex);
})