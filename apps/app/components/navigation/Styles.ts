//const insets = useSafeAreaInsets(); // We'd have to do this in each tab navigator and set the height there
//const tabHeight = insets.bottom + 49;
export const Constants = {
  tabHeight: 49,
};
export const ComponentStyles = {
  header: {
    backgroundColor: "#25262b",
    borderBottomColor: "#695895",
    borderBottomWidth: 1,
    elevation: 0, // android
    shadowOffset: {
      // for iOS
      width: 0,
      height: 0,
    },
  },
  tabBar: {
    height: Constants.tabHeight,
    backgroundColor: "#25262b",
    borderTopColor: "#695895",
    borderTopWidth: 1,
    elevation: 0, // android
    shadowOffset: {
      // for iOS
      width: 0,
      height: 0,
    },
  },
};
export const GenericOptions = {
  headerOptions: {
    headerShadowVisible: true,
    headerTintColor: "#695895",
    headerStyle: ComponentStyles.header,
  },
  tabBarOptions: {
    tabBarActiveBackgroundColor: "#25262b", //something
    //tabBarBackground: can use a function that returns a background image or something
    tabBarActiveTintColor: "#695895",
    tabBarStyle: ComponentStyles.tabBar,
  },
};
