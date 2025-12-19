import { defineConfig } from "vite";
import Pages from "vite-plugin-pages";
import { resolve } from "path";

export default defineConfig({
  plugins: [
    Pages({
      dirs: "src/pages", // 페이지 HTML 파일 위치
      extensions: ["html"], // HTML 파일만 처리
    }),
  ],
  root: "src", // 개발 서버 기준 폴더
  build: {
    outDir: "../dist", // 빌드 결과물 위치
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"), // 루트 index.html
        pages: resolve(__dirname, "src/pages/index.html"), // 실제 페이지
      },
    },
  },
  base: "/local/",
});
