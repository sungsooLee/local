import fs from "fs";
import { resolve } from "path";
import { defineConfig } from "vite";

function getHtmlPages(): Record<string, string> {
  const dir = resolve(__dirname, "src/pages");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".html"));
  const input: Record<string, string> = {};
  files.forEach((f) => {
    const name = f.replace(".html", "");
    input[name] = resolve(dir, "pages", f);
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
  base: "/local/", // <-- GitHub Pages repo 이름
});
