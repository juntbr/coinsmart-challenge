## Getting Started

First, import from repo
```bash
git clone git@github.com:juntbr/coinsmart-challenge.git
```

then, run install deps:

```bash
npm i && npm start
```


to run tests

```bash
npm run test
```

Open http://localhost:8080 with your browser to see the magic

Few words on which features were selected and why?

I created a simple web chat app with three features:

● As a User of the web-app, I can see a list of all the channels <br />
● As a User of the web-app, I can join a channel and see the history of it <br />
● As a User of the web-app, I can send messages to a channel after I have joined it <br />

These features are necessary for a chat. The rest would be considered as extra features in my opinion. 


Possible next steps if you had more time. What assumptions did you make?

I developed it in just four days. So in my opinion after developing, I could refactor my architecture to sync firebase websockets requests inside application folder (redux), then I would have a more testable code, with 100% reliable testing.

Then I would add: <br /> ● I can interact with received messages in a channel and reply to them. Actually this is a really cool feature to develop.

I could also improve web perfomance, however the google lighthouse score for the website it's good, almost 90 points.
