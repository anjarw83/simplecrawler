# Simple News Crawler
Simple web crawler to capture latest news on a web site using NodeJs, Cheerio and axios


## General Info
This web crawler only capture new on this website:
* antaranews.com
    * Categories : Latest


## Configuration
Put configuration in .env File

Currently Available Options ( Default value ):
* OUTPUT_FILE="mynews.json"
* LIMIT_NEWS=5 


## SETUP & RUN
Setup & Install : 
```
$ npm install
```

Run :
```
$ npm start
```

## Output Sample in JSON Format
```
{
    "latest" : [
        {
            "title" : "News Title",
            "content_text" : "News One",
            "content_html" : "<div>News one</div>"
        }
    ]

}
```

## TODO
* Remove some unused tags from content html received
* Get Date from received response

## LICENSE
This project is licensed under the terms of the <b>MIT</b> license.



