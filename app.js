var app = require('express')();
const xray = require('x-ray')();
var taps = []

app.set('json spaces', 2)

app.get('/new_beers', function(req, res) {
  var new_beers = xray('https://gruntinggrowler.com/the-beer/?orderby=date', '.product', [{
    name: 'h2',
    image: 'img@src',
    price: '.amount'
  }]).stream();
  new_beers.pipe(res);
})

app.get('/on_tap', function(req, res) {
  var on_tap_links = xray('https://gruntinggrowler.com/the-beer/?orderby=price-desc', '.product_cat-draught-beer', [{
    link: 'a@href'
  }]).paginate('.next@href')
  (function (err, links) {
    links.forEach((link) => {
      var on_tap_link = xray(link.link, '.product', [{
        name: 'h1',
        image: 'img@src',
        price: '.price'
      }])
      (function (err, results) {
        results.forEach((result) => {
          taps.push(result);
          if (taps.length === links.length) {
            res.json(taps);
          }
        });
      });
    });
  });
})



var server = app.listen(3000, function () {
    console.log("app running on port.", server.address().port);
});

// new_beers('https://gruntinggrowler.com/the-beer/?orderby=date', '.product', [{
//   name: 'h2',
//   image: 'img@src',
//   price: '.amount'
// }]).write('new_beers.json');
