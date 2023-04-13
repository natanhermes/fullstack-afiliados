import fs from 'fs-extra';
import tmp from 'tmp-promise';
import pump, { Stream } from 'pump';

export async function processFile(file: Stream): Promise<string[]> {
  const tmpDir = await tmp.dir({ prefix: 'myapp-' });

  const filePath = tmpDir.path + '/file.txt';

  await new Promise<void>((resolve, reject) => {
    const writeStream = fs.createWriteStream(filePath);
    pump(file, writeStream, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  const transactions = await fs.readFile(filePath, 'utf-8');

  await fs.remove(tmpDir.path);

  return transactions.split('\n').filter((el) => !!el);
}
