#!/usr/bin/node
// This script creates a POST request to an API with Content-Type: application/json and an empty dictionary 
// in the body - cURL version: curl "http://0.0.0.0:5001/api/v1/places_search" -XPOST -H "Content-Type: application/json" -d '{}'
// Loop into the result of the request and create an article tag representing a Place in the section.places
$(document).ready(function () {
    const amenityDict = {};
    $('input[type="checkbox"]').change(function () {
      if (this.checked) {
        amenityDict[$(this).data('id')] = $(this).data('name');
      } else {
        delete amenityDict[$(this).data('id')];
      }
      const amenityList = Object.values(amenityDict);
      if (amenityList.length === 0) {
        $('.amenities h4').html('&nbsp;');
      } else {
        $('.amenities h4').text(Object.values(amenityDict).join(', '));
      }
    });
    $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
      if (textStatus === 'success') {
        $('DIV#api_status').addClass('available');
      } else {
        $('DIV#api_status').removeClass('available');
      }
    });
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: '{}',
      success: function (data) {
        for (const place of data) {
          $('.places').append('<article><div class="title"><h2>' + place.name + 
                              '</h2><div class="price_by_night">$' + place.price_by_night + 
                              '</div></div><div class="information"><div class="max_guest">' + place.max_guest + 
                              ' Guest' + (place.max_guest !== 1 ? 's' : '') + 
                              '</div><div class="number_rooms">' + place.number_rooms + 
                              ' Bedroom' + (place.number_rooms !== 1 ? 's' : '') + 
                              '</div><div class="number_bathrooms">' + place.number_bathrooms + 
                              ' Bathroom' + (place.number_bathrooms !== 1 ? 's' : '') + 
                              '</div></div><div class="description">' + place.description + '</div></article>');
        }
      }
  })});