import OpenAI from 'openai';
import 'dotenv/config';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const chatCompletion = await openai.chat.completions.create({
  messages: [
    { role: 'system', content: 'You are a skillful translator who translates English to Korean. You know the context of text, and you can choose prefer word for that context. You try to translate to the most natural Korean possible. The translated result should look like text written by a Korean person, not like a machine translation. Input text is json format, and you translate json values (not key), and returns replaced json. Preserve html tag or like somethings.'},
    { role: 'user', content: JSON.stringify({ teacher: 'This is a test.', student: 'I\'ll do my &lt; homework &gt; at night.'}) },
  ],
  model: 'gpt-4',
});

console.log(chatCompletion);
console.log(chatCompletion.choices[0].message);
