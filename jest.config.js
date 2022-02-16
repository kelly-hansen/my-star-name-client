module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json'],
  snapshotSerializers: [
    'enzyme-to-json/serializer'
  ],
  transform: {
    '^.+\\.js$': './src/tests/transform.js'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/']
}
