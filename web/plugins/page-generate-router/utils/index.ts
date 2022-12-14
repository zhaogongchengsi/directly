import { access, constants, readdir, stat, readFile } from "fs/promises";
import { resolve, posix } from "path";
import os from "os";

export async function targetDirExist(path: string) {
  try {
    await access(path, constants.R_OK | constants.W_OK);
    return true;
  } catch {
    return false;
  }
}

export type FileTree = FileNode[];

export type FileNode = {
  path: string;
  children?: FileTree;
  files: string[];
};

export async function scanFile(path: string) {
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

export async function folderScan(path: string) {
  try {
    await access(path, constants.R_OK | constants.W_OK);
    const files = await readdir(path);
    const results: FileNode[] = [];
    for await (const file of files) {
      const newPath = resolve(path, file);
      const filestat = await stat(newPath);
      if (filestat.isDirectory()) {
        results.push({
          path: newPath,
          children: await folderScan(newPath),
          files: await scanFile(newPath),
        });
      }
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

// export function slash(p: string): string {
//   return p.replace(/\\/g, "/");
// }

const isWindows = os.platform() === "win32";
export function normalizePath(path: string): string {
  const reg = /\\/g;
  return posix.normalize(isWindows ? path.replace(reg, "/") : path);
}
