import fs from "node:fs/promises";
import path from "node:path";

const STORAGE_DIR = path.join(process.cwd(), "public", "documents");

export async function ensureStorageDir() {
  try {
    await fs.access(STORAGE_DIR);
  } catch {
    await fs.mkdir(STORAGE_DIR, { recursive: true });
  }
}

export async function saveFile(
  filename: string,
  buffer: Buffer,
): Promise<string> {
  await ensureStorageDir();
  const filePath = path.join(STORAGE_DIR, filename);
  await fs.writeFile(filePath, buffer);
  return `/documents/${filename}`;
}

export async function getFile(filename: string): Promise<Buffer> {
  const filePath = path.join(STORAGE_DIR, filename);
  return await fs.readFile(filePath);
}

export async function fileExists(filename: string): Promise<boolean> {
  try {
    const filePath = path.join(STORAGE_DIR, filename);
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}
