const express = require('express');
const productRoute = require('./product.route');
const flickrRoute = require('./flickr.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/product',
    route: productRoute,
  },
  {
    path: '/flickr',
    route: flickrRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
