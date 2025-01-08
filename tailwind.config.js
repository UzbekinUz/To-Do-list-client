import item from "@material-tailwind/react/utils/withMT"
const withMT = item;

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '904px',
    },
    extend: {},
  },
  plugins: [],
});
