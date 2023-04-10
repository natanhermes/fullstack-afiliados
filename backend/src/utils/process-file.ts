import fs from 'fs';
import pump, { Stream } from 'pump';

export async function processFile(file: Stream): Promise<string[]> {
  const storedFile = fs.createWriteStream('./tmp/file.txt');
  await pump(file, storedFile);

  const transactions = (
    await fs.promises.readFile('./tmp/file.txt', 'utf-8')
  ).split('\n');

  return transactions.filter((el) => !!el);
}
