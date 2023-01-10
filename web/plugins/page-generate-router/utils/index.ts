import { access, constants, readdir, stat, readFile } from "fs/promises";
import { resolve } from "path";

export function isDir() {}

export async function targetDirExist(path: string) {
  try {
    await access(path, constants.R_OK | constants.W_OK);
    return true;
  } catch {
    return false;
  }
}

export async function folderScan(
  path: string,
  cb?: (dir: string, files: string[]) => void
) {
  try {
    await access(path, constants.R_OK | constants.W_OK);
    const results = new Map<string, string[]>();
    const files = await readdir(path);

    async function scanFile(path: string) {
      const files = await readdir(path);
      const resultFile: string[] = [];
      for await (const file of files) {
        const newDir = resolve(path, file);
        const fileStat = await stat(newDir);
        if (fileStat.isFile()) {
          resultFile.push(newDir);
        }
      }
      return resultFile;
    }

    for await (const file of files) {
      const newDir = resolve(path, file);
      const fileStat = await stat(newDir);
      if (fileStat.isDirectory()) {
        const res = results.get(newDir);
        if (res) {
          res.concat(await scanFile(newDir));
        } else {
          results.set(newDir, await scanFile(newDir));
        }
      } else {
        results.set(path, [newDir]);
      }
    }

    if (cb) {
      results.forEach((files, dir) => {
        cb(dir, files);
      });
    }

    return results;
  } catch (err) {
    throw err;
  }
}

export async function readJson<T>(path: string): Promise<T> {
  const fileText = await readFile(path);
  return JSON.parse(fileText.toString() || "{}");
}
