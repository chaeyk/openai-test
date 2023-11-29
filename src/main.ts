import OpenAI from 'openai';
import 'dotenv/config';
import fs from 'node:fs';
import { IndexFlatL2 } from 'faiss-node';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function testChat() {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `You are a skillful translator who translates English to Korean.
                  You know the context of text, and you can choose prefer word for that context.
                  You try to translate to the most natural Korean possible.
                  The translated result should look like text written by a Korean person, not like a machine translation.
                  Input text is json format, and you translate json values (not key), and returns replaced json.
                  Preserve html tag or like somethings.`,
      },
      {
        role: 'user',
        content: JSON.stringify({
          A5: 'This is a test. これはテストです',
          A6: 'I\'ll do my &lt; homework &gt; at night.'
        }),
      },
    ],
    model: 'gpt-4',
  });

  console.log(chatCompletion);
  console.log(chatCompletion.choices[0].message);
}

async function testImage() {
  const edit = await openai.images.edit({
    image: fs.createReadStream('img/racing.png'),
    prompt: 'Cats are running on the racing road. They are running with a look of horror on their faces.',
  })
  console.log(edit);
}

async function testEmbedding() {
  const in_embedding = await openai.embeddings.create({
    input: '오늘은 비가 오지 않아서 다행이다.',
    model: 'text-embedding-ada-002',
  });
  const in_embeds = in_embedding.data.map((v) => v.embedding).flat();

  const target_strs = [
    '좋아하는 음식은 무엇인가요?',
    '어디에 살고 계신가요?',
    '아침 전철은 혼잡하네요.',
    '오늘은 날씨가 좋네요!',
    '요즘 경기가 좋지 않네요.',
  ];
  const target_embedding = await openai.embeddings.create({
    input: target_strs,
    model: 'text-embedding-ada-002',
  });
  const target_embeds = target_embedding.data.map((v) => v.embedding).flat();

  const index = new IndexFlatL2(1536);
  index.add(target_embeds)

  const search = index.search(in_embeds, 1);
  console.log(`distance = ${search.distances}`);
  console.log(`result = ${target_strs[search.labels[0]]}`);
}

async function main() {
  //await testChat();
  //await testImage();
  await testEmbedding();
}

main()
  .then(() => console.log('Done'))
  .catch((error) => console.error(error));
