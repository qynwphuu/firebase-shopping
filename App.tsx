import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, Button, Alert, FlatList } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { app } from "./firebaseConfig";
import { getDatabase, push, ref, onValue } from "firebase/database";

export default function App() {
  const database = getDatabase(app);

  type Product = {
    title: string;
    amount: string;
  };

  const [product, setProduct] = useState<Product>({
    title: "",
    amount: "",
  });
  const [items, setItems] = useState<Product[]>([]);

  const handleSave = () => {
    if (product.amount && product.title) {
      push(ref(database, "items/"), product);
    } else {
      Alert.alert("Error", "Type product and amount first");
    }
  };

  useEffect(() => {
    return onValue(ref(database, "items/"), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setItems(Object.values(data) as Product[]);
      } else {
        setItems([]);
      }
    });
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <TextInput
            placeholder="Product title"
            onChangeText={(text) => setProduct({ ...product, title: text })}
            value={product.title}
          />
          <TextInput
            placeholder="Amount"
            onChangeText={(text) => setProduct({ ...product, amount: text })}
            value={product.amount}
          />

          <Button onPress={handleSave} title="SAVE" />

          <FlatList
            renderItem={({ item }) => (
              <View>
                <Text style={{ fontSize: 18 }}>
                  {item.title}, {item.amount}
                </Text>
              </View>
            )}
            data={items}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
