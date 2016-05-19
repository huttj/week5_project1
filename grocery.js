$(document).ready(function() {

  var runningTotal = 0;

  var groceries = [
    { name: "Tomatoes", status: "needed"  , price: "3.99", quantity: 5 },
    { name: "Onions"  , status: "needed"  , price: "1.85", quantity: 2 },
    { name: "Cilantro", status: "needed"  , price:  ".95", quantity: 1 },
    { name: "Limes"   , status: "complete", price:  ".33", quantity: 3 },
    { name: "Jalapeno", status: "complete", price:  ".15", quantity: 2 }
  ];

  // Cache selectors to improve performance (though only slightly)
  // https://ttmm.io/tech/selector-caching-jquery/
  var $addNew      = $('#addNew');
  var $addName     = $('#addName');
  var $addPrice    = $('#addPrice');
  var $addQuantity = $('#addQuantity');
  var $list        = $('#list');

  // We don't want to append to the h4, but overwrite the entire contents of the span
  var $cost = $('.totalCost').find('span');

  // 2. Use the inputs and add button to add grocery items to the beginning of the list.
  // Delegate clicks on the $addNew element (so that we don't have to find the button itself)
  $addNew.on('click', '.btn-success', function() {

    // TODO: Default status should be "needed". The item should appear above the existing grocery items.
    // Make a new item object and get its properties from the form fields. The result of any
    // function call is a value (string, object, etc), so we can do this here.
    var item = {
      name     : $addName.val(),
      price    : $addPrice.val(),
      quantity : $addQuantity.val()
    };

    // Try to add the item to the list. If any of the properties are missing or blank,
    // `addItem()` will throw an error which stops this function completely. That means the
    // lines after `addItem()` will not be executed.
    addItem(item);

    // Reset the form fields (set them to blank strings)
    $addName.val('');
    $addPrice.val('');
    $addQuantity.val('');

  });

  // Click handler for any of the remove buttons for each item. We use delegation here because
  // that lets us avoid adding handlers to all of the button elements, as we create them. We
  // only have to add a single handler to their common parent. In addition to improving
  // performance, this helps us avoid an issue of forgetting to detach the listeners before
  // they're removed. That could cause a memory leak, although this may not be an issue anymore.
  // http://stackoverflow.com/questions/12528049/if-a-dom-element-is-removed-are-its-listeners-also-removed-from-memory
  $list.on('click', '.remove', function() {
    
    // The target element (`this`) is the button with the `.remove` class. It's parent is the
    // actual item that we're going to remove.
    var $el = $(this).parent();
    
    // Get the price and quantity values from the element, and coerce them to numbers
    var price    = +$el.data('price');
    var quantity = +$el.data('quantity');

    // Remove the item element from the DOM/page
    $el.remove();

    // If the price and quantities are both numbers, subtract their product from our total.
    // (Technically, they should always be numbers, but were're just being safe, here.)
    if (!isNaN(price) && !isNaN(quantity)) {
      updateTotal(-(price*quantity));
    }
  });

  // Add an item to the list and render it on the page. Defining a function for adding items is
  // a nice way to do it, because we can use it both to add the items we have from above, in the
  // `groceries` array, as well as the items that we get from the inputs, when the user clicks
  // the `Add Item` button.
  function addItem(item) {

    // 4. Put a check in to make sure users aren't adding items without a name, price, or quantity.
    // Avoid adding an item that is missing a required field
    assert(item.name, 'Please enter a name for your item');
    assert(item.price, 'Please enter a price for your item');
    assert(item.quantity, 'Please enter a quantity for your item');

    // Convert the item's price and quantity to numbers (or use defaults, if needed)
    var price    = isNaN(+item.price)    ? 0 : +item.price;
    var quantity = isNaN(+item.quantity) ? 1 : +item.quantity;

    var textContent = getItemDisplayText(item);

    // Create a button that we can use to remove the item (not required by the instructions,
    // but a nice touch, nonetheless).
    var $remove = $('<button/>')
      .text('x')

      // There might be a way to add these together, but I'm too lazy to look it up.
      .addClass('remove')
      .addClass('btn')
      .addClass('btn-danger');

    var $item = $('<li/>') // Create the item itself
      .text(textContent) // Set the innerText
      .data('price', price) // Add data to the element, which we can get out later
      .data('quantity', quantity)
      .append($remove) // Add the remove button
      .appendTo($list); // Insert the item into the list

    // 3. Make sure that the grocery list displayed updates when you add an item to the list.
    // 3. Display the total cost of the groceries. Make sure this updates as you add items to the list.
    // Increment the running total
    updateTotal(price * quantity);
  }

  // Nice, simple function to make the `innerText` of an item. This gives us one place to
  // manage that, and lets us make it more complex, later, if we so desire.
  function getItemDisplayText(item) {
    return item.name + ' (' + item.quantity + ') $' + item.price + ' ';
  }

  // Change the total by `priceChange` and render the new total to the page
  function updateTotal(priceChange) {

    // If `priceChange` isn't a number, log a warning, and continue without changing the price
    if (isNaN(priceChange)) {
      console.warn('`updateTotal() called with non-number');
      return;
    }

    runningTotal += priceChange;
    $cost.text('$' + runningTotal.toFixed(2));
  }

  // Alert the user and throw an error if `value` is not truthy
  function assert(value, message) {
    if (!value) {
      alert(message);
      throw new Error(message);
    }
  }

  // 1. Display the existing list of grocery items (from the grocery array)
  // Load each of the pre-made items into the page
  groceries.forEach(addItem);

});
