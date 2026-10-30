import js from '@eslint/js';
import globals from 'globals';
import reactRefresh from 'eslint-plugin-react-refresh';
import vitest from '@vitest/eslint-plugin';
import { configs, plugins } from 'eslint-config-airbnb-extended';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';

const unusedVarsOptions = {
  argsIgnorePattern: '^_',
  caughtErrorsIgnorePattern: '^_',
  destructuredArrayIgnorePattern: '^_',
  varsIgnorePattern: '^_'
};

const sxImportantMessage =
  'Using !important in sx prop is not allowed. Use theming.';

const commonRules = {
  complexity: ['warn', { max: 7 }],
  'class-methods-use-this': 'off',
  'lines-between-class-members': ['error', 'always'],
  'import-x/prefer-default-export': 'warn',
  'import-x/no-extraneous-dependencies': [
    'error',
    {
      devDependencies: [
        '**/*.{test,spec,cy,stories,data}.{ts,tsx,js,jsx}',
        '**/__{mocks,tests}__/**',
        '**/{testUtils,test-utils}/**',
        '**/test/**',
        '**/*.config.{js,mjs,cjs,ts}'
      ],
      peerDependencies: true
    }
  ],
  'jsx-a11y/label-has-associated-control': ['error', { assert: 'either' }],
  'prefer-destructuring': ['error', { object: true }],
  'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
  'no-underscore-dangle': [
    'error',
    {
      allowFunctionParams: true,
      allowInObjectDestructuring: true,
      allowInArrayDestructuring: true
    }
  ],
  'prefer-promise-reject-errors': 'warn',
  'no-alert': 'error',
  'no-console': 'warn',
  'react/jsx-no-duplicate-props': 'error',
  'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
  'react/prop-types': 'off',
  'react/require-default-props': 'off',
  'react/function-component-definition': 'off',
  // React 17+ JSX transform: no `import React` needed (airbnb leaves these on)
  'react/react-in-jsx-scope': 'off',
  'react/jsx-uses-react': 'off',
  // MUI: block `!important` inside sx props (use the theme instead)
  'no-restricted-syntax': [
    'warn',
    {
      selector: "JSXAttribute[name.name='sx'] Literal[value=/!important/]",
      message: sxImportantMessage
    },
    {
      selector:
        "JSXAttribute[name.name='sx'] TemplateElement[value.raw=/!important/]",
      message: sxImportantMessage
    }
  ],
  // TypeScript replacements for the base rules
  'no-shadow': 'off',
  '@typescript-eslint/no-shadow': 'error',
  'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': ['error', unusedVarsOptions],
  '@typescript-eslint/no-empty-object-type': 'warn',
  '@typescript-eslint/no-explicit-any': 'warn',
  '@typescript-eslint/no-non-null-assertion': 'off',
  '@typescript-eslint/ban-ts-comment': [
    'error',
    {
      'ts-expect-error': 'allow-with-description',
      'ts-ignore': 'allow-with-description'
    }
  ]
};

const devFileRules = {
  'react/display-name': 'off',
  'react/jsx-props-no-spreading': 'off'
};

export default defineConfig([
  globalIgnores(['dist', 'coverage', 'docs']),
  js.configs.recommended,
  plugins.stylistic,
  plugins.importX,
  plugins.react,
  plugins.reactHooks,
  plugins.reactA11y,
  plugins.typescriptEslint,
  ...configs.base.recommended,
  ...configs.react.recommended,
  ...configs.base.typescript,
  ...configs.react.typescript,
  reactRefresh.configs.vite,
  // Turns off rules that conflict with Prettier. Keep it above our own rules.
  eslintConfigPrettier,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: { globals: globals.browser },
    rules: commonRules
  },
  {
    files: ['**/*.test.{ts,tsx}', 'src/test/**'],
    extends: [vitest.configs.recommended],
    rules: devFileRules
  },
  {
    files: ['**/*.stories.*'],
    rules: {
      ...devFileRules,
      'import-x/no-anonymous-default-export': 'off'
    }
  },
  {
    files: ['*.config.{js,mjs,cjs,ts}'],
    languageOptions: { globals: globals.node }
  }
]);

// import js from '@eslint/js';
// import globals from 'globals';
// import importPlugin from 'eslint-plugin-import';
// import jsxA11y from 'eslint-plugin-jsx-a11y';
// import reactPlugin from 'eslint-plugin-react';
// import reactHooks from 'eslint-plugin-react-hooks';
// import reactRefresh from 'eslint-plugin-react-refresh';
// import vitest from '@vitest/eslint-plugin';
// import { configs, plugins } from 'eslint-config-airbnb-extended';
// import tseslint from 'typescript-eslint';
// import { defineConfig, globalIgnores } from 'eslint/config';
// import eslintConfigPrettier from 'eslint-config-prettier';

// const unusedVarsOptions = {
//   argsIgnorePattern: '^_',
//   caughtErrorsIgnorePattern: '^_',
//   destructuredArrayIgnorePattern: '^_',
//   varsIgnorePattern: '^_'
// };

// const commonRules = {
//   complexity: ['warn', { max: 7 }],
//   'class-methods-use-this': 'off',
//   'lines-between-class-members': ['error', 'always'],
//   'import/prefer-default-export': 'warn',
//   'import/no-extraneous-dependencies': [
//     'error',
//     {
//       devDependencies: [
//         '**/*.{test,spec,cy,stories,data}.{ts,tsx,js,jsx}',
//         '**/__{mocks,tests}__/**',
//         '**/{testUtils,test-utils}/**',
//         '**/test/**',
//         '**/*.config.{js,mjs,cjs,ts}'
//       ],
//       peerDependencies: true
//     }
//   ],
//   'import/extensions': [
//     'error',
//     'ignorePackages',
//     { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' }
//   ],
//   'jsx-a11y/label-has-associated-control': ['error', { assert: 'either' }],
//   'prefer-destructuring': ['error', { object: true }],
//   'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
//   'no-underscore-dangle': [
//     'error',
//     {
//       allowFunctionParams: true,
//       allowInObjectDestructuring: true,
//       allowInArrayDestructuring: true
//     }
//   ],
//   'prefer-promise-reject-errors': 'warn',
//   'no-alert': 'error',
//   'no-console': 'warn',
//   'react/jsx-no-duplicate-props': 'error',
//   'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
//   'react/prop-types': 'off',
//   'react/require-default-props': 'off',
//   'react/function-component-definition': 'off',
//   // MUI: block `!important` inside sx props (use the theme instead)
//   'no-restricted-syntax': [
//     'warn',
//     {
//       selector: "JSXAttribute[name.name='sx'] Literal[value=/!important/]",
//       message: 'Using !important in sx prop is not allowed. Use theming.'
//     },
//     {
//       selector:
//         "JSXAttribute[name.name='sx'] TemplateElement[value.raw=/!important/]",
//       message: 'Using !important in sx prop is not allowed. Use theming.'
//     }
//   ],
//   // TypeScript replacements for the base rules
//   'no-shadow': 'off',
//   '@typescript-eslint/no-shadow': 'error',
//   'no-unused-vars': 'off',
//   '@typescript-eslint/no-unused-vars': ['error', unusedVarsOptions],
//   '@typescript-eslint/no-empty-object-type': 'warn',
//   '@typescript-eslint/no-explicit-any': 'warn',
//   '@typescript-eslint/no-non-null-assertion': 'off',
//   '@typescript-eslint/ban-ts-comment': [
//     'error',
//     {
//       'ts-expect-error': 'allow-with-description',
//       'ts-ignore': 'allow-with-description'
//     }
//   ]
// };

// const devFileRules = {
//   'react/display-name': 'off',
//   'react/jsx-props-no-spreading': 'off'
// };

// export default defineConfig([
//   globalIgnores(['dist', 'coverage']),
//   {
//     files: ['**/*.{ts,tsx}'],
//     extends: [
//       js.configs.recommended,
//       tseslint.configs.recommended,
//       reactPlugin.configs.flat.recommended,
//       reactPlugin.configs.flat['jsx-runtime'],
//       reactHooks.configs.flat.recommended,
//       reactRefresh.configs.vite,
//       jsxA11y.flatConfigs.strict,
//       importPlugin.flatConfigs.recommended,
//       importPlugin.flatConfigs.typescript,
//       eslintConfigPrettier // keep last in extends
//     ],
//     languageOptions: { globals: globals.browser },
//     settings: {
//       react: { version: 'detect' },
//       'import/resolver': {
//         typescript: {
//           alwaysTryTypes: true,
//           project: ['./tsconfig.app.json', './tsconfig.node.json']
//         }
//       }
//     },
//     rules: commonRules
//   },
//   {
//     files: ['**/*.test.{ts,tsx}', 'src/test/**'],
//     extends: [vitest.configs.recommended],
//     rules: devFileRules
//   },
//   {
//     files: ['**/*.stories.*'],
//     rules: {
//       ...devFileRules,
//       'import/no-anonymous-default-export': 'off'
//     }
//   },
//   {
//     files: ['*.config.{js,mjs,cjs,ts}'],
//     languageOptions: { globals: globals.node }
//   }
// ]);
