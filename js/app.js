window.onload = begin;

function begin() {
  var tweetArea = document.getElementById('tweet-area');
  var tweetBtn = document.getElementById('tweet-btn');
  var messages = document.getElementById('messages');
  var count = document.getElementById('count');
  var MAXCHARACTERS = 140;

  tweetBtn.addEventListener('click', message);
  tweetArea.addEventListener('keyup', changeText);

  function message(event) {
    event.preventDefault();

    if (tweetArea.value) {
      var div = document.createElement('div');
      var tweet = document.createElement('span');

      tweet.textContent = tweetArea.value;
      tweet.classList.add('tweet');

      div.classList.add('nuevo-mensaje');
      tweetArea.value = '';
      tweetArea.focus();

      div.appendChild(tweet);
      messages.insertBefore(div, messages.firstElementChild);
    } else {
      event.target.disabled = true;
    }
  }

  function changeText(event) {
    console.log(event.target.value);

    // si no existe, se asigna MAX
    // si existe se habilita el boton y se resta el max con la longitud
    if (event.target.value) {
      var total = MAXCHARACTERS - event.target.value.length;

      tweetBtnActive(true);

      count.textContent = total;

      changeColor(total);

      checkEnters(event);
      /* if (event.keyCode === 13)
        event.target.rows = event.target.rows + 1; */
    } else {
      tweetBtnActive(false);
      count.textContent = MAXCHARACTERS;
    }
  }

  function changeColor(total) {
    switch (true) {
      case (total < 0):
        tweetBtnActive(false);
        count.classList.add('red');
        count.classList.remove('orangered', 'greenyellow', 'seagreen');
        break;
      case (total <= 10):
        count.classList.add('orangered');
        count.classList.remove('red', 'greenyellow', 'seagreen');
        break;
      case (total <= 20):
        count.classList.add('greenyellow');
        count.classList.remove('red', 'orangered', 'seagreen');
        break;
      default:
        count.classList.add('seagreen');
        count.classList.remove('red', 'orangered', 'greenyellow');
    }
  }

  // habilita el boton de tweet
  function tweetBtnActive(centinel) {
    tweetBtn.disabled = !centinel;
  }

  // verifica las filas del textarea, si sobrepasa
  // se agrega una fila más, sino se elimina
  function checkEnters(event) {
    var text = event.target.value.split('');
    var count = 0;

    for (var i = 0; i < text.length; i++)
      if (text[i] === '\n')
        count++;

    if (count)
      event.target.rows = count + 2;
  }
}