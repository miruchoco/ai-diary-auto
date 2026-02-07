import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                serif: ['var(--font-zen-old-mincho)', 'serif'],
                display: ['var(--font-cormorant)', 'serif'],
                sans: ['var(--font-inter)', 'sans-serif'],
            },
            colors: {
                paper: '#f9f8f4', // High-quality book paper
                ink: {
                    900: '#1a1a1a', // Deep black
                    800: '#2d2a2e', // Soft black for text
                    500: '#71717a', // Muted grey for metadata
                    400: '#a1a1aa', // Light grey
                },
                accent: {
                    gold: '#cca36e', // Classic sophisticated accent
                    red: '#b91c1c', // Traditional seal red
                }
            },
            typography: {
                DEFAULT: {
                    css: {
                        '--tw-prose-body': '#2d2a2e',
                        '--tw-prose-headings': '#1a1a1a',
                        '--tw-prose-links': '#b91c1c',
                        '--tw-prose-bold': '#1a1a1a',
                        '--tw-prose-quotes': '#1a1a1a',
                        fontFamily: 'var(--font-zen-old-mincho)',
                    },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
export default config;
