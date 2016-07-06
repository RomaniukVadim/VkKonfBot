'use strict';

(o) => {
  o['$'].callMethod('messages.getChat', {chat_id: o['body'][3] - 2e9, fields: 'first_name, last_name'}, (ans) => {
    try {
      ans = JSON.parse(ans)['response']['users'];
      let user = ans[parseInt(Math.random() * Object.keys(ans).length - 1)];
      o['bot'].send(`&#127823; Я думаю это ${user['first_name']} ${user['last_name']}`, o['body'], {});
    } catch(e) {
      o['bot'].send('Команду можно использовать только в конференциях', o['body'], {});
    }
  });
}
