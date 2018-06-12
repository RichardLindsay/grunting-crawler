const xray = require('x-ray');
const request = require('request');
const fs = require('fs');

const scraper = new xray();

const new_beers = scraper, on_tap_links = scraper, on_tap_link = scraper
var taps = []

new_beers('https://gruntinggrowler.com/the-beer/?orderby=date', '.product', [{
  name: 'h2',
  image: 'img@src',
  price: '.amount'
}]).write('new_beers.json');

on_tap_links('https://gruntinggrowler.com/the-beer/?orderby=price-desc', '.product_cat-draught-beer', [{
  link: 'a@href'
}]).paginate('.next@href')
(function (err, links) {
  links.forEach((link) => {
    on_tap_link(link.link, '.summary', [{
      name: 'h1',
      image: 'a@href',
      price: '.price'
    }])
    (function (err, results) {
      results.forEach((result) => {
        taps.push(result);
        if (taps.length === links.length) {
          fs.writeFile('on_tap.json', JSON.stringify(taps, null, '\t'));
        }
      });
    });
  });
});
