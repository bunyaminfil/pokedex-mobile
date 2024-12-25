const { getDefaultConfig } = require("expo/metro-config"); // Use this if you're using Expo
// For non-Expo projects, use `require('metro-config').getDefaultConfig`.

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.alias = {
    "@": __dirname, // Point @ to the project root
};

module.exports = defaultConfig;
