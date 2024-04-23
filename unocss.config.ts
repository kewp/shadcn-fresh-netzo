// unocss.config.ts: make sure you register presetNetzo which includes presets required by shadcn components to work. Otherwise you can explicitly/manually register netzo/plugins/unocss/preset-shadcn as well as @unocss/preset-uno, and others.
import { defineUnocssConfig } from "netzo/plugins/unocss/plugin.ts";
import { presetNetzo } from "netzo/plugins/unocss/preset-netzo.ts";

export default defineUnocssConfig({
  url: import.meta.url,
  presets: [
    presetNetzo(), // includes multiple presets including presetShadcn
  ],
});