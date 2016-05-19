$(document).ready(function() {

  var runningTotal = 0;

  var groceries = [
  {name: "Tomatoes", status: "needed", price: "3.99", quantity: 5},
  {name: "Onions", status: "needed", price: "1.85", quantity: 2},
  {name: "Cilantro", status: "needed", price: ".95", quantity: 1},
  {name: "Limes", status: "complete", price: ".33", quantity: 3},
  {name: "Jalapeno", status: "complete", price: ".15", quantity: 2}
  ];


  var $addNew      = $('#addNew');
  var $addName     = $('#addName');
  var $addPrice    = $('#addPrice');
  var $addQuantity = $('#addQuantity');
  var $list        = $('#list');
  var $cost        = $('.totalCost').find('span');

  $addNew.on('click', '.btn-success', function() {
    var item = {
      name: $addName.val(),
      price: $addPrice.val(),
      quantity: $addQuantity.val()
    };

    addItem(item);

    $addName.val('');
    $addPrice.val('');
    $addQuantity.val('');

  });

  $list.on('click', '.remove', function() {
    console.log('Remove!');
    var $el = $(this).parent();
    var price = +$el.data('price');
    var quantity = +$el.data('quantity');

    $el.remove();

    if (!isNaN(price) && !isNaN(quantity)) {
      updateTotal(-(price*quantity));
    }
  });
  
  function addItem(item) {
    assert(item.name, 'Please enter a name for your item');
    assert(item.price, 'Please enter a price for your item');
    assert(item.quantity, 'Please enter a quantity for your item');

    var price = isNaN(+item.price) ? 0 : +item.price;
    var quantity = isNaN(+item.quantity) ? 1 : +item.quantity;

    var textContent = item.name + ' (' + item.quantity + ') $' + item.price + ' ';
    var $remove = $('<button/>')
      .text('x')
      .addClass('remove')
      .addClass('btn')
      .addClass('btn-danger');

    var $item = $('<li/>')
      .text(textContent)
      .data('price', price)
      .data('quantity', quantity)
      .append($remove)
      .appendTo($list);

    updateTotal(price * quantity);
  }

  function updateTotal(priceChange) {
    runningTotal += priceChange;
    $cost.text('$' + runningTotal.toFixed(2));
  }

  function assert(value, message) {
    if (!value) {
      alert(message);
      throw new Error(message);
    }
  }

  groceries.forEach(addItem);

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
