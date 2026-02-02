import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const QuestionCard = ({ stepData, selections, onSelect, options }: any) => {
  return (
    <View style={styles.card}>
      <View style={{ paddingBottom: 15 }}>
        <Text style={styles.subtitle}>{stepData.question.en}</Text>
        <Text style={styles.subtitleViet}>{stepData.question.vi}</Text>
      </View>

      {options.map((item: any, index: number) => {
        const isString = typeof item === "string";
        const labelEn = isString ? item : item.en;
        const labelVi = isString ? null : item.vi;
        const value = isString ? item : item.en;

        const isSelected = selections[stepData.id] === value;

        return (
          <TouchableOpacity
            key={index}
            activeOpacity={0.3}
            onPress={() => onSelect(value)}
            style={[styles.option, isSelected && styles.optionSelected]}
          >
            <View
              style={[styles.checkbox, isSelected && styles.checkboxActive]}
            >
              {isSelected && <Text style={styles.check}>✓</Text>}
            </View>
            <View>
              <Text
                style={[styles.timeText, isSelected && styles.timeTextActive]}
              >
                {labelEn}
              </Text>
              {labelVi && (
                <Text style={{ fontSize: 12, color: "#AAA" }}>{labelVi}</Text>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.8,
    backgroundColor: "#FFF",
    borderRadius: 30,
    padding: 20,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#E8F5E9",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  subtitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  subtitleViet: {
    fontSize: 14,
    color: "#9E9E9E",
    fontStyle: "italic",
    marginTop: 2,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    marginBottom: 10,
    backgroundColor: "#FAFAFA",
  },
  optionSelected: { borderColor: "#C5E1A5", backgroundColor: "#F1F8E9" },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#DDD",
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxActive: { backgroundColor: "#8BC34A", borderColor: "#8BC34A" },
  check: { color: "#FFF", fontSize: 12, fontWeight: "bold" },
  timeText: { fontSize: 16, color: "#555" },
  timeTextActive: { color: "#333", fontWeight: "bold" },
});

export default QuestionCard;
