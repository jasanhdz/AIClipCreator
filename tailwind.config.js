/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./client/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            maxWidth: {
                '8xl': '1440px',
            },
        },
    },
    plugins: [],
}
