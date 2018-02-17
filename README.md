# アレクサスキル　サンプル

([English below](README.en.md))

このスキルは Alexa Day 2018 の Alexa Skill Contest に提出したものになります。

[https://alexaday2018.jaws-ug.jp/session/207/](https://alexaday2018.jaws-ug.jp/session/207/)

## 機能

- うちなーぐちを聞くことが出来ます！

## 使い方

```
アレクサ、うちなーぐちを開いて
    >> はいたい、ちゃーがんじゅう？
     いろんな知的な会話・・・　
    >> にふぇーでーびる。またんめんそーりよー
```

## リポジトリのコンテンツ

```
/.ask	- ASK CLI (Command Line Interface) Configuration
/lambda/custom - Back-End Logic for the Alexa Skill hosted on AWS Lambda
/models - Voice User Interface and Language Specific Interaction Models
skill.json	- Skill Manifest
```

## ビルド方法

Node.js 4.5以降が必要です。

SDKの準備は以下の通りです。

```
$ npm install -g alexa-sdk
$ npm install -g ask-cli
$ ask init
```

スキルのひな形を作ります。
（このとき、カレントディレクトリにスキル名のディレクトリが有ると作成されないのでご注意）

```
$ ask new -p default
```

詳細はこちらで確認してください [https://developer.amazon.com/ja/docs/smapi/ask-cli-command-reference.html#new-command](https://developer.amazon.com/ja/docs/smapi/ask-cli-command-reference.html#new-command)

これであなたのスキルのコードを書いてデプロイする用意が出来ました。

Lambda関数のコードはここに有ります。

```
./lambda/custom/index.js
```

詳細はこちらをご確認ください [https://github.com/alexa/skill-sample-nodejs-fact](https://github.com/alexa/skill-sample-nodejs-fact)

スキルのデプロイ。

```
$ ask deploy -p default
```

デベロッパーコンソールからスキルの状態を確認します。 [https://developer.amazon.com/](https://developer.amazon.com/)

## エミュレータでテスト

https://echosim.io/

につないでテストしてください。

## Author

[Koichiro Nishijima](https://github.com/k-nishijima/)

## License

MIT
