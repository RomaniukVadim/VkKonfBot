'use strict';

(o) => {
  o['$'].callMethod('wall.get', {
    domain: (o['arg'][0] !== undefined) ? o['arg'][0] : 'oldlentach',
    count: 20,
    offset: (o['arg'][1] !== undefined) ? parseInt(o['arg'][1]) : 1
  }, (ans) => {
    try {
      ans = JSON.parse(ans)['response']['items']; let randObj = parseInt(Math.random() * Object.keys(ans).length - 1);
      o['bot'].send('', o['body'], {
        attachMessage: false,
        attach: {
          wall: `wall${ans[randObj]['from_id']}_${ans[randObj]['id']}`
        }
      });
    } catch(e) {
      o['bot'].send('Не могу получить записи', o['body'], {});
    }
  });
}
