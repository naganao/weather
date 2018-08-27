$(function () {

  // Geolocation APIに対応している
  if (navigator.geolocation) {
    $("#geo_status").text("この端末では位置情報が取得できます");
    // Geolocation APIに対応していない
  } else {
    $("#geo_status").text("この端末では位置情報が取得できません");
  }

  var lat;
  var lon;

  // 現在地を取得
  navigator.geolocation.getCurrentPosition(
    // 取得成功した場合
    function(position) {
      lat = position.coords.latitude;
      lon = position.coords.longitude;
      getWeather(lat, lon);
    },
    // 取得失敗した場合
    function(error) {
      switch(error.code) {
        case 1: //PERMISSION_DENIED
        alert("位置情報の利用が許可されていません");
        break;
        case 2: //POSITION_UNAVAILABLE
        alert("現在位置が取得できませんでした");
        break;
        case 3: //TIMEOUT
        alert("タイムアウトになりました");
        break;
        default:
        alert("その他のエラー(エラーコード:"+error.code+")");
        break;
      }
    }
  );

});

function getWeather(lat, lon) {

  // var city = 'Wakayama';
  // var key = '44808d9a46863e33a7d8c9396dfeedbe';
  // var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + ',JP&units=metric&APPID=' + key;

  var key = '44808d9a46863e33a7d8c9396dfeedbe';
  var url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=metric&APPID=' + key;
  $.getJSON(url, function (data) {
    if (!data.cod || data.cod != 200) {
      return;
    }

    $("#city_name").text(data.name);
    $("#temp").text(data.main.temp);
    $("#temp_max").text(data.main.temp_max);
    $("#temp_min").text(data.main.temp_min);
    var icon = data.weather[0].icon;
    $("#weather_icon").html('<img src="https://openweathermap.org/img/w/' + icon + '.png">')
    $("#weather").text(data.weather[0].main);
  });
}
