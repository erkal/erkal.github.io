module.exports = {
  content: ["./**/*.{elm, js, html}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif", "Arial", "Helvetica", "system-ui"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
      },
      typography: ({ theme }) => ({
        gruvbox: {
          css: {
            "--tw-prose-body": theme("colors.gray.200"),
            "--tw-prose-headings": theme("colors.gray.100"),
            "--tw-prose-lead": theme("colors.gray.200"),
            "--tw-prose-links": theme("colors.blue.400"),
            "--tw-prose-bold": theme("colors.gray.100"),
            "--tw-prose-italics": theme("colors.gray.100"),
            "--tw-prose-counters": theme("colors.orange.300"),
            "--tw-prose-bullets": theme("colors.green.300"),
            "--tw-prose-hr": theme("colors.gray.600"),
            "--tw-prose-quotes": theme("colors.pink.300"),
            "--tw-prose-quote-borders": theme("colors.gray.600"),
            "--tw-prose-captions": theme("colors.gray.200"),
            "--tw-prose-code": theme("colors.purple.200"),
            "--tw-prose-pre-code": theme("colors.gray.100"),
            "--tw-prose-pre-bg": "rgb(0 0 0 / 50%)",
            "--tw-prose-th-borders": theme("colors.gray.600"),
            "--tw-prose-td-borders": theme("colors.gray.700"),
            "--tw-prose-invert-body": theme("colors.gray.800"),
            "--tw-prose-invert-headings": theme("colors.gray.200"),
            "--tw-prose-invert-lead": theme("colors.gray.600"),
            "--tw-prose-invert-links": theme("colors.blue.700"),
            "--tw-prose-invert-bold": theme("colors.gray.900"),
            "--tw-prose-invert-italics": theme("colors.gray.200"),
            "--tw-prose-invert-counters": theme("colors.orange.500"),
            "--tw-prose-invert-bullets": theme("colors.green.500"),
            "--tw-prose-invert-hr": theme("colors.gray.400"),
            "--tw-prose-invert-quotes": theme("colors.pink.500"),
            "--tw-prose-invert-quote-borders": theme("colors.gray.400"),
            "--tw-prose-invert-captions": theme("colors.gray.600"),
            "--tw-prose-invert-code": theme("colors.purple.700"),
            "--tw-prose-invert-pre-code": theme("colors.gray.300"),
            "--tw-prose-invert-pre-bg": theme("colors.gray.800"),
            "--tw-prose-invert-th-borders": theme("colors.gray.400"),
            "--tw-prose-invert-td-borders": theme("colors.gray.300"),
          },
        },
      }),
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
