$(document).ready(function () {

  var groceries = [
    { name: "Tomatoes", status: "needed", price: "3.99", quantity: 5},
    { name: "Onions", status: "needed", price: "1.85", quantity: 2},
    { name: "Cilantro", status: "needed", price: ".95", quantity: 1},
    { name: "Limes", status: "complete", price: ".33", quantity: 3},
    { name: "Jalapeno", status: "complete", price: ".15", quantity: 2}
  ];

  function addItem(name, price, quantity) {
    $('<li/>')
      .text(name + ' (' + quantity + ') @ $' + price)
      .appendTo($('#list'));
    $('form')[0].reset();
  }

  var item;
  for (var i = 0; i < groceries.length; i++) {
    item = groceries[i];
    addItem(item.name, item.price, item.quantity);
  }

  calculateTotalImperative();
  calculateTotalFunctional();

  function calculateTotalImperative() {
    var total = 0;
    for (var i = 0; i < groceries.length; i++) {
      total += (groceries[i].quantity * groceries[i].price);
    }

    $('.totalCost').find('span').text('$' + total.toFixed(2));
  }

  function calculateTotalFunctional() {
    var total = groceries.reduce(function(currentTotal, item) {
      return currentTotal + (item.quantity * item.price);
    }, 0);

    $('.totalCost').find('span').text('$' + total.toFixed(2));
  }

  $('#addNew').on('submit', function(evt) {
    
    evt.preventDefault();

    var name     = $('#addName').val();
    var price    = $('#addPrice').val();
    var quantity = $('#addQuantity').val();

    if (!name) {
      return alert('Please enter a name before adding the item!');
    }

    if (price === '' || isNaN(+price)) {
      return alert('Please enter number for price!');
    }

    if (isNaN(+quantity) || +quantity < 1) {
      return alert('Please enter 1 or greater for the quantity!');
    }

    addItem(name, +price, +quantity);

    groceries.push({
      name: name,
      price: price,
      quantity: quantity
    });

    calculateTotalFunctional();
    
  });

  $('.remove').click(removeLastItem);
  
  function removeLastItem() {
    groceries.pop();
    $('#list').children().eq(-1).remove();
    calculateTotalImperative();
  }

// Before we start anything, string up the css file, this javascript file, and
// the jQuery CDN to grocery.html file.

//1. Display the existing list of grocery items (from the grocery array)
// in an unordered list in the "list" id that already exists in grocery.html.
// Display each item's name, price, and quantity.
// Ex: Tomatoes (5) @ $3.99

//2. Use the inputs and add button to add grocery items to the beginning of the list.
// Default status should be "needed". The item should appear above the existing grocery items.

//3. Make sure that the grocery list displayed updates when you add an item to the list.

//3. Display the total cost of the groceries. Make sure this updates as you add items to the list.

//4. Put a check in to make sure users aren't adding items without a name, price, or quantity.

});
