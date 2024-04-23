import { defineConfig } from "$fresh/server.ts";
// import tailwind from "$fresh/plugins/tailwind.ts";
import { unocss } from "netzo/plugins/unocss/plugin.ts";
import unocssConfig from "./unocss.config.ts";

export default defineConfig({
  plugins: [unocss(unocssConfig)],
});
