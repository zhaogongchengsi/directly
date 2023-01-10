import { isAbsolute, resolve } from "path";
import { folderScan, readJson } from "./utils/index";
import { normalizePath } from "vite";

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

function formatRouterInfo(dir: string, files: string[], setting: PageSetting) {

  console.log(files);

  // console.log(normalizePath(dir), setting);
  return setting;
}

async function generateRouter(
  path: string,
  settingName: string,
  format: (dir: string, files: string[], setting: any) => any = formatRouterInfo
) {
  const modules = await folderScan(path);
  
  console.log(modules);
  
  const routers: any[] = [];
  for await (const [dir, files] of modules) {
    const settingPath = resolve(dir, settingName);
    const settingFile = files.find((file) => file === settingPath);
    if (!settingFile) {
      continue;
    }
    const setting = await readJson(settingFile);
    routers.push(await Promise.resolve(format(dir, files, setting)));
  }
  return routers;
}

export async function pageGenerateRouter(options?: PageGenerateOptions) {
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
    async load(id: string) {
      if (id !== resolvedVirtualModuleId) {
        return;
      }

      const res = await generateRouter(target, settingFile);

      return `export default ${JSON.stringify(res || [])}`;
    },
  };
}
