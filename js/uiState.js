
const UI_STATE_GAME_TO_START = 0;
const UI_STATE_PLAYING = 1;
const UI_STATE_PAUSE = 2;
const UI_STATE_CANCELED = 3;
const UI_STATE_END_OF_GAME = 4;
const UI_STATES_COUNT = 5;

const UI_OP_PLAY = 0;
const UI_OP_PAUSE = 1;
const UI_OP_RESUME = 2;
const UI_OP_CANCEL = 3;
const UI_OP_ENDED = 4;
const UI_OP_COUNT = 5;

const uiTransitionsTable = [[UI_STATE_PLAYING, UI_STATE_GAME_TO_START, UI_STATE_GAME_TO_START, UI_STATE_GAME_TO_START, UI_STATE_GAME_TO_START],
  [UI_STATE_PLAYING, UI_STATE_PAUSE, UI_STATE_PLAYING, UI_STATE_CANCELED, UI_STATE_END_OF_GAME],
  [UI_STATE_PLAYING, UI_OP_PAUSE, UI_STATE_PLAYING, UI_STATE_CANCELED, UI_STATE_PAUSE],
  [UI_STATE_PLAYING, UI_STATE_CANCELED, UI_STATE_CANCELED, UI_STATE_CANCELED, UI_STATE_CANCELED],
  [UI_STATE_PLAYING, UI_STATE_END_OF_GAME, UI_STATE_END_OF_GAME, UI_STATE_END_OF_GAME, UI_STATE_END_OF_GAME]];

function getNextState(currState, operation) {
  if (currState < UI_STATE_GAME_TO_START || currState >= UI_STATES_COUNT) {
    throw "Invalid UI state.";
  } else if (operation < UI_OP_PLAY || operation >= UI_OP_COUNT) {
    throw "Invalid UI operation.";
  }

  return (uiTransitionsTable[currState])[operation];
}

function isElementInViewport(parent, elem) {
  let rv = true;

  let elemRect = elem.getBoundingClientRect();
  let parentRect = parent.getBoundingClientRect();

  rv = elemRect.top >= parentRect.top &&
    elemRect.left >= parentRect.left &&
    elemRect.bottom <= parentRect.bottom &&
    elemRect.right <= parentRect.right;

  return rv;
}