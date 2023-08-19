// Add your cohort name to the variable below, 
const cohortName = '2302-acc-ct-web-pt-b';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
    try {
      const response = await fetch(`${APIURL}/players/`);
      const data = await response.json();
      console.log(data);
      return data;
      
    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};


const fetchSinglePlayer = async (playerId) => {
    try {
      const response = await fetch(`${APIURL}/players/${playerId}`);
      const data = await response.JSON();
      console.log(data);
      return data;
    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};



const addNewPlayer = async (playerObj) => {
    try {
      const response = await fetch(APIURL + "players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(playerObj),
      });
  
      if (response.ok) {
        const addedPlayer = await response.json();
        console.log("Player added:", addedPlayer);
        //dialog box showing user success
        alert(`Success! ${name} added successfully.`);
  
        // Perform any further actions with the added player, such as displaying it on the page
      } else {
        console.error("Failed to add player");
      }
  
    } catch (err) {
      console.error("Oops, something went wrong with adding that player!", err);
    }
  };

// script.js
function createForm() {
    const formContainer = document.getElementById("new-player-form");
  
    // Create the form element
    const form = document.createElement("form");
    form.id = "newPlayerForm";
  
    // Create the form fields
    const nameLabel = document.createElement("label");
    nameLabel.textContent = "Name:";
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.name = "name";
    nameInput.required = true;
    nameInput.autocomplete = "name";
  
    const breedLabel = document.createElement("label");
    breedLabel.textContent = "Breed:";
    const breedInput = document.createElement("input");
    breedInput.type = "text";
    breedInput.name = "breed";
    breedInput.required = true;
  
    const statusLabel = document.createElement("label");
    statusLabel.textContent = "Status:";
    const statusInput = document.createElement("select");
    statusInput.name = "status";
    statusInput.required = true;
  
    // Create status options
    const benchOption = document.createElement("option");
    benchOption.value = "bench";
    benchOption.textContent = "Bench";
    benchOption.selected = true;
    const fieldOption = document.createElement("option");
    fieldOption.value = "field";
    fieldOption.textContent = "Field";

    //Create team options
    // const teamOption = document.createElement("option");
    // benchOption.value = "bench";
    // benchOption.textContent = "Bench";
    // benchOption.selected = true;
    // const teamOption = document.createElement("option");
    // fieldOption.value = "field";
    // fieldOption.textContent = "Field";

  
    // Append status options to select element
    statusInput.appendChild(fieldOption);
    statusInput.appendChild(benchOption);
  
    const imageLabel = document.createElement("label");
    imageLabel.textContent = "Image URL:";
    const imageInput = document.createElement("input");
    imageInput.type = "text";
    imageInput.name = "imageUrl";
  
    const submitButton = document.createElement("input");
    submitButton.type = "submit";
    submitButton.value = "Add Player";
  
    // Append the form fields to the form
    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    nameLabel.appendChild(nameInput);
    form.appendChild(breedLabel);
    form.appendChild(breedInput);
    breedLabel.appendChild(breedInput);
    form.appendChild(statusLabel);
    form.appendChild(statusInput);
    statusLabel.appendChild(statusInput);
    form.appendChild(imageLabel);
    form.appendChild(imageInput);
    imageLabel.appendChild(imageInput);
    form.appendChild(submitButton);
      
    // Append the form to the form container
    formContainer.appendChild(form);
  
    // Add form submission event listener
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent the default form submission
  
      // Retrieve the entered values
      const name = nameInput.value;
      const breed = breedInput.value;
      const status = statusInput.value;
      const imageUrl = imageInput.value;
  
      // Create the player object
      const player = {   
        name: name,
        breed: breed,
        status: status,
        imageUrl: imageUrl
      };
  
      // Display the player object
      await addNewPlayer(player);
      console.log(player);

      // Optionally, reset the form after submission
      form.reset();

      //Ensure status goes back to bench after submission
      statusInput.value = "bench";
    });
  }
  
  // Call the createForm() function to create the form dynamically
  createForm();
  

const removePlayer = async (playerId) => {
    try {
      const response = await fetch(`${APIURL}/players/${playerId}`, {
        method: 'DELETE',
      });
      const data = await response.JSON();
      return data

    } catch (err) {
        console.error(
            `Whoops, trouble removing player #${playerId} from the roster!`,
            err
        );
    }
};

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players. 
 * 
 * Then it takes that larger string of HTML and adds it to the DOM. 
 * 
 * It also adds event listeners to the buttons in each player card. 
 * 
 * The event listeners are for the "See details" and "Remove from roster" buttons. 
 * 
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player. 
 * 
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster. 
 * 
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */

const allPlayersContainer = document.getElementById("all-players-container");

const renderAllPlayers = (playerList) => {
  try {
        // Clear existing content
    allPlayersContainer.innerHTML = "";

    // Loop through the playerList and create HTML elements for each player
    playerList.forEach((player, index) => {
      const playerCard = document.createElement("div");
      playerCard.classList.add("player-card"); // Add CSS classes as needed

      const playerName = document.createElement("h2");
      playerName.textContent = player.name;

      const PlayerImage = document.createElement("img");
      PlayerImage.src = player.imageUrl;
      PlayerImage.alt = `${player.name} Image`

      const playerBreed = document.createElement("p");
      playerBreed.textContent = `Breed: ${player.breed}`;

      const playerStatus = document.createElement("p");
      playerStatus.textContent = `Status: ${player.status}`;

      //More Details button
      const detailsButton = document.createElement("button");
      detailsButton.textContent = "Player Details";
      detailsButton.classList.add("details-button");
      detailsButton.setAttribute("data-player-index", index);

      //Event listener for more details button
      detailsButton.addEventListener("click", (event) => {
        const playerIndex = parseInt(event.target.getAttribute("data-player-index"));
        const player = playerList[playerIndex];
        renderPlayerDetails(player);
      });

      // Append player details to the player card
      playerCard.appendChild(playerName);
      playerCard.appendChild(playerBreed);
      playerCard.appendChild(playerStatus);
      playerCard.appendChild(PlayerImage);
      playerCard.appendChild(detailsButton);

      // Append the player card to the allPlayersContainer
      allPlayersContainer.appendChild(playerCard);

    });
  } catch (err) {
    console.error('Uh oh, trouble rendering players!', err);
  }
};

//Render single player
const renderPlayerDetails = (player) => {
  console.log(player);
  const detailsContainer = document.getElementById("player-details-container");
  detailsContainer.innerHTML = ""; // Clear previous content

  //unrender all players
  allPlayersContainer.style.display = "none";

  const playerCard = document.createElement("div");
  playerCard.classList.add("player-card-detail"); // Add CSS classes as needed

  const playerName = document.createElement("h2");
  playerName.textContent = player.name;

  const playerImage = document.createElement("img");
  playerImage.src = player.imageUrl;
  playerImage.alt = `${player.name} Image`;

  const playerBreed = document.createElement("p");
  playerBreed.textContent = `Breed: ${player.breed}`;

  const playerStatus = document.createElement("p");
  playerStatus.textContent = `Status: ${player.status}`;

  // Append elements to player card
  playerCard.appendChild(playerName);
  playerCard.appendChild(playerImage);
  playerCard.appendChild(playerBreed); 
  playerCard.appendChild(playerStatus);
  detailsContainer.appendChild(playerCard);

  
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete Player";

  deleteButton.addEventListener("click", async () => {
    await removePlayer(player.id);
    init();
  });
  
  playerCard.appendChild(deleteButton);

  const backButton = document.createElement("button");
  backButton.textContent = "Back";
  
  backButton.addEventListener("click", async() => {
    try{
      detailsContainer.remove();
      window.location.reload();
    } catch (error) {
      console.log("Error fetching players:", error);
    }
    
    detailsContainer.innerHTML = "";
  })

  playerCard.appendChild(backButton);
 };
  



/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
    try {
        
    } catch (err) {
        console.error('Uh oh, trouble rendering the new player form!', err);
    }
}

const init = async () => {
    const response = await fetchAllPlayers();
    const players = response.data.players;
    console.log("Type of playerList:", typeof players); // Should be 'object'
    console.log("Is playerList an Array?", Array.isArray(players)); // Should be true
    
    renderAllPlayers(players);

    renderNewPlayerForm();
}

init();