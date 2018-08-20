$(function () {
  var city = 'Wakayama';
  var key = '44808d9a46863e33a7d8c9396dfeedbe';
  var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + ',JP&units=metric&APPID=' + key;
  $.getJSON(url, function (data) {
    if (!data.cod || data.cod != 200) {
      return;
    }

    $("#temp").text(data.main.temp);
    $("#temp_max").text(data.main.temp_max);
    $("#temp_min").text(data.main.temp_min);
    var icon = data.weather[0].icon;
    $("#weather_icon").html('<img src="https://openweathermap.org/img/w/' + icon + '.png">')
    $("#weather").text(data.weather[0].main);
  });
});
