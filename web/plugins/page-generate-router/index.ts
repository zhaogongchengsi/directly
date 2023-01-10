import { isAbsolute, resolve } from "path";
import { FileTree, folderScan, readJson, targetDirExist } from "./utils/index";
// import { normalizePath } from "vite";

export interface PageGenerateOptions {
  generateDir: string;
  root?: string;
  settingFile?: string;
  variableName?: string;
  defaultIndex?: string;
  name?: string;
}

export interface GenerateRouterOptons {
  targetDir: string;
  settingFile: string;
  defaultIndex: string;
}

export interface PageSetting {
  title?: string;
  index: string;
  path: string;
  name?: string;
  component?: string;
  [key: string]: any;
}

const VIRTUAL_MODULEID = "page-router";
const PLUGIN_NAME = "vite-plugin-page-generate-router";

async function formatRouterInfo(
  dir: string,
  files: string[],
  setting: PageSetting,
  options: GenerateRouterOptons
) {
  const { index } = setting;
  const entry = resolve(dir, index || options.defaultIndex);
  if (await targetDirExist(entry)) {
    //todo: 转化为 路由参数
    return Object.assign(setting, {});
  }
  return setting;
}

async function generateRouter(
  tree: FileTree,
  options: GenerateRouterOptons,
  format: (
    dir: string,
    files: string[],
    setting: PageSetting,
    opt: GenerateRouterOptons
  ) => any = formatRouterInfo
) {
  const routers: any[] = [];

  for await (const module of tree) {
    const settingPath = resolve(module.path, options.settingFile);
    const file = module.files.find((file) => file === settingPath);
    if (!file) {
      continue;
    }
    const setting = await readJson<PageSetting>(file);
    const router = await Promise.resolve(
      format(module.path, module.files, setting, options)
    );
    if (module.children && module.children.length > 0) {
      router.children = generateRouter(module.children, options, format);
    }
    routers.push(router);
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

      const modules = await folderScan(target);

      const res = await generateRouter(modules, {
        settingFile,
        targetDir: target,
        defaultIndex: options.defaultIndex || "index.vue",
      });

      console.log(res);

      return `export default ${JSON.stringify(res || [])}`;
    },
  };
}
