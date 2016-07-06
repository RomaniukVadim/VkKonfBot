'use strict';

(o) => {
  Array.prototype.shuffle = function() {
    for (let i = this.length - 1; i > 0; i--) {
      let num = Math.floor(Math.random() * (i + 1));
      let d = this[num];
      this[num] = this[i];
      this[i] = d;
    }
    return this;
  };

  o['$'].callMethod('messages.getChat', {chat_id: o['body'][3] - 2e9, fields: 'first_name, last_name'}, (ans) => {
    try {
      ans = JSON.parse(ans)['response']['users'];
      if(o['arg'][0] === undefined || isNaN(parseInt(o['arg'][0]))) o['arg'][0] = 7;
      let users = ans.shuffle().slice(0, (Math.abs(o['arg'][0]) > 7)? 7 : Math.abs(o['arg'][0])), str = '';
      for(let i = 0; i < Object.keys(users).length; i++) {
        str += `${i+1}&#8419; ${ans[i]['first_name']} ${ans[i]['last_name']} \n`;
      }
      o['bot'].send(str, o['body'], {});
    } catch(e) {
      o['bot'].send('Команду можно использовать только в конференциях', o['body'], {});
    }
  });
}
