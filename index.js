// INTERACT WITH THE DOM

document.addEventListener('DOMContentLoaded', () => {
    // Call search university function
    searchUniversity();

    // POST user info to the server
    postUserInfo();

    // Change button colors
    colorButtons();
})




// Fetch data from API
function fetchData(searchInput){
    fetch(`http://universities.hipolabs.com/search?name=${searchInput}`)
    .then( (response) => response.json())
    .then( (result) => {
        // The returned data is an array
        // Loop over each item and extract name, country and url
        // Show the user these details under the search results section

        // Display these to the search results section
        const searchResults = document.getElementById("search-details");
        searchResults.innerHTML = ''; //clear current content
        
        if (result.length === 0){
            alert('There is no matching university. Please try again!')
        } else {
            for (let university of result){
                // Add the details to DOM
                const uniName = university.name;
                const nameParagraph = document.createElement('p')
                nameParagraph.textContent = `Name: ${uniName}`
                searchResults.appendChild(nameParagraph);
    
                const uniCountry = university.country;
                const countryParagraph = document.createElement('p')
                countryParagraph.textContent = `Country: ${uniCountry}`
                searchResults.appendChild(countryParagraph);
    
                const uniWebsite = university['web_pages'][0];                const webLink = document.createElement('a');
                webLink.textContent = 'University website'
                webLink.href = uniWebsite;
                searchResults.appendChild(webLink);
                
                // Add an event listener to the link
                webLink.addEventListener('mouseleave', () => {
                    alert('Visit the university website for more information!')
                })
            }
        }
    })
    //.then( () => postComments())
    .catch( (error) => {
        alert(error.message);
    })
}

// Grab user search input
function searchUniversity(){
    // Get the form element
    const form = document.getElementById("search-form")

    // Grab user input and make a GET request
    form.addEventListener('submit', (event) => {
        event.preventDefault()
        const search = event.target['search-input'].value;
        event.target.reset();

        // Call fetchData() to fetch university data
        fetchData(search);
        // Post comments about the university
        postComments();
    })
}

// Handle comments
function postComments(){
    // Grab comments form
    const form = document.getElementById("comments-form");

    // Grab comments section
    const comments = document.getElementById("comments")
    comments.innerHTML = '';

    // Listen to the submit event
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const newComment = event.target["comment-input"].value;

        //Add the comment to the comments section
        const li = document.createElement('li');
        li.textContent = newComment;
        comments.appendChild(li);

        event.target.reset();
    })
}

// Make a POST request to store user info in the server
function postUserInfo(){
    // Grab user info form
    const form = document.getElementById("user-address");

    // Listen to user submission
    form.addEventListener('submit', (event) => {
        event.preventDefault()

        // Capture user info
        const userName = event.target['user-name'].value;
        const userEmail = event.target['user-email'].value;
        console.log(userName, userEmail);

        const userInfo = {
            userName: userName,
            userEmail: userEmail
        };

        // make a POST request to the json-server
        fetch('http://localhost:3000/UserData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(userInfo) // Convert JS object to JSON
        })
        .then( (response) => response.json())
        .then( (result) => {
            alert(`${result.userName}, your data has been saved successfully!`)
        })

        event.target.reset(); //Reset form
    })
} 

// Change the color of buttons on mousedown
function colorButtons(){
    const buttons = document.getElementsByTagName('button');
    for (let button of buttons){
        button.addEventListener('click', () => {
            button.style.background = '#0a0a23'; //change background color on click
        })
    }
}