# Building a seed project

You just acquired React Native Elements. Congratulations 🙌🏻. You followed the installation steps and you are able to run the project locally. Now, it's time to get started. What are the next steps?

Elements has a main entry point that can lead to five different demo apps (music, food, social, travel, and photography). But you are building a single app so you need to make some changes into the file structure, navigation tree, and the app providers.

## Understanding the file structure

Below is how the project file structure looks like.

```
src/
  - components/
  - food/
    - api/
    - components/
    - Recipes.js
    - Recipe.js
App.js
```

`App.js` is the entry point of the application, it defines the root navigation three.

`src/components` contains all the UI components that are horizontal to each screens of the application.

Then we created one folder per application (`src/food`, `src/social`, and so on). In your case, you have only one application so you don't need this extra level of depth.

There is an `api` folder that contains all the data used by the screens. Right now, it's just some JSON files with dummy data. We recommend you create a `src/api` folder where you wire your own backend. If you are using Firebase, [we have some YouTube tutorials available](Faq.md). If you are consuming a Rest API with something like Swagger or Thrift, this folder will client contain client-side-generated-code from these tools.

Finally, you might have some components which are only used for a particular screen and don't fit in `src/components`. Assume your screen name is `Home`, then your file structure should look like below.

```
src/
  - Home/
    - index.js
    - Home.js
    - components/
```

We create a folder named `Home` with a file of the same name inside that contains the screen implementation. Inside the folder we also create a `components` folder that contains all the screen specific UI components.

## Navigation

The app navigation tree, defined with [react-navigation](https://reactnavigation.org/) need to also be symmetric with your project file structure. We use three kind of navigators: Switch, Tab, and Stack. There are some other navigator available like the Drawer navigator that might be of interest to you.

The [Switch Navigator](https://reactnavigation.org/docs/en/switch-navigator.html) is used for same level screens that should only be mounted once at a time. The typical use case of this navigator is authentication. You can use it to navigate from a public screen like `Login` or `Sign-Up` to a private screen like `Home`.

The [Tab Navigator](https://reactnavigation.org/docs/en/bottom-tab-navigator.html) is self-explanatory, we use it for application tabs. 

Finally, the [Stack Navigator](https://reactnavigation.org/docs/en/stack-navigator.html) is used to organize screens that have a hierarchical relationship with each others. For instance `Users -> User`.

## App providers

In Elements, we use MobX to provide global states for the app. We define two providers: `Theme` that defines the primary and secondary color of the app and `Player` that is used in the music app in order to reflect the state of the audio player consistently across the whole application. These are defined in `App.js` as below.

```
<Provider theme={createTheme()} player={new Player()}>
  ...
</Provider>
```

If you don't plan on using an Audio player in your project, you can remove the `player` property from `Provider`.

You might also not need the theme values of your app to change dynamically the same way we do in Elements. There you could remove this property as well. Beware that some component do require the `theme` injected into them via `withTheme()` and you would need to refactor these components as well.

Whether you are using these providers or not, your app is likely to need one, Internalization is an example, user session information is another one. For these cases, `theme` and `players` are great examples to look at. 

## Reach out for help

If you are struggling to get started please post a new issue on the Github repository, or <a href="mailto:wcandillon@gmail.com">contact us</a>.