require('dotenv').config()
const uploadHtmlToFAQ = require('./commands/uploadHtmlToFAQ')

// uploadHtmlToFAQ('https://ec.europa.eu/echo/faq_en')


var Xray = require('x-ray')
var xray = Xray()

const base = (number) => `https://ec.europa.eu/search/?queryText=faq&query_source=europa_default&page=${number}&filter=GENERAL_FILTER%3A%3AEU+IN+THE+WORLD__GENERAL_FILTER%3A%3AEU+IN+THE+WORLD%3A%3ADEVELOPMENT+AND+HUMANITARIAN+AID&swlang=en&filterSource=europa_default&more_options_date=-365&more_options_language=en&more_options_f_formats=htm`
//
// xray(base, 'head meta@charset', [
//   {
//     // link: '#main-content div div:nth-child(2) section ul li
// a:nth-child(2)@href' // title: '#main-content div div:nth-child(2) section
// ul li a:nth-child(1)', title: 'div class', link: 'div class' } ])
// .paginate('#main-content > div > div:nth-child(2) > section > nav > ul >
// li.ecl-pager__item.ecl-pager__item--next > a@href') .limit(2)
// .write('results.json')
// xray('http://google.com', '.get')(function (err, title) {
//   console.log(title) // Google
// })

counter = 1
xray(base(counter), 'section > ul > li', [
            {
            title: 'h4 a@html',
            url: 'h4 a@href'
            }
    ]).paginate(function(){
        counter += 1
        console.log(counter)
        return base(counter)
    }).limit(10)(async function(err, obj) {
        for (let item of obj){
            await uploadHtmlToFAQ(item.url, item.title)
        }
    })