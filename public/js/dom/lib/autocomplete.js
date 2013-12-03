  function tagAutocomplete(obj) {
        obj.autocomplete({
            paramName: 'input',
            serviceUrl: 'http://192.168.137.10:5000/api/tags/search/',
            onSelect: function (suggestion) {
                //$('#l').focus();
            },
            transformResult: function(response) {
              return {
                suggestions: $.map($.parseJSON(response), function(dataItem) {
                  /*var a = '';
                  if (dataItem.address.hasOwnProperty('road'))
                    a += dataItem.address.road + ', ';
                  if (dataItem.address.hasOwnProperty('city'))
                    a += dataItem.address.city + ', ';
                  if (dataItem.address.hasOwnProperty('country'))
                    a += dataItem.address.country;*/
                  return { value: dataItem.value , data: dataItem.value };
                })
              };
            }
        });
    }

    function locationAutocomplete(obj) {
        obj.autocomplete({
            paramName: 'input',
            serviceUrl: 'https://maps.googleapis.com/maps/api/place/autocomplete/json?types=geocode&language=fr&sensor=false&key=AIzaSyDhECsfYPYNNM7n-x-GuDTE3lwJlL5C_pw',
            onSelect: function (suggestion) {
                //$('#search-button').attr('disabled','disabled');
                $.ajax({
                    url: "https://maps.googleapis.com/maps/api/place/details/json?reference="+suggestion.data+"&sensor=true&key=AIzaSyDhECsfYPYNNM7n-x-GuDTE3lwJlL5C_pw",
                }).done(function( data ) {
                    $('#lat').val(data.result.geometry.location.lat);
                    $('#lng').val(data.result.geometry.location.lng);
                    $('#home-explore-form').submit();
                    //$('#search-button').removeAttr('disabled');
                });
            },
            transformResult: function(response) {
              return {
                suggestions: $.map($.parseJSON(response).predictions, function(dataItem) {
                  /*var a = '';
                  if (dataItem.address.hasOwnProperty('road'))
                    a += dataItem.address.road + ', ';
                  if (dataItem.address.hasOwnProperty('city'))
                    a += dataItem.address.city + ', ';
                  if (dataItem.address.hasOwnProperty('country'))
                    a += dataItem.address.country;*/
                  return { value: dataItem.description , data: dataItem.reference };
                })
              };
            }
        });
    }
