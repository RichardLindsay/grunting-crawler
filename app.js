var app = require('express')();
const xray = require('x-ray')();
var new_beers_list = [];
var taps = [];

app.set('json spaces', 2)

app.get('/new_beers', function(req, res) {
  var new_beers = xray('https://gruntinggrowler.com/the-beer/?orderby=date', '.product', [{
    name: 'h2',
    image: 'img@src',
    price: '.amount'
  }])
  (function (err, results) {
    results.forEach((result) => {
      new_beers_list.push(result)
      if (new_beers_list.length === results.length) {
        res.json(new_beers_list)
      }
    });
  });
})

app.get('/on_tap', function(req, res) {
  var on_tap_links = xray('https://gruntinggrowler.com/the-beer/?orderby=price-desc', '.product_cat-draught-beer', [{
    link: 'a@href'
  }]).paginate('.next@href').limit(2)
  (function (err, links) {
    links.forEach((link) => {
      var on_tap_link = xray(link.link, '#primary', [{
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

var port = process.env.PORT || 8080;
var server = app.listen(port, function () {
  console.log("app running on port.", server.address().port);
});
