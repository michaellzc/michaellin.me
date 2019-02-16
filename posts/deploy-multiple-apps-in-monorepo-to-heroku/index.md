---
date: '2019-02-16'
title: 'Setup Heroku Monorepo Deployment'
description: 'How to deploy multiple applications in monorepo with Heroku'
---

Heroku is one of the biggest PaaS cloud service provider that helps developer to painless build, run, and operate applications.

The usual way to setup a Heroku application is one repo per application. Monorepo, one of the many buzzwords in the developer community. There are both advantage and disadvantage of using monorepo to manage your projects. Anyway, this is not the point of this article. We will be focusing on deploying multiple applications in a monorepo to Heroku.

Let's say you have a single Git repository that contains a Django application and a React application with client side routing. Moreover, you don't want to serve your React application from Django, instead you would like to use another Heroku instance to serve your client application.

> **Disclaimer**: You should properly use service like [**Netlify**](https://www.netlify.com/) to serve your React app in real world. This example is only intented for demonstration purpose.

For example, this is your project structure.

```
├── django_app         # a Django app - Backend
├── client             # a React app bootstrapped with Create React App - Frontend
│   ├── public
|   |── src
|   |── yarn.lock
│   └── package.json
└── manage.py
```

### 1. Create a dyno for both Django app and React app

Let's call our Django app `backend`, React app `frontend`.

```sh
$ heroku create backend --remote heroku-backend
$ heroku create frontend --remote heroku-frontend
```

To serve our React app, we will deploy an Express app to serve built static files.

```sh
$ touch client/server.js
```

```js
const express = require('express')
const proxy = require('http-proxy-middleware')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5000

// Proxy api request
// Optional, if you don't want your add CORS support to your Django app
app.use(
  '/api',
  proxy({
    target: process.env.API_ROOT_URL,
    changeOrigin: true,
    ws: true,
    pathRewrite: {
      '^/api': '',
    },
  })
)

app.use(express.static(path.join(__dirname, 'build')))

// https://facebook.github.io/create-react-app/docs/deployment#serving-apps-with-client-side-routing
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(PORT, () => console.log(`Listening on :${PORT}`))
```

Also, add a new `heroku-postbuild` script to `client/package.json` to let Heroku knows how to build your React app.

```json
{
    // ...,
    "scripts: {
        "heroku-postbuild": "npm run build"
    }
}
```

### 2. Create two seperate `Procfile`

> Heroku apps include a Procfile that specifies the commands that are executed by the app on startup. You can use a Procfile to declare a variety of process types, including:
>
> - Your app’s web server
> - Multiple types of worker processes
> - A singleton process, such as a clock
> - Tasks to run before a new release is deployed

```sh
$ touch Procfile
$ touch client/Procfile
```

```sh
# Procfile
release: python manage.py migrate --noinput
web: gunicorn api.wsgi
```

```sh
# client/Procfile
web: node server.js
```

### 3. Deploy your application

Commit all your changes.

```sh
$ git push heroku-backend master
```

```sh
$ heroku buildpacks:add -a frontend heroku/nodejs

# make sure monorepo buildpack is defined first
$ heroku buildpacks:add -a frontend -i 1 https://github.com/lstoll/heroku-buildpack-monorepo

# set the root of your frontend app
$ heroku -a frontend config:set APP_BASE client

# now, deploy
$ git push heroku-frontend master
```
