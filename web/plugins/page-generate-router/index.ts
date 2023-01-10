import { isAbsolute, resolve } from "path";

export interface PageGenerateOptions {
  generateDir: string;
  root?: string;
  settingFile?: string;
  variableName?: string;
}

export interface PageSetting {
  title?: string;
  index: string;
  [key: string]: any;
}

export function pageGenerateRouter(options?: PageGenerateOptions) {
  const root = isAbsolute(options.root || "") ? options.root : process.cwd();
  const target = resolve(root, options.generateDir ?? "");

  console.log(target);

  return {};
}
