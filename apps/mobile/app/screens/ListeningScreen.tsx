import React, { useState } from "react";
import {
  View, Text, FlatList, TextInput,
  TouchableOpacity, StyleSheet
} from "react-native";
import { useRouter } from "expo-router";
import { red } from "react-native-reanimated/lib/typescript/Colors";

const dummyQuestions = [
  { id: "1", question: "What did you hear?" },
  { id: "2", question: "Summarize the audio." },
];

export default function ListeningScreen() {
  const router = useRouter();

  const [answers, setAnswers] = useState<any>({});

  const handleAnswer = (id: string, text: string) => {
    setAnswers({ ...answers, [id]: text });
  };

  const allAnswered = Object.keys(answers).length === dummyQuestions.length;

  const handleNext = () => {
    router.push("/write");
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Listening Test</Text>

      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={dummyQuestions}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.card}>
            <Text style={styles.question}>
              {index + 1}. {item.question}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Type your answer..."
              onChangeText={(text) => handleAnswer(item.id, text)}
            />
          </View>
        )}
      />

      <TouchableOpacity
        style={[styles.btnSmall, !allAnswered && styles.disabled]}
        disabled={!allAnswered}
        onPress={handleNext}
      >
        <Text style={styles.btnText}>Next</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  card: { marginBottom: 15 },
  question: { fontSize: 16 },
  input: {
    borderWidth: 1,
    marginTop: 5,
    padding: 10,
    borderRadius: 5
  },
  list: { flexGrow: 1 },
  listContent: { paddingBottom: 16 },
  btn: {
    backgroundColor: "blue",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 5
  },
  btnSmall: {
    backgroundColor: "blue",
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    borderRadius: 5,
    width: 120,
    alignSelf: "flex-end",
    marginTop: 10
  },
  disabled: { backgroundColor: "gray" },
  btnText: { color: "#fff", fontWeight: "bold" }
});