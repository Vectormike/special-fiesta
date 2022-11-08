/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-console */
$(document).ready(function () {
  const flickerAPI = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=landscape&per_page=20';
  console.log('flickerAPI: ', flickerAPI);
  $.ajax({
    url: flickerAPI,
    dataType: 'jsonp',
    jsonpCallback: 'jsonFlickrFeed',
    success(result, status, xhr) {
      $.each(result.items, function (i, item) {
        $('<div>').attr('id', `image-wrapper-${i}`).attr('class', 'image-wrapper').appendTo('#results');
        $('<img>').attr('src', item.media.m).appendTo(`#image-wrapper-${i}`);
      });
    },
    error(xhr, status, error) {
      console.log(xhr);
    },
  });
});
