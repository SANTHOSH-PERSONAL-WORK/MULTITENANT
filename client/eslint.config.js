import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  {'ignores':['dist']},
  {
    'files':['**/*.{js,jsx}'],
    'languageOptions':{
      'ecmaVersion':2020,
      'globals':globals.browser,
      'parserOptions':{
        'ecmaVersion':'latest',
        'ecmaFeatures':{'jsx':true},
        'sourceType':'module'
      }
    },
    'settings':{'react':{'version':'18.3'}},
    'plugins':{
      react,
      'react-hooks':reactHooks,
      'react-refresh':reactRefresh
    },
    'rules':{
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank':'off',
      'react-refresh/only-export-components':[
        'warn',
        {'allowConstantExport':true}
      ],
      'no-dupe-keys':'error',
      'no-duplicate-case':'error',
      'no-duplicate-imports':'error',
      'no-unused-vars':'error',
      'no-use-before-define':'error',
      'default-case':'error',
      'eqeqeq':['error', 'always'],
      'func-style':['error', 'expression'],
      'no-console':'error',
      'no-empty':'error',
      'no-extra-semi':'error',
      'no-inline-comments':'error',
      'no-lonely-if':'error',
      'no-multi-assign':'error',
      'no-return-await':'error',
      'no-var':'error',
      'operator-assignment':['error', 'always'],
      'prefer-template':'error',
      'quote-props':['error', 'always'],
      'spaced-comment':['error', 'always'],
      'array-bracket-spacing':['error', 'never'],
      // modified
      'arrow-spacing':['error', {'before':true, 'after':true}],
      'brace-style':'error',
      'comma-dangle':['error', 'never'],
      // modified
      'comma-spacing':['error', {'before':false, 'after':true}],
      'comma-style':['error', 'last'],
      'func-call-spacing':['error', 'always', {'allowNewlines':false}],
      'implicit-arrow-linebreak':['error', 'beside'],
      'jsx-quotes':['error', 'prefer-single'],
      // modified
      'key-spacing':['error', {'beforeColon':false, 'afterColon':false}],
      'line-comment-position':['error', {'position':'above'}],
      'max-statements-per-line':['error', {'max':1}],
      'no-multiple-empty-lines':['error', {'max':2}],
      'no-whitespace-before-property':'error',
      // modified
      'object-curly-spacing':['error', 'never'],
      'operator-linebreak':['error', 'before'],
      'quotes':['error', 'single'],
      'semi':['error', 'always'],
      'semi-style':['error', 'last'],
      'semi-spacing':['error', {'before':false, 'after':false}],
      // added
      'indent':['error', 2]
    }
  }
];
