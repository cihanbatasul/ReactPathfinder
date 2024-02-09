/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/4.jpeg')",
        'target-pattern': "url('/Ice.png')",
        'start-pattern': "url('/alian_by_egg3_d112b47.gif')",
        'star-pattern': "url('/lunar/lunarU/Space Background/Star_Tiles.png')",
        'wall-pattern': "url('/Foozle_2DS0015_Void_EnvironmentPack/Asteroids/PNGs/Asteroid 01 - Base.png')",
        'spacy-pattern': "url('/spacebg/large/Purple Nebula/Purple_Nebula_07-1024x1024.png')",
        'visited-pattern': "bg-teal-500",
        'weighted-pattern': "url('/Black_hole.png')"
      }
    },
  },
  plugins: [],
 
}