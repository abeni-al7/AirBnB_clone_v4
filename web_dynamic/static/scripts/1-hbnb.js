#!/usr/bin/node
// This script listens to checkbox changes and updates the list of checked amenities in the h4 tag of DIV
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
});
