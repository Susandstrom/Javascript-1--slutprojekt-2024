
//Manipulering av DOM. Skapar en rubrik (H1) i HTML genom att använda "create". Genom att skriva body.appendChild visas rubriken i HTML-filen och sedan på webbsidan. 
let body = document.getElementById("body");
let h1 = document.createElement("h1");
h1.innerText = "Welcome to People Randomizer";

body.appendChild(h1);


// Function för API/fetch för att hämta data till person
function simpleFetch(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Något gick fel - ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Data hämtad:', data);
            let person = data.results[0];
            randomPeople(person);
        })
        .catch(error => {
            console.error('Fetch-fel:', error);
        });
}

// Function to display person information in the DOM. Function randomPeople visar hur och vart datan skall hamna och visas på webbplatsen. InfoDiv skickar datan till HTML-filen. 
function randomPeople(person) {
    let picture = person.picture.large;
    let name = `${person.name.first} ${person.name.last}`;
    let gender = person.gender;
    let phone = person.phone;
    let email = person.email;
 

    let infodiv = document.getElementById("infoDiv");

    infodiv.innerHTML = `
        <img src="${picture}" alt="${name}'s Profile Picture" id="randomImg">
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Gender:</strong> ${gender}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
    `;
}

// Event listener for button click. När du klickar på knappen kommer function randomPeople att aktiveras och dra in data från simpleFetch (api)
document.getElementById("randomizer").addEventListener("click", function() {
    simpleFetch("https://randomuser.me/api/");
});
