import * as React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Text } from "~/components/ui/text";
import { TouchableOpacity, StyleSheet } from "react-native";
import { useCategoriesQuery } from "~/useFetch/useFetch";
export default function TabsFilter({ selectedCategory, setSelectedCategory }) {
  const [value, setValue] = React.useState("account");

  const categories = useCategoriesQuery();

  // console.log("The Fetched => ",categories.data);
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
       <TouchableOpacity
          style={[
            styles.tab,
            selectedCategory === "All" && styles.selectedTab,
          ]}
          onPress={() => setSelectedCategory("All")}
        >
          <Text
            style={[
              styles.tabText,
              selectedCategory === "All" && styles.selectedTabText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
      {categories?.data?.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.tab,
            selectedCategory === category.name && styles.selectedTab,
          ]}
          onPress={() => setSelectedCategory(category.name)}
        >
          <Text
            style={[
              styles.tabText,
              selectedCategory === category.name && styles.selectedTabText,
            ]}
          >
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
    paddingHorizontal: 20,
    height: 50
  },
  tab: {
    // padding: 10,
    marginHorizontal: 2,
    paddingHorizontal: 25,
    justifyContent: "center",
    alignItems: "center",
    height: 43,
    borderRadius: 50,
  },
  selectedTab: {
    backgroundColor: "#000",
  },
  tabText: {
    color: "#000",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  selectedTabText: {
    color: "#fff",
  },
});
