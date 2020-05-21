/**
 * Available Category :
 *  - latest : 'Terkini
 * 
 */

const cheerio = require('cheerio');
const axios   = require('axios');
const fs      = require('fs');

const FILENAME = process.env.OUTPUT_FILE || "antaranews.json";
const LIMIT_NEWS = process.env.LIMIT_NEWS || 5;


class antaraNews {

    config = {
        url: 'https://antaranews.com',
        root: '#ulx_terkininew',
    }

    tmpData = '';
    outputJson = '';

    constructor(){

    }

    load(){
        console.log(`[ INFO ] Get ${this.config.url}`);

        return new Promise( (resolve, reject) => {

            axios.get(this.config.url,{})
                .then( resp => {
                    console.log(`[RECV] ${this.config.url}`) ;
                    const $ = cheerio.load(resp.data);
                    // this.tmpData['root'] = $(this.config.root);
                    let _tmp = $(this.config.root).find('article').find('header').find('a');
                    this.tmpData = this.normalizeObject(_tmp);

                    resolve($);
                }).catch( err => reject(err));
        })
    }

    parse(save=false){
        console.log('[ INFO ] Parsing in progress ...');

        // console.log(' [ DATA ] Article : ', this.tmpData);
        let output = [];

        let i =0;
            // Exclude Video 
            // Filtering & Formating : Only Get Content Non-Video Link

        this.tmpData.forEach( el => {
            if ( el.attribs.title !== "Video" ){
                output.push({
                    title: el.attribs.title,
                    contentUrl: el.attribs.href
                });
            }
        }); 
        
        // Get Details
        // this.outputJson = output; // Main URL 
        this.getContent(output)
            .then(resp => {

                console.log('[ INFO ] Parsing Completed');
                if(save) this.save(resp);
            }).catch( err => console.log(err));

    }

    /**
     * 
     * @param {Array} mainPage 
     */
    getContent(categoryData){
        let promise = [], count = 0;

        for(let i=0; i < (categoryData.length -1);i++ ){

            const el = categoryData[i];

            // Only Process Berita
            const isBerita = /\/berita\//.test(el.contentUrl) ;
            if ( isBerita && count <= LIMIT_NEWS ) {
                count++;
                promise.push(
                    new Promise( (resolve, reject) => {
        
                        axios.get(el.contentUrl,{})
                            .then( (resp) =>{
        
                                const ch = cheerio.load(resp.data);
                                let contentHtml = ch('article>div.post-content').html();
                                let quotes = ch('.quote_old').html();
                                // const ch2 = cheerio.load(contentHtml);
                                // let articleData = ch('article').find('.article-date');
                                let articleData = '19 Mei 2020';
        
                                contentHtml.replace(`<div class="quote_old">${quotes}</div>`,'');
        
                                // console.log(`[ DETAIL ] ${contentHtml}`);
                                let out2 = {
                                    title: el.title,
                                    content_detail_url : el.contentUrl,
                                    content_date : articleData,
                                    content_html: JSON.stringify( contentHtml )
                                }
                                resolve(out2);
                            }).catch( err => reject(err));
                    })
                );
            }
        }
        // let el = this.tmpData[0];

        return Promise.all(promise)
            .then( resp => {
                return resp;
            })
    }


    save(data){
        console.log('[ INFO ] Saving in progress ...');

        fs.writeFile( FILENAME, JSON.stringify(data, null, 4), 'utf8', function (err) {
            if (err) {
                console.log("[ ERROR ] An error occured while writing JSON Object to File.");
                return console.log(err);
            }
         
            console.log(`[ INFO ] JSON ${FILENAME} file has been saved.`);
        }); 

    }

    normalizeObject(object){
        const data = [];
        for( let i = 0; i < object.length ;i ++) {
            data.push(object[i]);
        }
        return data;
    }
    

}

module.exports= antaraNews;