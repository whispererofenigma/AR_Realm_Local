 const workletsPluginOptions = {
    // Your custom options.
  }

module.exports = {
  presets: ['module:@react-native/babel-preset'],
   plugins: [
    ['module-resolver', {
      root: ['./App'],
      alias: {
        '@': './App'
      }
    }],
    ['react-native-worklets/plugin', workletsPluginOptions],
  ]
};