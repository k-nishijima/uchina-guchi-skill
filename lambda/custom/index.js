'use strict';
var Alexa = require("alexa-sdk");
const QueryKintoneRecords = require("./QueryKintoneRecords");
const queryKintoneRecords = new QueryKintoneRecords.QueryKintoneRecords(
  process.env.KINTONE_SUBDOMAIN, process.env.KINTONE_APP_ID, process.env.KINTONE_API_TOKEN);

var expressions = [];

exports.handler = function (event, context) {
  queryKintoneRecords.queryRecords("", ["$id", "v", "t", "d"])
    .then(records => {
      records.forEach(record => {
        expressions.push({ v: record["v"]["value"], t: record["t"]["value"], d: record["d"]["value"] });
      });

      var alexa = Alexa.handler(event, context);
      alexa.registerHandlers(handlers);
      alexa.execute();
    });
};

var hello = '<prosody pitch="high" rate="120%">ハイたい！</prosody> ';
var ask = '私はいろんなうちなーぐちを知っています。「何か教えて」と話しかけてください。';

var handlers = {
    'LaunchRequest': function () {
        this.emit('SayHello');
    },
    'HelloIntent': function () {
        this.emit('SayHello');
    },
    'SayHello': function () {
        this.response.speak(hello + 'めんそーれ。ウナメーヤヌーンディガ。')
            .listen('お名前は何ですか？ 例えば「私は アレクサ です」と話しかけてください。')
            .cardRenderer('はいたい めんそーれ。うなめーやぬーんでぃが。', '意味：おはよう・こんにちは・こんばんは、ようこそ！ お名前は何ですか？');
        this.emit(':responseReady');
    },
    'UchinaIntent': function () {
        var res = expressions[Math.floor(Math.random() * expressions.length)];
        this.response.speak(res.v)
            .listen(ask)
            .cardRenderer(res.t, '意味：'+ res.d);
        this.emit(':responseReady');
    },
    'NameIntent': function () {
        var name = this.event.request.intent.slots.name.value;
        var talk = hello + name + 'さん';
        var title = 'はいたい '+ name + 'さん';
        var desc = '意味：こんにちは '+ name + 'さん';
        this.response.speak(talk)
            .listen(ask)
            .cardRenderer(title, desc);
        this.emit(':responseReady');
    },
    'SessionEndedRequest' : function() {
        console.log('Session ended with reason: ' + this.event.request.reason);
    },
    'AMAZON.StopIntent' : function() {
        this.emit('Closed');
    },
    'AMAZON.HelpIntent' : function() {
        this.emit('SayHello');
    },
    'AMAZON.CancelIntent' : function() {
        this.emit('Closed');
    },
    'Closed' : function() {
        this.response.speak('にふぇーでーびる。またんめんそーりよー')
            .cardRenderer('にふぇーでーびる。またんめんそーりよー',
            '意味：ありがとうございます。また来てくださいね。');
        this.emit(':responseReady');
    },
    'Unhandled' : function() {
        this.response.speak("ごめんなさい、よく分かりませんでした。私に向かって「何か喋って」と言ってください。")
            .listen(ask);
    }
};
