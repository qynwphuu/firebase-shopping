import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  FlatList,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import { app } from "./firebaseConfig";
import { getDatabase, push, ref, onValue, remove } from "firebase/database";

export default function App() {
  const database = getDatabase(app);

  type Product = {
    id: string;
    title: string;
    amount: string;
  };

  const [product, setProduct] = useState<Product>({
    id: "",
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

    setProduct({
      id: "",
      title: "",
      amount: "",
    });
  };

  const handleDelete = (id: string) => {
    remove(ref(database, "items/" + id));
  };

  useEffect(() => {
    return onValue(ref(database, "items/"), (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsedItems = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setItems(parsedItems);
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
            style={styles.input}
            placeholder="Product"
            onChangeText={(text) => setProduct({ ...product, title: text })}
            value={product.title}
          />
          <TextInput
            style={styles.input}
            placeholder="Amount"
            onChangeText={(text) => setProduct({ ...product, amount: text })}
            value={product.amount}
          />

          <Button onPress={handleSave} title="SAVE" />

          <Text style={styles.header}>Shopping List</Text>

          <FlatList
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={styles.text}>
                  {item.title}, {item.amount}
                </Text>
                <Text
                  style={{ color: "#0d00ff", marginLeft: 15, fontSize: 16 }}
                  onPress={() => handleDelete(item.id)}
                >
                  Delete
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
    paddingTop: 50,
  },
  input: {
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    margin: 5,
    padding: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  text: {
    fontSize: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});
