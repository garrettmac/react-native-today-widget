# React Native Today Widget
> Add iOS Today Widget App Extension to your React Native app


What is [Today Widget](https://developer.apple.com/ios/human-interface-guidelines/extensions/widgets/)?

## Getting started

This library will help you to add iOS Today Widget App Extension without need to open XCode.

### Dependencies

- `realpath` (from `coreutils`) for postinstall script setting bundle ID of the Today Widget:
```bash
$ brew install coreutils
```

- `xcodeproj` for linking script:
```bash
$ gem install xcodeproj
```
You may need to use `sudo gem install xcodeproj` or `sudo gem install -n /usr/local/bin xcodeproj` depends on your Ruby installation.

### Setup

```bash
$ yarn add react-native-today-widget
$ react-native link
```
You could use `$ npm i react-native-today-widget --save` as well, but don't forget to save it in `package.json` dependencies. Otherwise RN will not link it.

### Usage

All you need is to register your component for key `TodayWidgetExtension` in your `index.ios.js`
```jsx
const TodayWidget = () => {
  <View>
    <Text>
      Hello Today Widget!
    </Text>
  </View>
};

AppRegistry.registerComponent('TodayWidgetExtension', () => TodayWidget);
```
In place of `TodayWidget` component, you could use any JSX component. See [HelloToday example](https://github.com/matejkriz/react-native-today-widget/blob/master/Examples/HelloToday/index.ios.js#L30).

Run your app as usual:
```bash
react-native run-ios
```

Display new widget on Search screen or by force touch on your app icon (on devices supporting 3D Touch).

If you need to see logs from TodayWidgetExtension, use:
```bash
react-native log-ios
```

### Memory limitation
The memory limit for Today Widget on device is 16 MB. (Great explanation is in this [talk by Conrad Kramer](https://cocoaheads.tv/memory-use-in-extensions-by-conrad-kramer/))

Verified experimentally using [XCode debugger](https://developer.apple.com/library/content/documentation/DeveloperTools/Conceptual/debugging_with_xcode/chapters/debugging_tools.html#//apple_ref/doc/uid/TP40015022-CH8-SW16) - while loading big image, Today Widget crashes as soon as it reaches 16 MB memory usage.

Memory usage of simple [HelloToday](https://github.com/matejkriz/react-native-today-widget/tree/master/Examples/HelloToday) example with just one Text element is about 11 MB. Up to 13 MB during content rendering.

> For running Today Widget on device you have to use [`Release` build configuration](http://facebook.github.io/react-native/releases/0.48/docs/running-on-device.html#2-configure-release-scheme). Development mode adds too much overhead. Only possibility to run the widget on device in development mode is using [Instruments](https://developer.apple.com/library/content/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/index.html#//apple_ref/doc/uid/TP40004652-CH3-SW1) tool to temporarily disable the limit.


### Notes
- Look at the [Examples/HelloToday](https://github.com/matejkriz/react-native-today-widget/tree/master/Examples/HelloToday). Only changes from output of `react-native init` are in `package.json` and `index.ios.js` files.
- For recomended transparent background simply don't set any `backgroundColor` for your Today Widget component.
- [Human Interface Guidelines](https://developer.apple.com/ios/human-interface-guidelines/extensions/widgets/)
- Today Widget content will reload when you leave search screen and go back.
- More about: [iOS App Extensions](https://developer.apple.com/app-extensions/)
- [Today Widget in App Extension Programming Guide](https://developer.apple.com/library/content/documentation/General/Conceptual/ExtensibilityPG/Today.html#//apple_ref/doc/uid/TP40014214-CH11-SW1)

### API Reference

#### `setExpandable([expandable], [maxHeight])`
Enables to display native Show More / Less button in top right corner of the widget (iOS 10).

- `expandable` - if `false` Show More / Less button is hidden
- `maxHeight` - height of expanded widget

Height of collapsed Today Widget is always 110px on iOS 10.

##### Example
```jsx
import { setExpandable } from 'react-native-today-widget';

const TodayWidget = () => {
  const isExpandable = true;
  const maxHeight = 500;
  setExpandable(isExpandable, maxHeight);
  const onLayout = (event) => {
    const height = event.nativeEvent.layout.height;
    if (height <= 110) {
      console.log('widget is in compact mode');
    }
    else if (height > 110) {
      console.log('widget is in expanded mode');
    }
  }
  return (
    <View onLayout={onLayout}>
      <Text>
        Hello Today Widget!
      </Text>
    </View>
  );
};
```


### TODO
- [x] Set Bundle Identifier by the main app in postinstall.

- [x] Embed Extensions binary to the main app in postlink.

- [ ] Enhance documentation.
  - [ ] Add screenshots.
  - [ ] Describe manual linking.
  - [ ] Describe usage of provided scripts.


- [ ] Enable to set Display Name for the extension.

- [x] Implement Show More/Less button.

- [ ] Implement link to main app.

- [ ] Implement conditional displaying of the widget.

- [ ] Enable splitting the code for main app and the widget.

- [ ] Describe how to share data between the widget and the app.

- [ ] Describe error handling and debugging.

- [ ] Provide component to fake search screen in main app during widget development.
