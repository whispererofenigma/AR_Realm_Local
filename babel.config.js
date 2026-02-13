module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./App'],
        alias: {
          '@': './App',
        },
      },
    ],

    'react-native-reanimated/plugin', // MUST be last
  ],
};
