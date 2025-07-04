import { Tabs } from "expo-router";
import { Home, Search } from "lucide-react-native";
const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "black",
          paddingTop: 10,
          height: 110,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          overflow: "hidden",
          position: "absolute",
          borderColor: "tomato",
          borderTopWidth: 1, 
          borderWidth: 0,
          borderStyle: "solid",
          
        },
        tabBarLabelStyle: {
          fontFamily: "OutfitRegular",
          fontSize: 10,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({
            color,
            size,
            focused,
          }: {
            color: string;
            size: number;
            focused: boolean;
          }) => <Home color={color} size={focused ? size + 4 : size} />,
        }}
      />
    
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({
            color,
            size,
            focused,
          }: {
            color: string;
            size: number;
            focused: boolean;
          }) => <Search color={color} size={focused ? size + 4 : size} />,
        }}
      />
     
    </Tabs>
  );
};
export default _layout;
