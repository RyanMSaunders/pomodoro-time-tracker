export default {
  'frontend/**/*.{ts,tsx,js,jsx}': [
    'pnpm --dir frontend exec eslint --fix --max-warnings=0 --no-warn-ignored',
    'pnpm --dir frontend exec prettier --write',
  ],
  'frontend/**/*.{json,css,html,md}': [
    'pnpm --dir frontend exec prettier --write',
  ],
};
