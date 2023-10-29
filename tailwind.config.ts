import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    colors: {
      "blue-1": "#024089",
      "blue-2": "#004DA9",
      "orange-1": "#FA841A",
      "orange-2": "#FDA300",
      "yellow-1": "#FFC619",
      "online-green": "#5ED85C",
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
export default config;
