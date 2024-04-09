
const { app } = require('@azure/functions');
const { OpenAI } = require("openai");

app.http('getAIResponse', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'ai',
    handler: async (request, context) => {
        const openai = new OpenAI({
            apiKey: process.env.REACT_APP_OPENAI_API_KEY,
            dangerouslyAllowBrowser: true
        });

        const body = await request.json();
        inputText = body.inputText;

        const completion = await openai.chat.completions.create({
            model: "gpt-4-0125-preview",
            messages: [
              {"role": "system", "content": "You are a assistant helping user analyze their dreams. User will give you the desciprtion of the dream, you help me them analyze them. Respond should be in paragraph format, avoid using any markdown symbol"},
              {"role": "user", "content": `Write an analysis based on the description of my dream: "${inputText}"`}
            ]
          });

        const response =  await openai.images.generate({
            model: "dall-e-3",
            prompt: `Generate a beautiful, fantastical image visualizing the dream: "${inputText}"`,
            size: "1024x1024",
            quality: "standard",
            n: 1,
        });

        return {
            jsonBody: {imageURL: response.data[0].url, analysis: completion.choices[0].message.content}
        }
    },
});

