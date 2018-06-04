# Packages Used

```json
{
    "name": "react-native-elements",
    "version": "1.0.8",
    "private": true,
    "devDependencies": {
        "babel-eslint": "^8.2.1",
        "eslint": "^4.9.0",
        "eslint-config-airbnb": "^16.1.0",
        "eslint-plugin-flowtype": "^2.41.0",
        "eslint-plugin-import": "^2.7.0",
        "eslint-plugin-jsx-a11y": "^6.0.2",
        "eslint-plugin-react": "^7.4.0",
        "eslint-plugin-react-native": "^3.2.1",
        "exp": "53.1.0",
        "flow-bin": "0.63.1",
        "flow-result-checker": "^0.3.0",
        "jest-expo": "^27.0.0",
        "react-native-scripts": "1.11.1",
        "react-test-renderer": "16.0.0-alpha.12"
    },
    "main": "./node_modules/react-native-scripts/build/bin/crna-entry.js",
    "scripts": {
        "start": "react-native-scripts start",
        "eject": "react-native-scripts eject",
        "android": "react-native-scripts android",
        "ios": "react-native-scripts ios",
        "test": "node node_modules/jest/bin/jest.js",
        "test:watch": "node node_modules/jest/bin/jest.js --watch",
        "flow": "flow check --show-all-errors | flow-result-checker",
        "lint": "eslint App.js src/",
        "deploy:expo": "exp publish",
        "deploy": "yarn deploy:expo"
    },
    "jest": {
        "preset": "jest-expo",
        "transformIgnorePatterns": [
            "node_modules/(?!react-native|react-navigation|expo|native-base-shoutem-theme|@shoutem|react-clone-referenced-element|native-base|@expo|mobx-react)"
        ],
        "testResultsProcessor": "./node_modules/jest-junit-reporter"
    },
    "dependencies": {
        "@expo/vector-icons": "6.3.1",
        "autobind-decorator": "^1.4.0",
        "crypto-js": "^3.1.9-1",
        "expo": "^27.0.2",
        "gl-react": "^3.15.0",
        "gl-react-expo": "^3.16.3",
        "jest-junit-reporter": "^1.1.0",
        "lodash": "^4.17.4",
        "mobx": "^3.4.1",
        "mobx-react": "^4.3.5",
        "moment": "^2.18.1",
        "react": "16.3.1",
        "react-native": "https://github.com/expo/react-native/archive/sdk-27.0.2.tar.gz",
        "react-native-datepicker": "1.6.0",
        "react-native-keyboard-spacer": "^0.4.1",
        "react-native-maps-super-cluster": "^1.3.1",
        "react-navigation": "2.0.1"
    }
}
```
