'use strict';
(o) => {
  o['$'].callMethod('messages.getChat', {chat_id: o['body'][3] - 2e9, fields: 'first_name, last_name'}, (ans) => {
      let nouns = ["заёбок", "урод", "пидорас", "выблядок", "шакал", "долбоящер", "мудак", "мудило", "хуило", "пидорок", "лошара", "хуесос", "хуегрыз", "хуевинбин", "пиздолиз", "шлюхоеб", "аутист", "пиздопидор", "тварь", "паскуда", "козел", "придурок", "ублюдок", "пиздобол", "биомусор", "пИтух", "говнокодер", "имбицил", "дельфиноеб", "жиробас", "онанист", "подкаблучник", "баран", "микропидор", "уебок" , "гипераутист", "макролошара", "опущенец", "трайхардер", "ньюфаг", "унтерменш", "клювожор", "рукоблуд", "очкоблядун", "гомосексуалист"];
	  let adjectives = ["блядский", " вонючий", " ссаный", " ебаный", " ебучий", " нахуй", " блять", " хуеблядский", " обиженный", " обдроченный", " зашкваренный", " опущенный", " всратый", " ебанутый", " IBM-PC-несовместимый", " проприетарный", " ретарднутый", " диванный", " быдланутый", " прыщавый", " криворукий", " биомусорообразный"];	  

      o['bot'].send(` &#11015; ${o['$'].callMethod('messages.get')} ${nouns[parseInt(Math.random() * nouns.length - 1)]} ${adjectives[parseInt(Math.random() * adjectives.length - 1)]}`, o['body'], {});
  });
}