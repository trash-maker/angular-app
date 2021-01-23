module.exports = (isProd) => ({
  prefix: "",
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    enabled: isProd,
    content: ["**/*.html", "**/*.ts"],
  },
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      transformOrigin: {
        0: "0%",
      },
      zIndex: {
        "-1": "-1",
      },
    },
  },
  variants: {
    borderColor: ["responsive", "hover", "focus", "focus-within"],
  },
  plugins: [require("@tailwindcss/typography")],
});
