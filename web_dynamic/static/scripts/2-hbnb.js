#!/usr/bin/node
// This script requests 'http://0.0.0.0:5001/api/v1/status/' and if the status is OK it adds the class available
// to the DIV#api_status otherwise it removes the class available from the DIV#api_status
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
});

  