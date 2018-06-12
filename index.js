const xray = require('x-ray');
const request = require('request');
const fs = require('fs');

const scraper = new xray();

const new_beers = scraper
const on_tap_links = scraper
const on_tap_link = scraper

var taps = []



new_beers('https://gruntinggrowler.com/the-beer/?orderby=date', '.product', [{
  title: 'h2',
  brewery: '.woocommerce-product-details__short-description px',
  image: 'img@src',
  price: '.amount'
}]).write('new_beers.json');

// const on_tap_urls = document.querySelectorAll('a[title="CLICK & COLLECT"]');
// console.log(on_tap_urls);

on_tap_links('https://gruntinggrowler.com/the-beer/?orderby=price-desc', '.product_cat-draught-beer', [{
  link: 'a@href'
}]).paginate('.next@href')
(function (err, links) {
  links.forEach((link) => {
    on_tap_link(link.link, '.summary', [{
      title: 'h1',
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
