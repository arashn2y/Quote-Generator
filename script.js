const quoteContainer = document.getElementById("quoteContainer");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("newQuote");
const loader = document.getElementById("loader");

function showSpinLoader() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideSpinLoader() {
    if(!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}
// Get Quotes From API
async function getQuotes() {
    showSpinLoader();
    const apiUrl = "https://type.fit/api/quotes";
    try {
        const response = await fetch(apiUrl);
    let quotesArray = [];
    quotesArray = await response.json();
    const quote = quotesArray[Math.floor(Math.random() * quotesArray.length)];
    if(quote.text.length > 100) {
        quoteText.classList.add("longQuote");
    } else {
        quoteText.classList.remove("longQuote");
    }
    quoteText.textContent = quote.text;
    if(quote.author === null) {
        quoteAuthor.textContent = "Unknown";
    } else {
    quoteAuthor.textContent = quote.author;
    }
    hideSpinLoader();
    } catch (error) {
        console.log("Whoops! there is an error!!")
    }
}
// Tweet Function
function tweetIt() {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(tweetUrl, "_blank");
}
// Buttons Action
twitterBtn.addEventListener("click", tweetIt);
newQuoteBtn.addEventListener("click", getQuotes);
// Get Quotes
getQuotes();