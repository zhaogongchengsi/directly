import { isAbsolute, resolve } from "path";

export interface PageGenerateOptions {
  generateDir: string;
  root?: string;
  settingFile?: string;
  variableName?: string;
  name?: string;
}

export interface PageSetting {
  title?: string;
  index: string;
  [key: string]: any;
}

const VIRTUAL_MODULEID = "page-router";
const PLUGIN_NAME = "vite-plugin-page-generate-router";

export function pageGenerateRouter(options?: PageGenerateOptions) {
  const root = isAbsolute(options.root || "") ? options.root : process.cwd();
  const target = resolve(root, options.generateDir ?? "");
  const settingFile = options.settingFile || "setting.json";
  const virtualModuleId = options.name || VIRTUAL_MODULEID;
  const resolvedVirtualModuleId = "\0" + virtualModuleId;

  return {
    name: PLUGIN_NAME,
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    load(id: string) {
      if (id === resolvedVirtualModuleId) {
        return `export default {
          a: '123',
          b: 'avbcas'
        }`;
      }
    },
  };
}
