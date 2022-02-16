module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3.6
      }
    ],
    '@babel/preset-react'
  ],
  plugins: process.env.ENV === 'production'
    ? [
      '@babel/syntax-dynamic-import', 
      ['transform-remove-console', { exclude: ['error', 'warn'] }]
    ]
    : [
      '@babel/syntax-dynamic-import'
    ]
}
