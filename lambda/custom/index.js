'use strict';
var Alexa = require("alexa-sdk");

exports.handler = function(event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
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
        var expressions = [
            {v: '<prosody rate="slow"><prosody pitch="high">ゆん</prosody>タクしましょうねー</prosody>',
                t: 'ゆんたくしましょうね', d:'お喋りしましょう'},
            {v: 'ダカラよぉー', t: 'だからよー', d:'そうだねぇ'},
            {v: '<prosody rate="slow">いっぱい<prosody pitch="high">してた</prosody>でしょ？</prosody>',
                t: 'いっぱいしてたでしょ', d:'混雑してたでしょ？'},
            {v: '<prosody pitch="high">あがっ</prosody>',
                t: 'あがっ', d:'痛っ'},
            {v: 'いいはず', t: 'いいはず', d:'いいね！'},
            {v: '<prosody rate="slow"><prosody pitch="low">べんきょう</prosody>しましょうね〜</prosody>',
                t: '勉強しましょうね', d:'（私が）勉強しておきます'},
            {v: '<prosody rate="90%">なンくるないさー</prosody>',
                t: 'なんくるないさ', d:'努力すれば、いつかいい時が訪れる。なんとかなる'},
            {v: 'いま来るから', t: 'いま来るから', d:'（私が）いま行くから'},
            {v: '<prosody pitch="high" rate="110%">チバリヨー</prosody>',
                t: 'チバリヨー', d:'頑張れ'},
            {v: '<prosody pitch="x-high">じょうとう</prosody><prosody pitch="x-low">さあー</prosody>',
                t: '上等さ〜', d:'いいね！いいじゃん！'},
            {v: '<prosody rate="90%">あきさみ<prosody pitch="low">よおー</prosody></prosody>',
                t: 'あきさみよー', d:'あぁ、なんとまぁ'},
            {v: 'でーじやっさー', t: 'でーじやっさー', d:'大変だなぁ'},
            {v: '<prosody rate="slow"><prosody pitch="x-low">ちゃ</prosody>たん</prosody>',
                t: '北谷', d:'（地名）北谷「ちゃたん」'},
            {v: 'あちこーこー', t: 'あちこーこー', d:'出来たてほかほか（の食べ物）'},
            // {v: '', t: '', d:''},

            {v: 'きょうはじかんないサぁ', t: '今日は時間ないさー', d:'今日は時間が無いです'}
        ];

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
        this.response.speak('にふぇーでーびる。まためんそーりよー')
            .cardRenderer('にふぇーでーびる。まためんそーりよー',
            '意味：ありがとうございます。また来てくださいね。');
        this.emit(':responseReady');
    },
    'Unhandled' : function() {
        this.response.speak("ごめんなさい、よく分かりませんでした。私に向かって「何か喋って」と言ってください。")
            .listen(ask);
    }
};
