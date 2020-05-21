const antaraNews = require('./antaraModules.js');

class NewsModules {

    output = {
        antara_news: null
    }

    constructor(){

    }

    init(){
        console.log('Start Capturing ...');
        this.loadAntaraNews();

    }

    loadAntaraNews(){
        const antara = new antaraNews();
        antara.load()
            .then( resp=> {
                const save = true;
                antara.parse(save);
                // antara.save();
            }).catch( err => console.log(err));
    }

    




}

module.exports = NewsModules;