const dialogflow = require('dialogflow');
const uuid = require('uuid');
const path = require('path');

const keyPath = path.resolve(__dirname, '../../Documents/prativa-swebspeechchatbot-kmit-2e48e45d6789.json');

process.env.GOOGLE_APPLICATION_CREDENTIALS = keyPath;

const sessionClient = new dialogflow.SessionsClient();
const projectId = require(keyPath).project_id;

async function detectIntent(queryText, sessionId) {
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: queryText,
                languageCode: 'en-US',
            },
        },
    };

    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    return result;
}

module.exports = { detectIntent };
