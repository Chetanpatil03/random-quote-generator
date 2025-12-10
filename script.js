const quoteText = document.querySelector(".quote"),
    authorText = document.querySelector(".name"),
    quoteBtn = document.querySelector("button"),
    soundBtn = document.querySelector(".sound"),
    copyBtn = document.querySelector(".copy"),
    twitterBtn = document.querySelector(".twitter")

function randomQuote() {
    // console.log("click");
    // fetch("https://type.fit/api/quotes")

    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "Loading Quote......";
    fetch("https://dummyjson.com/quotes/random")
    .then(res => res.json())
    .then(result => {
        console.log(result);
        quoteText.innerText = result.quote;
        authorText.innerText = result.author;
        quoteBtn.innerText = "New Quote";
        quoteBtn.classList.remove("loading");
    })
    .catch(error => {
        console.error("Error fetching quote:", error);
    });
}

quoteBtn.addEventListener("click", randomQuote);

soundBtn.addEventListener("click", ()=>{
    let utternace = new SpeechSynthesisUtterance(`${quoteText.innerText} by ${authorText.innerText}`);
    speechSynthesis.speak(utternace);

})


const downloadBtn = document.querySelector(".download");
// Select the specific container you want to capture (e.g., the wrapper around the quote)
const quoteContainer = document.querySelector(".container"); // Change ".wrapper" to your main container class

downloadBtn.addEventListener("click", () => {
    // 1. Change button text to indicate processing
    // downloadBtn.innerText = "Saving...";

    // 2. Use html2canvas to create the image
    html2canvas(quoteContainer, {
        useCORS: true, // Important for fetching images/fonts correctly
        allowTaint: true,
        backgroundColor: "#ffffff" // Force a white background (prevents transparent images)
    }).then(canvas => {
        // 3. Create a fake link to trigger the download
        const link = document.createElement("a");
        link.download = "quote.png";
        link.href = canvas.toDataURL("image/png");
        link.click();

        // 4. Reset button text
        // downloadBtn.innerText = "Download Image";
    });
});


const toast = document.querySelector("#toast");

copyBtn.addEventListener("click", () => {
    // 1. Write text to clipboard
    navigator.clipboard.writeText(quoteText.innerText);

    // 2. Show the toast message
    toast.className = "show";

    // 3. Hide it after 3 seconds (3000 milliseconds)
    setTimeout(function() { 
        toast.className = toast.className.replace("show", ""); 
    }, 3000);
});