'use strict';

let botVK   = require('./bot-vk.js'),
    bot     = new botVK(),
    ch_pr   = require('child_process'),
    random  = require('./botmodule/rand'),
    request = require('request'),
    vm      = require('vm'),
    fs      = require('fs'),
    dns     = require('dns');

bot.launch(() => {

  let $ = bot.api;

  bot.setTypeBot(3);

 //   bot.on('message', (body) => {
 //   bot.callScript('./scripts/get.js', {bot, body, $});
 // });

  bot.on('помощь', (text, arg, body) => {
    bot.callScript('./scripts/help.js', {bot, text, arg, body});
  });

  bot.on('кто', function(text, arg, body)  {
    bot.callScript('./scripts/who.js', {bot, text, arg, body, $});
  });

  bot.on('список', function(text, arg, body)  {
    bot.callScript('./scripts/list.js', {bot, text, arg, body, $});
  });

    bot.on('книги', function(text, arg, body)  {
    bot.callScript('./scripts/knigi.js', {bot, text, arg, body, $});
  });

  bot.on('музыка', (text, arg, body) => {
    bot.callScript('./scripts/music.js', {bot, text, arg, body, $});
  });

  bot.on('видео', (text, arg, body) => {
    bot.callScript('./scripts/video.js', {bot, text, arg, body, $});
  });

  bot.on('погода', (text, arg, body) => {
    bot.callScript('./scripts/weather.js', {bot, text, request, body, $});
  });

  bot.on('паблик', (text, arg, body) => {
    bot.callScript('./scripts/public.js', {bot, text, arg, body, $});
  });

    bot.on('mat', (text, arg, body) => {
    bot.callScript('./scripts/polbu.js', {bot, text, arg, body, $});
  });

      bot.on('get', (text, arg, body) => {
    bot.callScript('./scripts/get.js', {bot, text, arg, body, $});
  });

  bot.on('ping', (text, arg, body) => {
    ch_pr.exec(`ping ${text}`, (err, stdout, stderr) => {
      bot.send(stdout, body, {});
    });
  });

  bot.on('dns', (text, arg, body) => {
      dns.lookup(text, (err, addresses, family) => {
        try {
          let port = (isNaN(parseInt(arg[0], 8))) ? 80 : parseInt(arg[0]);
          dns.lookupService(addresses, port, (err, hostname, service) => {
            bot.send(`ip: ${addresses}, family: ${family}, hostname: ${hostname}, service: ${service}`, body, {});
          });
        } catch(e) {
          bot.send(`Ошибка`, body, {});
        }
      });
  });

  bot.on('limit', (text, arg, body) => {
    bot.send(`Осталось ${20 - bot.limit[body[3]]['msg']}`, body, {});
  });

  bot.on('run', (text, arg, body) => {
    text = text.replace(/<br>/g, '').replace(/\\/g, '').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
    let options = {timeout: 3000},
        script  = new vm.Script(`'use strict'; () => { ${text} }();`, options),
        sandbox = {};
    try {
      let result = script.runInNewContext(sandbox, options).toString().replace(/[A-zА-я]+\.\w{2,6}/g, '');
      bot.send(`Результат: ${result}`, body, {});
    } catch(e) {
      console.log(e);
      bot.send(`Код не выполнился`, body, {});
    }
  });

  bot.on('макрос', (text, arg, body) => {
    bot.callScript('./scripts/macros.js', {bot, text, arg, body, $});
  });

  bot.on('arg', (text, arg, body) => {
    bot.send(`${text}, [${arg.toString()}]`, body, {});
  });
});
