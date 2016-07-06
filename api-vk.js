'use strict';

let request = require('request'),
    logger  = require('./botmodule/log');

class apiVK {
  constructor(login, password) {
    this.apiUrl     = 'https://api.vk.com/method/';
    this.authUrl    = 'https://oauth.vk.com/token';
    this.botVer     = '5.45';
    this.login      = login;
    this.password   = password;
  }

  auth(callback) {
    request({
      url: this.authUrl,
      qs: {
        grant_type:     'password',
        client_id:      2274003,
        client_secret:  'hHbZxrka2uZ6jB1inYsH',
        username:       this.login,
        password:       this.password,
        v:              this.botVer
      }
    }, (error, response, body) => {
      try {
         if (!error && response.statusCode === 200) {
          body = JSON.parse(body);

          this.token  = body['access_token'];
          this.bodyID = body['user_id'];

          logger.info('[Auth] Success');

          callback();
        } else {
          body = JSON.parse(body);

          throw new Error(body['error_description']);
        }
      } catch(e) { throw new Error(e) }
    })
  }

  longPoll(callback) {
    let longPollMap = new Map();

    longPollMap.set('getLongPoll', () => {
      this.callMethod('messages.getLongPollServer', {}, (body) => {
        this.tempPoll     = JSON.parse(body)['response'];

        longPollMap.get('callLongPoll')();
      });
    });

    longPollMap.set('callLongPoll', () => {
      request({
        url: 'http://'+this.tempPoll['server'],
        qs: {
          act:         'a_check',
          key:          this.tempPoll['key'].substr(0, (this.tempPoll['key'].length - 10)),
          ts:           this.tempPoll['ts'],
          wait:         25,
          mode:         8
        }
      }, (error, response, body) => {
        try {
          body = JSON.parse(body);
          if('failed' in body)
            longPollMap.get('getLongPoll')();
          else {
            this.tempPoll['ts'] = body['ts'];
          callback(body);

          longPollMap.get('callLongPoll')();
          }
        } catch(e) {
          //throw new Error(e);
          logger.error(e);
          //logger.info('[callLongPoll] Old server, reload getLongPoll');
          longPollMap.get('getLongPoll')();
        }
      });
    });

    longPollMap.get('getLongPoll')();
  }

  callMethod(name, options, callback) {
    if(options['access_token'] !== false)
      options['access_token'] = this.token;
    if(name != 'messages.getLongPollServer')
      options['v']            = this.botVer;

    request({
      url: this.apiUrl + name,
      qs: options,
      timeout: 20000
    }, (error, response, body) => {
      try {
        if (!error && response.statusCode === 200) {
          callback(body);
        } else {
          if(options !== null)
            this.callMethod(name, options, callback);
          logger.error(`[callMethod] ${name} ${error} ${response}`);
        }
      } catch(e) { logger.error(`[callMethod] ${e}`) }
    })
  }
}

module.exports = apiVK;
