import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        graphite: '#333333',
        silver: '#C0C0C0',
        gold: '#FFD700',
        'pacific-blue': '#00A8E8',
        'space-gray': '#717378'
      }
    },
  },
  safelist: [
    'bg-graphite',
    'bg-silver',
    'bg-gold',
    'bg-pacific-blue',
    'bg-space-gray',
    'from-red-500',
    'from-orange-500',
    'from-yellow-500',
    'from-green-500',
    'from-cyan-500',
    'from-blue-500',
    'from-indigo-500',
    'from-violet-500',
    'from-purple-500',
    'from-pink-500',
  ],
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography')
  ],
};
export default config;
