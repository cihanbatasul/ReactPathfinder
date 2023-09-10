/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('./src/assets/4.jpeg')",
        'target-pattern': "url(./src/assets/Ice.png)",
        'start-pattern': "url(./src/assets/alian_by_egg3_d112b47.gif)",
        'star-pattern': "url(./src/assets/lunar/lunarU/Space Background/Star_Tiles.png)",
        'wall-pattern': "url(./src/assets/Foozle_2DS0015_Void_EnvironmentPack/Asteroids/PNGs/Asteroid 01 - Base.png)",
        'spacy-pattern': "url(./src/assets/spacebg/large/Purple Nebula/Purple_Nebula_07-1024x1024.png)",
        'visited-pattern': "bg-teal-500",
        'weighted-pattern': "url(./src/assets/Black_hole.png)"
      }
    },
  },
  plugins: [],
 
}