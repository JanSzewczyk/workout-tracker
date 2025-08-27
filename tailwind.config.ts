// @ts-ignore
import nativewindPreset from "nativewind/preset";
import { type Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [nativewindPreset],
  theme: {
    extend: {}
  },
  plugins: []
} satisfies Config;
