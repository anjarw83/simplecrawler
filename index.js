require('dotenv').config();

const News = require('./src/newsModules.js');
const LIMIT_NEWS = process.env.LIMIT_NEWS || 5;


let news = new News();

news.init();

    // .then((resp) => {
    //     console.log(' [ DONE ] Request Completed --- ');
    // }).catch( err => console.log(err ));


