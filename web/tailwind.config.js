/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	variants: {
		height: ["responsive", "hover", "focus"],
	},
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			boxShadow: {
				divider:
					"0 1px 0 hsl(0 / 0.2), 0 1.5px 0 hsl(240 / 0.05),0 2px 0 hsl(0 / 0.05)",
			},
			transitionProperty: {
				height: "height",
				rounded: "border-radius",
			},
			backgroundImage: {
				"login-background": "url('/svgs/login-screen.svg')",
			},
			colors: {
				zinc: {
					710: "#313338",
				},

				"d-neutral": {
					"100-experimental": "#949ba4",
					600: "#404249",
					700: "#313338",
					750: "#2B2D31",
					800: "#232428",
					900: "#1E1F22",
				},
				"d-burple": {
					500: "#5865F2",
				},
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
