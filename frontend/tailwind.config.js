/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsla(179, 100%, 20%, 1)',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(0, 0%, 57%, 1)',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				lightBlue: {
					DEFAULT: 'hsla(227, 88%, 97%, 1)'
				},
				darkBlue: {
					DEFAULT: 'hsla(212, 55%, 43%, 1)'
				},
				primaryGray: {
					DEFAULT: 'hsla(0, 0%, 80%, 1)'
				},
				danger: {
					DEFAULT: 'hsla(0, 100%, 50%, 1)'
				},
				lightGreen : {
					DEFAULT: 'hsla(141, 78%, 89%, 1)'
				},
				lightRed: {
					DEFAULT: '#ffeae6'
				},
				primaryGreen : {
					DEFAULT: 'hsla(154, 70%, 35%, 1)'
				},
				
				lightTeal : {
					DEFAULT: 'hsla(180, 25%, 95%, 1)'
				},
				border: 'hsla(0, 0%, 84%, 1)',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},

			boxShadow: {
				'invitation-card': '5px 5px 0px 0px rgba(0, 102, 101, 0.6)',
			},

			fontSize : {
				'small': '16px'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
}