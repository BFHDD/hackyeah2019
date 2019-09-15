const axios = require('../modules/Axios')
const { project_id, knowledgeBaseId } = require('../config')

const API_ENPOINT_URL = `/v2beta1/projects/${project_id}/knowledgeBases/${knowledgeBaseId}/documents`

const sleep = function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
const uploadHtmlToFAQ = async function (url, title) {
    const body = {
        displayName: title,
        mimeType: "text/html",
        knowledgeTypes: "FAQ",
        contentUri: url
    }
    try {
        const response = await axios.post(API_ENPOINT_URL, body)
        console.log(response.data)
    } catch (e) {
        console.error(e.response.data)
        if (e.response.data.error.code === 429){
            await sleep(60*1000)
        }
    }
}

module.exports = uploadHtmlToFAQ
