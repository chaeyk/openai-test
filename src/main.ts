import OpenAI from 'openai';
import 'dotenv/config';
import { testChat } from './testChat';
import { testEmbedding } from './testEmbedding';
import { testImage } from './testImage';
import { testModeration } from './testModeration';
import { testTokenizer } from './testTokenizer';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function main(command: string) {
  switch (command) {
    case 'chat':
      await testChat(openai);
      break;
    case 'image':
      await testImage(openai);
      break;
    case 'embedding':
      await testEmbedding(openai);
      break;
    case 'moderation':
      await testModeration(openai);
      break;
    case 'tokenizer':
      await testTokenizer();
      break;
  }
}

if (process.argv.length < 3) {
  console.error('Usage: npm start <command>');
  console.error('command: chat, image, embedding, moderation, tokenizer');
  process.exit(1);
}

main(process.argv[2])
  .then(() => console.log('Done'))
  .catch((error) => console.error(error));
