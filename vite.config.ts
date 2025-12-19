import { defineConfig } from "vite";
import { resolve } from "path";
import * as fs from "fs";

function getHtmlPages(): Record<string, string> {
  const dir = resolve(__dirname, "src/pages");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".html"));
  const input: Record<string, string> = {};
  files.forEach((f) => {
    const name = f.replace(".html", "");
    input[name] = resolve(dir, f); // 경로는 dir + 파일명
  });
  return input;
}

export default defineConfig({
  root: "src",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        ...getHtmlPages(),
      },
    },
  },
  base: "/local/", // GitHub Pages repo 이름
});
