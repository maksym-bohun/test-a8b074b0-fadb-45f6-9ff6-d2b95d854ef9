import globals from 'globals';
import { fixupConfigRules } from '@eslint/compat';
import prettier from 'eslint-plugin-prettier';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import tsEslintPlugin from '@typescript-eslint/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const globalOptions = {
  languageOptions: {
    globals: {
      ...globals.node,
      ...Object.fromEntries(
        Object.entries(globals.jest).map(([key]) => [key, 'off']),
      ),
    },
  },
};

const fixupRules = fixupConfigRules(
  compat.extends('plugin:import/recommended', 'prettier'),
).map((config) => ({
  ...config,
  files: ['**/*.ts'],
}));

const typescriptOptions = {
  files: ['**/*.ts'],
  plugins: { prettier, '@typescript-eslint': tsEslintPlugin },
  languageOptions: {
    parser: tsParser,
    ecmaVersion: 'latest',
    sourceType: 'script',
    parserOptions: {
      project: ['**/tsconfig.json'],
      createDefaultProgram: true,
    },
  },
  rules: {
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'off',
    'import/no-named-as-default-member': 'off',
    'import/default': 'off',
    'import/namespace': 'off',
    'prettier/prettier': 'error',
    'import/named': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    '@typescript-eslint/lines-between-class-members': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],
    'no-restricted-syntax': [
      'error',
      {
        selector: "CallExpression[callee.name='ManyToMany']",
        message: 'ManyToMany decorator is restricted.',
      },
    ],
  },
};

export default [globalOptions, ...fixupRules, typescriptOptions];
