/** @type {import('tailwindcss').Config} */
export default {
  // указываем в каких файлах расположены классы Tailwind,
  // чтобы на их основе можно сгенерировать результирующую
  // таблицу стилей
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

