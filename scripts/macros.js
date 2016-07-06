'use strict';

(o) => {
  o['$'].callMethod('messages.getChat', {chat_id: o['body'][3] - 2e9, fields: 'first_name, last_name'}, (ans) => {
    try {
      ans = JSON.parse(ans)['response']['users'];
      let macMap = new Map(), rand, data, replace;

      macMap.set('user', () => {
        rand = parseInt(Math.random() * Object.keys(ans).length - 1);
        return `${ans[rand]['first_name']} ${ans[rand]['last_name']}`;
      });
      macMap.set('num', () => parseInt(Math.random() * 1000));
      macMap.set('word', (word) => {
        if(word !== undefined) {
          word = word.split(',').map((key) => key.trim());
          return word[parseInt(Math.random() * word.length)];
        } else {
          return 'word указан неправильно';
        }
      });

      if(o['arg'][0] !== undefined) {
        try {
          data = fs.readFileSync(`./macros/${o['arg'][0]}.txt`, {encoding: 'utf8'});
          data = data.replace(/(%(\w+)%)/g, (match, p1, p2) => macMap.get(p2)()).replace(/\w+\.\w{2,6}/g, '');
          o['bot'].send(`-- ${data}`, o['body'], {});
        } catch(e) {
          console.log(e);
          o['bot'].send(`Не удалось найти шаблон`, o['body'], {});
        }
      } else {
        replace = o['text'].replace(/(%(\w+)(=(.+?)|)%)/g, (match, p1, p2, p3, p4) => macMap.get(p2)(p4)).replace(/\w+\.\w{2,6}/g, '');
        o['bot'].send(`-- ${replace}`, o['body'], {});
      }
    } catch(e) {
      console.log(e);
    }
  });
}
