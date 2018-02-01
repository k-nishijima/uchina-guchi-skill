# Alexa skill example

This skill is the proposal for Alexa Skill Contest on Alexa Day 2018.
[https://alexaday2018.jaws-ug.jp/session/207/](https://alexaday2018.jaws-ug.jp/session/207/)

## Features

- You can listen to Okinawan Japanese that called "uchina-guchi".

## Repository Contents

```
/.ask	- ASK CLI (Command Line Interface) Configuration
/lambda/custom - Back-End Logic for the Alexa Skill hosted on AWS Lambda
/models - Voice User Interface and Language Specific Interaction Models
skill.json	- Skill Manifest
```

## How to build / Tutorial

Requirement: Node.js 4.5 or greater and Node Package Manager.

Preparing SDK.

```
$ npm install --save alexa-sdk
$ npm install -g ask-cli
$ ask init
```

Create skill.

(Notice: This command creates skill name's directory. If already exists, fail to create skill project.)

```
$ ask new -p default
```

detail: see [https://developer.amazon.com/ja/docs/smapi/ask-cli-command-reference.html#new-command](https://developer.amazon.com/ja/docs/smapi/ask-cli-command-reference.html#new-command)

Okay, you can write your code and deploy your skill!

Your lambda function is here.

```
./lambda/custom/index.js
```

Please check some details via [https://github.com/alexa/skill-sample-nodejs-fact](https://github.com/alexa/skill-sample-nodejs-fact)

Deploy skill.

```
$ ask deploy -p default
```

You can check your skill via developer console. see [https://developer.amazon.com/](https://developer.amazon.com/)


## Author

[Koichiro Nishijima](https://github.com/k-nishijima/)

## License

MIT
