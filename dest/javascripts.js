// data products
products = {
  fruits: [
    "apple",
    "orange",
    "mango"
  ],
  vegetables : [
    "potato",
    "tomato",
    "cucumber",
    "pepper"
  ]
}

// SHOP
initShop( products )

function initShop ( products ) {
  // call marker create
  var arrProducts = createMarket( products )
  // add class
  var classList = createClassProducts( arrProducts )
  console.timeEnd('createMarket') // time
  // select elem
  selectElements( arrProducts )
  //
  buing( classList, function () {
    var resultElements = document.getElementsByClassName('take');

    var checks = document.getElementsByClassName('check');
    if ( checks.length > 1 ) {
      checks[0].remove();
    }
    console.log('byuing')
  });
}

// CREATE MARKET
function createMarket( products ) {
  console.time('createMarket') // time

  var shop = document.createElement('div');
  shop.className = 'shop';
  var cont = document.querySelector('.container');
  cont.appendChild( shop )

  var allProducts = []; // for each prod
  //
  for (key in products) {
    var arrProd = products[key];
    var prod = document.createElement('div');
    prod.classList.add(key, 'table')
    prod.innerText = key;
    shop.appendChild(prod)

    // added products
    for (var i = 0; i < arrProd.length; i++) {
      var currentProd = arrProd[i];
      var elem = document.createElement('div');
      allProducts.push( currentProd )
      elem.innerText = currentProd;
      elem.classList.add(currentProd, "prod");
      prod.appendChild( elem );
    }
  }
  return allProducts;
}

// CRATE CLASS FOR PRODUCTS
function createClassProducts ( elements ) {
  // options for product
  var options = {
    weight: 12,
    place: 3,
    price: 6
  }

  // constructor product
  function Product( options, name ) {
    this.name = name;
    this.weight = options.weight;
    this.price = options.price;
    this.place = options.place;
  }

  // prototype product
  Product.prototype.takeBill = function () {
    return this.weight * this.price;
  }
  //
  var listClass = [];
  //
  elements.forEach( function (val, index, arr ) {
    // add class for each
    var $elem = document.querySelector( "." + val );
    var val = new Product( options, val );
    $elem.prototype = val;
    listClass.push( val );
    for ( key in options ) {
      $elem.setAttribute( "data-" + key, options[key] );
    }
  })
  return listClass;
}

// SELECT ELEMENTS
function selectElements( arrProducts ) {
  var shop = document.querySelector('.shop');
  shop.addEventListener('click', function(e) {
    var target = e.target;
    arrProducts.forEach( function ( val, index, arr ) {
      if ( target.classList.value.indexOf( val ) >= 0 ) {
        target.classList.value.indexOf('take') == -1 ? target.classList.add('take') : target.classList.remove('take');
      }
    })
  }, false)
}

// START BUYING
function buing( classList, done ) {
  var btnBuy = document.querySelector('.buy');
  btnBuy.addEventListener('click', function (e) {
    var totalSum = 0;
    var buyingProducts = [];

    e.stopPropagation();
    // selected elem
    var taken = document.getElementsByClassName('take');
    for (var i = 0; i < taken.length; i++) {
      var $el = taken[i]
      var check = $el.prototype.takeBill();
      totalSum += check;
      buyingProducts.push( $el.prototype )
    }
    showCheck( totalSum, buyingProducts );

    done()
  }, false)

}

function showCheck( sum, products ) {
  // forming
  var elem = document.getElementsByClassName('check')[0];
  var body = document.querySelector('body');
  var checkElem = document.createElement('div');
  var maney = document.createElement('span');
  var wrapElems = document.createElement('div');
  wrapElems.className = 'wrapItems';
  // filling
  maney.className = 'maney'
  maney.innerText = "sum: " + sum + " $";
  for (var i = 0; i < products.length; i++) {
    for (key in products[i]) {
      if (products[i].hasOwnProperty(key)) {
        var pos = document.createElement('p');

        pos.innerText = key + ": " + products[i][key] + " ";
        wrapElems.appendChild( pos )
      }
    }
  }
  checkElem.appendChild( wrapElems );
  checkElem.className = 'check';
  checkElem.appendChild( maney )

  body.appendChild( checkElem )
}
