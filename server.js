const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const { detectIntent } = require('./dialogflow');
const uuid = require('uuid');

const app = express();
app.use(bodyParser.json());

app.use(cors());

app.post('/chat', async (req, res) => {
    const { message } = req.body;
    const sessionId = uuid.v4();

    try {
        const result = await detectIntent(message, sessionId);
        res.json({
            response: result.fulfillmentText,
        });
    } catch (error) {
        console.error('Error detecting intent:', error);
        res.status(500).send('Error processing the request.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
