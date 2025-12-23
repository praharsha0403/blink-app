// ../../packages/ui-solid/vite.js
import { fileURLToPath } from "node:url";
import AutoImport from "unplugin-auto-import/vite";
import Unfonts from "unplugin-fonts/vite";
import { FileSystemIconLoader } from "unplugin-icons/loaders";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
var ABSOLUTE_PATH = /^\/|^[a-zA-Z]:\//;
var vite_default = [
  VinxiAutoImport({
    resolvers: [
      IconsResolver({
        prefix: "Icon",
        extension: "jsx",
        customCollections: ["cap"]
      })
    ],
    dts: fileURLToPath(new URL("./src/auto-imports.d.ts", import.meta.url))
  }),
  Icons({
    compiler: "solid",
    enabledCollections: ["lucide"],
    customCollections: {
      cap: FileSystemIconLoader(
        fileURLToPath(new URL("./icons", import.meta.url))
        // (svg) => svg.replace(/^<svg /, '<svg stroke="currentColor" ')
      )
    }
  }),
  Unfonts({
    fontsource: {
      families: [{ name: "Geist Sans", weights: [400, 500, 700] }]
    }
  })
];
function VinxiAutoImport(options) {
  const autoimport = AutoImport(options);
  return {
    ...autoimport,
    transform(src, id) {
      let pathname = id;
      if (ABSOLUTE_PATH.test(id)) {
        pathname = new URL(`file://${id}`).pathname;
      }
      return autoimport.transform(src, pathname);
    }
  };
}

// app.config.ts
import { defineConfig } from "@solidjs/start/config";
import topLevelAwait from "vite-plugin-top-level-await";
import wasm from "vite-plugin-wasm";
import tsconfigPaths from "vite-tsconfig-paths";
var app_config_default = defineConfig({
  ssr: false,
  server: { preset: "static" },
  // https://vitejs.dev/config
  vite: () => ({
    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    // 1. tauri expects a fixed port, fail if that port is not available
    server: {
      port: 3001,
      strictPort: true,
      watch: {
        ignored: ["**/src-tauri/**"]
      },
      headers: {
        "Cross-Origin-Opener-Policy": "same-origin",
        "Cross-Origin-Embedder-Policy": "require-corp"
      }
    },
    // 3. to make use of `TAURI_DEBUG` and other env variables
    // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
    envPrefix: ["VITE_", "TAURI_"],
    assetsInclude: ["**/*.riv"],
    plugins: [
      wasm(),
      topLevelAwait(),
      vite_default,
      tsconfigPaths({
        root: "."
      })
    ],
    define: {
      "import.meta.vitest": "undefined"
    },
    optimizeDeps: {
      include: [
        "@tauri-apps/plugin-os",
        "@tanstack/solid-query",
        "@tauri-apps/api/webviewWindow",
        "@tauri-apps/plugin-dialog",
        "@tauri-apps/plugin-store",
        "posthog-js",
        "uuid",
        "@tauri-apps/plugin-clipboard-manager",
        "@tauri-apps/api/window",
        "@tauri-apps/api/core",
        "@tauri-apps/api/event",
        "cva"
      ]
    }
  })
});
export {
  app_config_default as default
};
