# Purple Cloud API

To run the API locally:

```
node server.js
```

The API is deployed on Heroku:
https://purplecloud-api.herokuapp.com/

To deploy the server to Heroku you need to first create an app at heroku.com, then set your Git remote to point at Heroku:

```
heroku git:remote -a purplecloud-api
```

Deploy the server by pushing the changes to Heroku:

```
git push heroku master
```
