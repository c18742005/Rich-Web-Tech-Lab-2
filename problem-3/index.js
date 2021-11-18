/**
 * Function to clear the repo data from the UI
 */
 clearRepoData = () => {
    const repoContainer = document.querySelector('.user-repo-container');

    // While the user repo container has children, delete the next child
    while (repoContainer.firstChild) {
        repoContainer.removeChild(repoContainer.firstChild);
    }
}

/**
 * Function to show desfualt values for profile
 * Used when there is no such profile or an error occurs 
 * when fetching data
 */
showDefault = () => {
    // Set default values
    document.querySelector('.profile-picture').src = "https://i.stack.imgur.com/frlIf.png";
    document.getElementById('profile-name').innerHTML = "N/A";
    document.getElementById('profile-username').innerHTML = "N/A";
    document.getElementById('profile-email').innerHTML = "N/A";
    document.getElementById('profile-location').innerHTML = "N/A";
    document.getElementById('profile-gist-number').innerHTML = "N/A";

    // Clear any data in the repos
    clearRepoData();
}

/**
 * Function to display profile data to the UI
 */
showProfileData = (user) => {
    // if user has an image, change image source to users url
    const img = document.querySelector('.profile-picture');
    if(user.avatar_url) img.src = user.avatar_url;

    // if user has a name associated with account then display it
    // otherwise show N/A
    const name = document.getElementById('profile-name');
    if(user.name) name.innerHTML = user.name
    else name.innerHTML = "N/A";

    // display username 
    const username = document.getElementById('profile-username');
    username.innerHTML = user.login;

    // if user has an email associated with account then display it
    // otherwise show N/A
    const email = document.getElementById('profile-email');
    if(user.email) email.innerHTML = user.email;
    else email.innerHTML = 'N/A';
    
    // if user has a location associated with account then display it
    // otherwise show N/A
    const location = document.getElementById('profile-location');
    if(user.location) location.innerHTML = user.location;
    else location.innerHTML = 'N/A'

    // display the number of gists a user account has
    const gists = document.getElementById('profile-gist-number');
    gists.innerHTML = user.public_gists;
}

/**
 * Function to display repo data to the UI
 */
showRepoData = (repos) => {
    // loop through each repo
    repos.forEach(repo => {
        // Create a container for the repo
        const repoInfo = document.createElement('div');
        repoInfo.className = 'repo-info-container';

        // create a div for the repo name and add html
        const repoName = document.createElement('div');
        repoName.innerHTML = repo.name;

        // create a div for the description
        // if there is a description add it, else there is none
        const repoDesc = document.createElement('div');
        if(repo.desc) repoDesc.innerHTML = repo.desc;
        else repoDesc.innerHTML = 'No description';
        
        // Add children to the user repo container
        repoInfo.appendChild(repoName);
        repoInfo.appendChild(repoDesc);
        document.querySelector('.user-repo-container').appendChild(repoInfo);
    });;
}

fetchRepos = (username) => {
    // clear previous users repos
    clearRepoData();

    // fetch the repos of the supplied user
    fetch('https://api.github.com/users/' + username + '/repos')
        .then(res => {
            if(res.ok) {
                return res.json();
            } else {
                throw "Failed to fetch user repos!";
            }
        })
        .then(data => {
            // display repo data on the UI
            showRepoData(data);
        })
        .catch(err => console.log(err)); // log error to console
}

/**
 * Function that fetches a users profile data
 */
fetchProfile = (username) => {
    // fetch the user specified via user input
    fetch('https://api.github.com/users/' + username)
        .then(res => {
            if(res.ok) { //return json response
                return res.json();
            } else { // error occurred throw error
                throw "Fetch user failed!";
            }
        })
        .then(data => {
            // display the data to the UI
            showProfileData(data);
            // fetch repo data
            fetchRepos(username);
        })
        .catch(err => { // log error to console and show default values 
            console.log(err);
            showDefault();
        });
}

/**
 * Function that handles what happens when search user button is clicked
 */
searchUser = (event) => {
    event.preventDefault();
    
    const username = document.getElementById('username').value;

    fetchProfile(username);
}

// Add event listener to the search user button
const searchButton = document.getElementById('search-user-button');
searchButton.addEventListener('click', searchUser);