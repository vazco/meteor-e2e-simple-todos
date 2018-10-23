# Universe:E2E demo project

This repo is a example usage of [universe:e2e](https://github.com/vazco/meteor-universe-e2e) - a complete end-to-end/acceptance testing solution for Meteor based on Mocha & Puppeteer.

You can [compare the e2e branch](https://github.com/vazco/meteor-e2e-simple-todos/compare/master...e2e) to see what changes are required to implement this type of testing solution, or browse source code on your own.

Most interesting parts are located in the `/imports/e2e-tests` directory.

## Installation

1. You must have [Meteor installed](https://www.meteor.com/install)
2. Clone and go to this repo
3. Install dependencies with `meteor npm install`

## Usage

To run tests in watch mode (non-headless developer mode):

```
meteor npm run e2e
```

For headless, CI-ready tests just execute:
```
meteor npm test
```

For full documentation please go to [universe:e2e repository](https://github.com/vazco/meteor-universe-e2e).


-- -- --

Original readme below:

# Simple Todo List
The Meteor Tutorial app.

Use it to share a single todo list with your friends. The list updates on everyone's screen in real time, and you can make tasks private if you don't want others to see them.

Learn how to build this app by following the [Meteor Tutorial](https://www.meteor.com/tutorials/react/creating-an-app).

Read more about building apps with Meteor in the [Meteor Guide](http://guide.meteor.com).

![screenshot](screenshot.png)
