'use strict';

(o) => {
  o['$'].callMethod('video.search', {
    q: o['text'],
    count: 8
  }, (ans) => {
    ans = JSON.parse(ans)['response']['items']; let res = {}, str = '';
    if(ans[0] !== undefined) {
      for(let key in ans)
        res[key] = `video${ans[key]['owner_id']}_${ans[key]['id']}`;
    } else {
      res = false; str = `По этому запросу ничего не найдено`;
    }
    o['bot'].send(str, o['body'], {
      attachMessage: true,
      attach: res
    });
  });
}
