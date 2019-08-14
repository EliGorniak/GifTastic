let topics = ["Seinfeld", "Friends", "Breaking Bad", "Stranger Things", "The Walking Dead", "Orange is the New Black", "Game of Thrones", "The Handmaid's Tale", "Black Mirror", "Star Trek", "Everybody Hates Chris"];

// url = https://api.giphy.com/v1/gifs/search?api_key=0qlEBK3LMvXDxwJRbsfsizITkjhuEmjj&q=tv series&limit=10&offset=0&rating=G&lang=en

// This code creates buttons for the inputs/search from user:
document
    .getElementById("add-series")
    .addEventListener("click", function (event) {
        event.preventDefault();
        let series = document.getElementById("series-input").value.trim();
        series = ucFirstLetter(series);
        topics.push(series);
        createButtons();
    });
createButtons();


// This function turns firts letter of input capitalized:
function ucFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// This function creates buttons for all the elements of array:
function createButtons() {
    document.getElementById("series-buttons").innerHTML = "";
    for (let i = 0; i < topics.length; i++) {
        const a = document.createElement("button");
        a.classList.add("series");
        a.setAttribute("data-name", topics[i]);
        a.setAttribute
        a.innerHTML = topics[i];
        document.getElementById("series-buttons").append(a);
    }
    addGifs();
};

// This function will shows all the images by clicking the buttons by the user:
function addGifs() {    

    document.querySelectorAll(".series").forEach(function (button) {
        button.addEventListener("click", function (event) {
            const anySeries = event.target.getAttribute("data-name");

            // variable that will constructs the URL for API search: 
            const queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                anySeries + "&api_key=0qlEBK3LMvXDxwJRbsfsizITkjhuEmjj&limit=10&offset=0&rating=G&lang=en";

            // Fetching the URL request:
            fetch(queryURL)
                .then(function (response) {
                    return response.json();
                })
                
                // Storing the datas fron Json in a variable:
                .then(function (responseJson) {
                    const results = responseJson.data;

                    // Loop to select all the array components:
                    for (let i = 0; i < results.length; i++) {

                        // This variable will create the div on the HTML for the images:
                        const gifDiv = document.createElement("div");

                        // This variable will get the rating for every image:
                        const rating = results[i].rating;

                        // This variable will create an HTML element p that will show the rating:
                        const p = document.createElement("p");
                        p.innerHTML = "Rating: " + rating;

                        // This variable will create the img on the HTML for the images:
                        const seriesImage = document.createElement("img");

                        // This line will set attribute source for the results of Json:
                        seriesImage.setAttribute("src", results[i].images.fixed_height_still.url);

                        // This line will set attribute data-state for the results of Json:
                        seriesImage.setAttribute("data-state", "still");

                        // This line will set attribute data-still for the results of Json:
                        seriesImage.setAttribute("data-still", results[i].images.fixed_height_still.url);

                        // This line will set attribute data-animate for the results of Json:
                        seriesImage.setAttribute("data-animate", results[i].images.fixed_height.url);

                        // This line will set attribute class for the results of Json:
                        seriesImage.setAttribute("class", "gif");

                        // This line will set attribute id for the results of Json:
                        seriesImage.setAttribute("id", results[i].id);

                        // This line will set the attribute onclick that will call the function changeGifState to start/stop the images, for any results of Json:
                        seriesImage.setAttribute("onclick", "changeGifState('"+ results[i].id +"');");

                        // These lines will append all the 10 images (limit) on the sections:
                        gifDiv.append(p);
                        gifDiv.append(seriesImage);

                        // This line will prepend the gifDiv to the "#gifs-appear-here" div in the HTML:
                        document.getElementById("gifs-appear-here").prepend(gifDiv);
                    }
                });
        });
        
    });
    
};

// This function will change the gifs states START/ANIMATE or STOP/STILL:
function changeGifState(gifId) {
    //alert ("changegif " + gifId);
    let gif = document.getElementById(gifId);
    let state = gif.getAttribute("data-state");
    if (state === "still") {
        event.target.setAttribute("src", event.target.getAttribute("data-animate"));
        event.target.setAttribute("data-state", "animate");
    } else {
        event.target.setAttribute("src", event.target.getAttribute("data-still"));
        event.target.setAttribute("data-state", "still");
    }
}

