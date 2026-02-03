import React from "react";
import { Dimensions } from "react-native";

import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

const { width } = Dimensions.get("window");

interface QuestionCardProps {
  stepData: any;
  selections: Record<string, string>;
  onSelect: (value: string) => void;
  options: any[];
}

const QuestionCard = ({
  stepData,
  selections,
  onSelect,
  options,
}: QuestionCardProps) => {
  return (
    <Box
      className="bg-white rounded-[32px] p-6 self-center shadow-xl border border-gray-50 mt-4 mb-24"
      style={{ width: width * 0.9 }}
    >
      <VStack space="xs" className="mb-6">
        <Heading size="md" className="text-gray-800 text-[20px] font-bold">
          ⏰ {stepData.question.en}
        </Heading>
        <Text className="text-gray-400 text-[15px] italic font-medium">
          {stepData.question.vi}
        </Text>
      </VStack>

      <VStack space="md">
        {options.map((item, index) => {
          const value = typeof item === "string" ? item : item.en;
          const labelVi = typeof item === "string" ? null : item.vi;
          const isSelected = selections[stepData.id] === value;

          return (
            <Pressable
              key={index}
              onPress={() => onSelect(value)}
              className={`flex-row items-center p-4 rounded-[20px] border-2 ${
                isSelected
                  ? "border-green-400 bg-green-50"
                  : "border-gray-100 bg-gray-50/40"
              }`}
            >
              <Box
                className={`w-6 h-6 rounded-full border-2 mr-4 items-center justify-center ${
                  isSelected
                    ? "bg-green-500 border-green-500"
                    : "border-gray-200 bg-white"
                }`}
              >
                {isSelected && (
                  <Text className="text-white text-[18px] font-bold">✓</Text>
                )}
              </Box>

              <VStack className="flex-1">
                <Text
                  className={`text-[18px] ${
                    isSelected
                      ? "text-green-900 font-bold"
                      : "text-gray-600 font-medium"
                  }`}
                >
                  {value}
                </Text>
                {labelVi && (
                  <Text className="text-[11px] text-gray-400 font-medium">
                    {labelVi}
                  </Text>
                )}
              </VStack>
            </Pressable>
          );
        })}
      </VStack>
    </Box>
  );
};

export default QuestionCard;
