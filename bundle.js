import esbuild from "esbuild";
import { nodeExternalsPlugin } from "esbuild-node-externals";

async function watch() {
  const clientCtx = await esbuild.context({
    entryPoints: ["src/App.tsx"],
    bundle: true,
    sourcemap: true,
    logLevel: "info",
    outfile: "web/index.js",
    loader: { 
        ".ts": "ts",
        ".tsx": "tsx"
    },
  });
  const serverCtx = await esbuild.context({
    entryPoints: ["src/server.ts"],
    logLevel: "info",
    bundle: true,
    platform: "node",
    format: "esm",
    sourcemap: true,
    outfile: "web/server.js",
    loader: { 
        ".ts": "ts",
        ".tsx": "tsx"
    },
    plugins: [nodeExternalsPlugin()]
  });
  const tasks = [clientCtx.watch(), serverCtx.watch()];
  await Promise.all(tasks);
}

watch();