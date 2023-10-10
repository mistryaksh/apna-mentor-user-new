/** @type {import('tailwindcss').Config} */
module.exports = {
     content: ["./src/**/*.{js,jsx,ts,tsx}"],
     theme: {
          extend: {
               colors: {
                    primary: {
                         50: "#fef5fd",
                         100: "#fdeafc",
                         200: "#fad4f6",
                         300: "#f6b1ec",
                         400: "#ef83de",
                         500: "#e253cc",
                         600: "#c633ab",
                         700: "#a4278b",
                         800: "#91257a",
                         900: "#6e215c",
                         950: "#480a39",
                    },
                    secondary: {
                         50: "#edfefe",
                         100: "#d2fbfb",
                         200: "#aaf5f7",
                         300: "#6fedf1",
                         400: "#2ddae3",
                         500: "#11b9c4",
                         600: "#1198a9",
                         700: "#157a89",
                         800: "#1a6270",
                         900: "#1a525f",
                         950: "#0b3741",
                    },
               },
               fontFamily: {
                    sans: ["Poppins", "sans-serif"],
                    montserrat: ["Montserrat", "sans-serif"],
                    roboto: ["Roboto", "sans-serif"],
               },
          },
     },
     plugins: [],
};
