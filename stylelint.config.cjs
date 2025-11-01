module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    'selector-max-id': 0,
    'no-descending-specificity': null,
    'color-hex-length': null,
    'color-function-notation': null,
    'alpha-value-notation': null,
    'font-family-name-quotes': null,
    'media-feature-range-notation': null,
    'declaration-empty-line-before': null,
  },
  ignoreFiles: ['dist/**/*.css', 'export-lovable/**/*.css'],
};
