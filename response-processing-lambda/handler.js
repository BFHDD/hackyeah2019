'use strict';
const dialogflow = require('dialogflow').v2beta1;
const sessionClient = new dialogflow.SessionsClient();

const THRESHOLD = 0.85;
const DEFAULT_MSG = "I did not understand that. Can you rephrase please?";

const filterRelevant = (body, threshold) => body.queryResult.knowledgeAnswers.answers
      .filter(a => a.matchConfidence > threshold);

module.exports.hello = async event => {
  const body = JSON.parse(event.body);

  const relevant = filterRelevant(body, THRESHOLD);
  const fulfillmentMessages = relevant.map(a => ({text: a.answer}))

  let fulfillmentText;
  if (relevant[0]) {
    fulfillmentText = relevant[0].answer
  } else {
    fulfillmentText = DEFAULT_MSG
  }
  const source = {}
  const payload = {}

  const res = Object.assign({}, {fulfillmentText}, {fulfillmentMessages}, {source}, {payload});
  console.log(res)

  return {
    statusCode: 200,
    body: JSON.stringify(
        res,
        null,
        2
    ),
  };
};
