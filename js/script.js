// Array of objects with the required 'name' property
const carsArray = [
    {
        name: "2022 Eco Sedan",
        specs: "32,000 miles | Automatic | Hybrid",
        price: "$21,500",
        badge: "Just Arrived"
    },
    {
        name: "2020 Family SUV",
        specs: "45,500 miles | AWD | V6 Engine",
        price: "$26,900",
        badge: "Great Deal"
    },
    {
        name: "2019 Sport Coupe",
        specs: "18,200 miles | Manual | Turbocharged",
        price: "$29,400",
        badge: "Certified"
    }
];

// Target the inventory container
const gridContainer = document.querySelector('.grid-container');

// Clear the hardcoded HTML cars
gridContainer.innerHTML = "";

//  forEach loop
carsArray.forEach(function(car) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'grid-item';
    

    cardDiv.innerHTML = `
        <span class="status-badge">${car.badge}</span>
        <h3>${car.name}</h3>
        <p class="specs">${car.specs}</p>
        <p class="price">${car.price}</p>
        <button class="add-wishlist-btn" style="margin-top: 10px; padding: 5px; width: 100%; cursor: pointer;">
             Add to Wishlist
        </button>
    `;
    
    gridContainer.appendChild(cardDiv);
});





// Creating the wishlist HTML container elements dynamically via script
const inventorySection = document.getElementById('inventory');
const wishlistSection = document.createElement('section');
wishlistSection.id = 'wishlist-section';
wishlistSection.innerHTML = `
    <h2>My Saved Wishlist</h2>
    <ul id="wishlist-list" style="list-style: none; padding: 0;"></ul>
`;

inventorySection.insertAdjacentElement('afterend', wishlistSection);

const wishlistUl = document.getElementById('wishlist-list');

//Load existing items or start empty if there's nothing saved yet
let savedItems = [];
if (localStorage.getItem('savedCars') !== null) {
    savedItems = JSON.parse(localStorage.getItem('savedCars'));
}

//add the item visually to the screen and setup its remove button
function displayWishlistItem(carName) {
    const li = document.createElement('li');
    li.style.margin = "10px 0";
    li.style.padding = "10px";
    li.style.border = "1px solid #cbd5e1";
    li.style.display = "flex";
    li.style.justifyContent = "between"; // standard flex layout approach
    li.style.justifyContent = "space-between"; 
    
    //text label
    const nameSpan = document.createElement('span');
    nameSpan.textContent = carName;
    
    //individual remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    removeBtn.style.backgroundColor = "red";
    removeBtn.style.color = "white";
    removeBtn.style.border = "none";
    removeBtn.style.cursor = "pointer";
    
    // Event listener to remove the item dynamically
    removeBtn.addEventListener('click', function() {
        //Remove element from DOM
        li.remove();
        
        //Remove element from our tracking array
        const index = savedItems.indexOf(carName);
        if (index > -1) {
            savedItems.splice(index, 1);
        }
        
        //Update localStorage so it stays deleted on reload
        localStorage.setItem('savedCars', JSON.stringify(savedItems));
    });
    
    li.appendChild(nameSpan);
    li.appendChild(removeBtn);
    wishlistUl.appendChild(li);
}

// Render the items loaded out of localStorage on initial page load
savedItems.forEach(function(item) {
    displayWishlistItem(item);
});

// Select all the dynamic wishlist buttons we generated earlier
const wishlistButtons = document.querySelectorAll('.add-wishlist-btn');

for (let i = 0; i < wishlistButtons.length; i++) {
    wishlistButtons[i].addEventListener('click', function() {
        // Get the car name relative to the clicked button's card headers
        const carName = carsArray[i].name;
        
        // Validation check so you don't add duplicates
        if (savedItems.includes(carName)) {
            alert("You already added this car!");
        } else {
            savedItems.push(carName);
            localStorage.setItem('savedCars', JSON.stringify(savedItems)); // save array
            displayWishlistItem(carName); // update DOM
        }
    });
}