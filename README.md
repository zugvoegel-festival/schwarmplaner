# Schwarmvogel - Organize Your Shifts


Mockups

https://www.figma.com/proto/Ht9BKR6toCg3TKde2W3XTS/ZV-Schwarmplaner?node-id=0%3A1&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=2%3A497&show-proto-sidebar=1



-------------------
# Boilerplate and Basics

https://www.bezkoder.com/vue-js-node-js-express-mysql-crud-example/

https://github.com/bezkoder/vue-js-node-js-express-mysql

Boilerplate based on

https://github.com/chrisleekr/nodejs-vuejs-mysql-boilerplate

## How to start your local dev environment

Requierments

Install vuel cli 
```sh 

npm install -g @vue/cli
# OR
yarn global add @vue/cli

```
1. open /api and /frontend-vue in two seperate vscode windows

```sh
$ code ./api && code ./frontend-vue
```

2. first time use:
   1. run in /api and /frontend-vue  `npm install `
   2. run in /   `docker-compose -f docker-compose.mysql.only.yml up -d`
3. start api
    1. press F5 to start node server and attach debug session in your vscode api window
4. start frontend
    1. run in /frontend-vue `npm run dev` 
    2. press F5 to attach debug session in your vscode frontend-vue window

