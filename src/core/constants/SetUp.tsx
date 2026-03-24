const SETUP_STEPS = [
  // --- PHẦN CỦA CON ---
  {
    id: "wake_up",
    type: "morning",
    icon: "☀️",
    question: {
      vi: "Bé thức dậy vào lúc mấy giờ?",
      en: "What time does the baby wake up?",
    },
    chat: {
      vi: "Chào bạn! Hãy cho mình biết giờ giấc sinh hoạt của bé nhé.",
      en: "Hi! Let me know about your baby’s daily routine.",
    },
  },
  {
    id: "breakfast",
    type: "morning",
    icon: "🥣",
    question: {
      vi: "Bé ăn sáng lúc mấy giờ?",
      en: "What time does the baby have breakfast?",
    },
    chat: {
      vi: "Tiếp theo, cho mình biết giờ ăn sáng của bé nhé.",
      en: "Next, tell me the baby’s breakfast time.",
    },
  },
  {
    id: "nap",
    type: "afternoon",
    icon: "😴",
    question: {
      vi: "Bé ngủ trưa lúc mấy giờ?",
      en: "What time does the baby take a nap?",
    },
    chat: {
      vi: "Tiếp theo, cho mình biết giờ ngủ trưa của bé nhé.",
      en: "Next, tell me the baby’s nap time.",
    },
  },
  {
    id: "bath",
    type: "evening",
    icon: "🛁",
    question: {
      vi: "Bé tắm lúc mấy giờ?",
      en: "What time is the baby’s bath time?",
    },
    chat: {
      vi: "Tiếp theo, cho mình biết giờ tắm của bé nhé.",
      en: "Next, tell me the baby’s bath time.",
    },
  },
  {
    id: "sleep",
    type: "night",
    icon: "🌙",
    question: {
      vi: "Bé đi ngủ lúc mấy giờ?",
      en: "What time does the baby go to sleep?",
    },
    chat: {
      vi: "Cuối cùng, cho mình biết giờ đi ngủ của bé nhé.",
      en: "Finally, tell me the baby’s bedtime.",
    },
  },

  // --- PHẦN CỦA BA MẸ ---
  {
    id: "parent_free_time",
    icon: "⏰",
    question: {
      vi: "Ba/mẹ thường rảnh vào thời gian nào?",
      en: "When are the parents usually free?",
    },
    chat: {
      vi: "Bây giờ, hãy cho mình biết thời gian rảnh của ba mẹ nhé.",
      en: "Now, please tell me about the parents’ free time.",
    },
    customOptions: [
      { en: "Early morning (before work)" },
      { en: "Afternoon (after work)" },
      { en: "Evening (after dinner)" },
      { en: "Anytime" },
    ],
  },
  {
    id: "parent_duration",
    icon: "⏱️",
    question: {
      vi: "Ba/mẹ có thể giành bao nhiêu thời gian mỗi ngày?",
      en: "How much time can you spend each day?",
    },
    chat: {
      vi: "Bây giờ, hãy cho mình biết thời gian rảnh của ba mẹ nhé.",
      en: "Now, please tell me about the parents’ free time.",
    },
    customOptions: [
      { en: "30 minutes" },
      { en: "40 minutes" },
      { en: "50 minutes" },
      { en: "60 minutes" },
    ],
  },
];

const TIME_OPTIONS = {
  morning: ["06:00", "06:30", "07:00", "07:30"],
  afternoon: ["11:00", "11:30", "12:00", "12:30"],
  evening: ["16:00", "16:30", "17:00", "17:30"],
  night: ["19:30", "20:00", "20:30", "21:00"],
};

export { SETUP_STEPS, TIME_OPTIONS };
