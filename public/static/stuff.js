const ticker_form = document.getElementById("search-window");
const ticker = document.getElementById("ticker");
const feedback = document.getElementById("feedback");

ticker_form.onsubmit = function () {
  event.preventDefault();
  
  fetch ("/getlinks", {
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    }, 
    body : JSON.stringify({
      url : "https://finance.yahoo.com/quote/" + ticker.value + "?p=" + ticker.value + "&.tsrc=fin-srch"
    })
  })
  .then(response => response.text())
  .then(data => {
    if (data.toLowerCase().includes("bearish")) {
      feedback.innerText = "Not good news, but don't fret, it's not over yet!";

      if (data.toLowerCase().includes("overvalued")) {
        feedback.innerText += " Sadly, it is also overvauled.";
      }

      else if (data.toLowerCase().includes("undervalued")) {
        feedback.innerText += " It is also undervalued!";
      }
    }

    else if (data.toLowerCase().includes("bullish")) {
      feedback.innerText = "Doing pretty good. Keep it up!";

      if (data.toLowerCase().includes("overvalued")) {
        feedback.innerText += " Sadly, it is also overvauled.";
      }

      else if (data.toLowerCase().includes("undervalued")) {
        feedback.innerText += " It is also undervalued!";
      }
    }

    else {
      feedback.innerText = "Ticker was not found.";
    }
  })
  .catch(error => {
    throw error;
  })
}