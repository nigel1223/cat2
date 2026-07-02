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