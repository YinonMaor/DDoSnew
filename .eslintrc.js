module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "jasmine": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        'brace-style': 'error',
        'comma-dangle': 'error',
        'no-throw-literal': 'error',
        'no-debugger': 'error',
        'no-empty': 'error',
        'no-var': 'error',
        'prefer-const': 'error',
        'no-dupe-args': 'error',
        'arrow-parens': [
            'error',
            'as-needed'
        ],
        'handle-callback-err': 'error',
        'no-console': 'off',
        "indent": [
            "off",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};