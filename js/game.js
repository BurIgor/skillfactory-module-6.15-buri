const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let missed = 0;

let oldDiv = "";

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый  >>>done!

  if(oldDiv.length > 0)
    $(oldDiv).removeClass("target");

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  oldDiv = divSelector;
  // TODO: помечать target текущим номером   >>>done!
  $(divSelector).text(hits + 1);

  // FIXME: тут надо определять при первом клике firstHitTime   >>>done!

  if(firstHitTime == 0)
    firstHitTime = getTimestamp();

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала    >>>done!
  $(".row").empty();

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#total-missed").text(missed);
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?    >>>done!
  if ($(event.target).hasClass("target")) {
    $(".game-field").removeClass('miss');
    if(oldDiv.length > 0)
      $(oldDiv).text("");
    hits++;
    round();
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss   >>>done!
  else {
    missed++;
    $(event.target).addClass('miss');
  }
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  //       Не... С этим заказчику придется подождать ((
  round();

  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
