// Menu items data
const menuItems = {
  pasta: [
    {
      name: "Spaghetti Carbonara",
      price: 12.99,
      description: "Delicious spaghetti served with creamy carbonara sauce.",
      ingredients: ["Spaghetti", "Eggs", "Parmesan cheese", "Bacon"],
    },
    {
      name: "Fettuccine Alfredo",
      price: 11.99,
      description: "Classic fettuccine pasta tossed in a creamy Alfredo sauce.",
      ingredients: [
        "Fettuccine pasta",
        "Butter",
        "Parmesan cheese",
        "Heavy cream",
      ],
    },
    {
      name: "Penne Arrabiata",
      price: 10.99,
      description:
        "Penne pasta cooked with a spicy tomato sauce and garnished with fresh basil.",
      ingredients: ["Penne pasta", "Tomato sauce", "Garlic", "Chili flakes"],
    },
  ],
  pizza: [
    {
      name: "Margherita",
      price: 14.99,
      description:
        "Classic pizza topped with tomato sauce, mozzarella cheese, and fresh basil.",
      ingredients: [
        "Pizza dough",
        "Tomato sauce",
        "Mozzarella cheese",
        "Basil",
      ],
    },
    {
      name: "Pepperoni",
      price: 16.99,
      description:
        "Pizza topped with spicy pepperoni slices and mozzarella cheese.",
      ingredients: [
        "Pizza dough",
        "Tomato sauce",
        "Pepperoni",
        "Mozzarella cheese",
      ],
    },
    {
      name: "Hawaiian",
      price: 15.99,
      description:
        "Pizza topped with ham, pineapple chunks, and mozzarella cheese.",
      ingredients: [
        "Pizza dough",
        "Tomato sauce",
        "Ham",
        "Pineapple",
        "Mozzarella cheese",
      ],
    },
  ],
  desserts: [
    {
      name: "Tiramisu",
      price: 8.99,
      description:
        "Traditional Italian dessert made with layers of ladyfingers, mascarpone cheese, and coffee.",
      ingredients: ["Ladyfingers", "Mascarpone cheese", "Coffee"],
    },
    {
      name: "Chocolate Lava Cake",
      price: 9.99,
      description: "Decadent chocolate cake with a gooey chocolate center.",
      ingredients: ["Chocolate", "Flour", "Butter", "Sugar", "Eggs"],
    },
    {
      name: "Panna Cotta",
      price: 7.99,
      description:
        "Creamy Italian dessert made with sweetened cream and topped with fruit sauce.",
      ingredients: ["Cream", "Sugar", "Gelatin", "Vanilla extract"],
    },
  ],
};

function updateMenuItems() {
  const menu = document.getElementById("menu");
  const menuItemsList = document.getElementById("menu-items");

  // Clear previous items
  menuItemsList.innerHTML = "";

  // Get selected menu value
  const menuValue = menu.value;

  // Get items for the selected menu
  const items = menuItems[menuValue];

  // Add items to the list
  items.forEach((item) => {
    const li = document.createElement("li");
    const name = document.createElement("span");
    const price = document.createElement("span");
    const description = document.createElement("p");
    const ingredients = document.createElement("p");
    const addButton = document.createElement("button");

    name.textContent = item.name;
    price.textContent = `${item.price.toFixed(2)}€`;
    description.textContent = `Description: ${item.description}`;
    ingredients.textContent = `Ingredients: ${item.ingredients.join(", ")}`;
    addButton.textContent = "+";
    addButton.setAttribute("data-name", item.name);
    addButton.setAttribute("data-price", item.price.toFixed(2));

    addButton.addEventListener("click", addToBasket);

    li.appendChild(name);
    li.appendChild(price);
    li.appendChild(description);
    li.appendChild(ingredients);
    li.appendChild(addButton);

    menuItemsList.appendChild(li);
  });

  // Apply search functionality
  applySearchFunctionality();
}

function applySearchFunctionality() {
  const searchInput = document.getElementById("search");
  const menuItemsList = document.getElementById("menu-items");
  const menuItems = menuItemsList.getElementsByTagName("li");

  // Add event listener for input changes
  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();

    // Filter menu items based on search term
    Array.from(menuItems).forEach((item) => {
      const itemName = item.querySelector("span").textContent.toLowerCase();
      if (itemName.includes(searchTerm)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
}
function addToBasket(event) {
  const itemName = event.target.getAttribute("data-name");
  const itemPrice = parseFloat(event.target.getAttribute("data-price"));

  const basketList = document.getElementById("basket-items");
  const li = document.createElement("li");
  const name = document.createElement("span");
  const price = document.createElement("span");
  const removeButton = document.createElement("button");
  const addButton = document.createElement("button");

  name.textContent = itemName;
  price.textContent = `${itemPrice.toFixed(2)}€`;
  removeButton.textContent = "-";
  addButton.textContent = "+";
  removeButton.classList.add("remove");
  addButton.classList.add("add");
  addButton.setAttribute("data-name", itemName);
  addButton.setAttribute("data-price", itemPrice.toFixed(2));

  removeButton.addEventListener("click", removeFromBasket);
  addButton.addEventListener("click", addToBasket);

  li.appendChild(name);
  li.appendChild(price);
  li.appendChild(removeButton);
  li.appendChild(addButton);

  basketList.appendChild(li);

  // Calculate the total order amount
  calculateTotal();
  // Check if the total amount is less than the minimum order value
  checkMinimumOrder();
}

function removeFromBasket(event) {
  event.target.parentElement.remove();
  // Calculate the total order amount
  calculateTotal();
  // Check if the total amount is less than the minimum order value
  checkMinimumOrder();
}

function calculateTotal() {
  const basketItems = document.querySelectorAll("#basket-items li");
  let subtotal = 0;
  let tax = 0;
  let total = 0;
  const taxRate = 0.1; // 10% tax rate

  basketItems.forEach((item) => {
    const itemPrice = parseFloat(
      item.querySelector("span:nth-child(2)").textContent.slice(1)
    );
    subtotal += itemPrice;
  });

  tax = subtotal * taxRate;
  total = subtotal + tax;

  document.querySelector("#subtotal-price").textContent = `${subtotal.toFixed(
    2
  )}€`;
  document.querySelector("#tax-price").textContent = `${tax.toFixed(2)}€`;
  document.querySelector("#totali-price").textContent = `${total.toFixed(2)}€`;
}

function checkMinimumOrder() {
  const basketItems = document.querySelectorAll("#basket-items li");
  let subtotal = 0;

  basketItems.forEach((item) => {
    const itemPrice = parseFloat(
      item.querySelector("span:nth-child(2)").textContent.slice(1)
    );
    subtotal += itemPrice;
  });

  const minimumOrderValue = 20.0; // Set your minimum order value here

  const basketMessage = document.getElementById("basket-message");
  if (subtotal < minimumOrderValue) {
    basketMessage.style.display = "block";
  } else {
    basketMessage.style.display = "none";
  }
}

// Call checkMinimumOrder() function initially to determine if minimum order message should be displayed
checkMinimumOrder();

// Add event listener to update menu items whenever the value of the dropdown menu changes
const menu = document.getElementById("menu");
menu.addEventListener("change", updateMenuItems);

// Call updateMenuItems() function to initially populate the menu items
updateMenuItems();

function calculateTotal() {
  const basketItems = document.querySelectorAll("#basket-items li");
  let subtotal = 0;
  let tax = 0;
  let total = 0;
  const taxRate = 0.1; // 10% tax rate

  basketItems.forEach((item) => {
    const itemPrice = parseFloat(
      item.querySelector("span:nth-child(2)").textContent.slice(1)
    );
    subtotal += itemPrice;
  });

  tax = subtotal * taxRate;
  total = subtotal + tax;

  document.querySelector("#subtotal-price").textContent = `${subtotal.toFixed(
    2
  )}€`;
  document.querySelector("#tax-price").textContent = `${tax.toFixed(2)}€`;
  document.querySelector("#totali-price").textContent = `${total.toFixed(2)}€`;
}

var checkoutButton = document.querySelector("#checkout");

checkoutButton.addEventListener("click", function () {
  var totalPrice = parseFloat(
    document.getElementById("totali-price").textContent
  );

  var confirmation = confirm("Do you want to continue with payment?");

  if (confirmation) {
    const basketItems = document.querySelectorAll("basket-items li");
    const orderItems = Array.from(basketItems).map((item) => {
      const itemName = item.querySelector("span:nth-child(1)").textContent;
      const itemPrice = parseFloat(
        item.querySelector("span:nth-child(2)").textContent.slice(1)
      );
      return { name: itemName, price: itemPrice };
    });

    window.location.href = "payment.html";
  } else {
    var basketItems = document.getElementById("basket-items");

    basketItems.innerHTML = "";
    document.getElementById("total-price").textContent = "0.0";
  }
})