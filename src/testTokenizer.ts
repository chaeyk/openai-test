import { get_encoding } from "tiktoken";
import { prettyPrint } from "./util";

export async function testTokenizer() {
  const enc = get_encoding('cl100k_base');
  const tokens = enc.encode('안녕하세요!');
  prettyPrint(tokens);
  const decoded = enc.decode(tokens);
  // uint8 array를 string으로 변환
  const decodedString = new TextDecoder().decode(decoded);
  console.log(decodedString);
}
