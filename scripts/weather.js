'use strict';

(o) => {
  o['request']({
    url: `http://api.openweathermap.org/data/2.5/weather?q=${encodeURI(o['text'])}&appid=44db6a862fba0b067b1930da0d769e98&lang=ru`,
  }, (error, response, ans) => {
    try {
      ans = JSON.parse(ans);
      let str = '', temp = parseInt(ans['main']['temp']-273),
      icon = {
        'Clouds': '&#9729;', 'Rain': '&#127783;', 'Mist': '&#127787;', 'Snow': '&#127784;', 'Clear': '&#9728;'
      };
      str = `&#128311; Погода в ${ans['name']}(${ans['sys']['country']})
             ${icon[ans['weather'][0]['main']]} Сейчас: ${ans['weather'][0]['description']}
             ${temp > 0 ? `&#9728;`: `&#10052;`} Текущая температура: ${temp}°C
             &#128317; Давление: ${ans['main']['pressure']}
             &#128167; Влажность: ${ans['main']['humidity']}
             &#128168; Скорость ветра: ${ans['wind']['speed']}м/с`;
      o['bot'].send(str, o['body'], {});
    } catch(e) {
      o['bot'].send('Город не найден', o['body'], {});
    }
  });
}
