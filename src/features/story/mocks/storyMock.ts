import { Story, StorySegment } from "../types/StoryType";

export const MOCK_STORIES: Story[] = [
  {
    id: 1,
    title: "Echoes of Time",
    author: "Emily R.",
    category: "Literature",
    categoryColor: "#A855F7",
    duration: "120",
    content:
      "Once upon a time, a tiny mouse was playing. A big lion was sleeping nearby. The mouse accidentally ran across the lion's nose and woke him up.",
    image: require("@/public/assets/images/imgStory.png"),
    isFavorite: true,
  },
  {
    id: 2,
    title: "Whispers in the Wind",
    author: "David K.",
    category: "Travel",
    categoryColor: "#14B8A6",
    duration: "90",
    content:
      "In a small village, there was a garden that bloomed only at night. A curious girl named Lily discovered it one evening.",
    image: require("@/public/assets/images/imgStory.png"),
  },
  {
    id: 3,
    title: "City of Neon",
    author: "Sarah P.",
    category: "Sci-Fi",
    categoryColor: "#3B82F6",
    duration: "150",
    content:
      "Once there was a sweet little girl who always wore a red riding hood. One day, her mother asked her to take food to her grandmother.",
    image: require("@/public/assets/images/imgStory.png"),
  },
  {
    id: 4,
    title: "Ocean's Call",
    author: "Liam T.",
    category: "Romance",
    categoryColor: "#F43F5E",
    duration: "80",
    content:
      "A little bird fell from its nest during a storm. A kind boy named Tom found it shivering under a bush.",
    image: require("@/public/assets/images/imgStory.png"),
  },
  {
    id: 5,
    title: "The Magic Garden",
    author: "Anna M.",
    category: "Literature",
    categoryColor: "#A855F7",
    duration: "100",
    content:
      "The flowers glowed with golden light and whispered secrets of kindness.",
    image: require("@/public/assets/images/imgStory.png"),
  },
  {
    id: 6,
    title: "Red Riding Hood",
    author: "Tom W.",
    category: "Adventure",
    categoryColor: "#F59E0B",
    duration: "130",
    content:
      "Bunny was lost in the big meadow. He hopped left and right but could not find his home.",
    image: require("@/public/assets/images/imgStory.png"),
  },
];

export const MOCK_STORY_SEGMENTS: Record<number, StorySegment[]> = {
  1: [
    {
      text: "Once upon a time, a tiny mouse was playing in the forest. A big lion was sleeping nearby under a large tree.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 0,
      endTime: 30,
    },
    {
      text: "The mouse accidentally ran across the lion's nose and woke him up! The lion caught the mouse, but the mouse begged for mercy.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 30,
      endTime: 60,
    },
    {
      text: 'The lion laughed and let the mouse go. "You are too small to be my meal," he said kindly.',
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 60,
      endTime: 80,
    },
    {
      text: "Later, the lion was caught in a hunter's net. The tiny mouse heard his roar and came running to help.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 80,
      endTime: 100,
    },
    {
      text: "She gnawed through the ropes and set the lion free. From that day on, they became the best of friends.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 100,
      endTime: 120,
    },
  ],
  2: [
    {
      text: "In a small village, there was a garden that bloomed only at night. No one knew why.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 0,
      endTime: 30,
    },
    {
      text: "A curious girl named Lily discovered it one evening. The flowers glowed with golden light.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 30,
      endTime: 60,
    },
    {
      text: "Lily learned that the garden grew brighter when someone did a good deed. She started helping everyone in the village.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 60,
      endTime: 90,
    },
  ],
  3: [
    {
      text: "Once there was a sweet little girl who always wore a red riding hood. Everyone in the village loved her.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 0,
      endTime: 37,
    },
    {
      text: "One day, her mother asked her to take food to her grandmother who lived in the woods.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 37,
      endTime: 75,
    },
    {
      text: "On the way through the forest, she met a cunning wolf. The wolf tricked her and ran ahead.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 75,
      endTime: 112,
    },
    {
      text: "But a brave woodcutter saved them both. Red Riding Hood learned to always stay on the safe path.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 112,
      endTime: 150,
    },
  ],
  4: [
    {
      text: "A little bird fell from its nest during a storm. It was cold and afraid.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 0,
      endTime: 27,
    },
    {
      text: "A kind boy named Tom found it shivering under a bush. He carefully picked it up and made a warm nest.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 27,
      endTime: 54,
    },
    {
      text: "Soon the bird was strong enough to fly again. It sang a beautiful song for Tom before flying home.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 54,
      endTime: 80,
    },
  ],
  5: [
    {
      text: "A little bird fell from its nest during a storm. It was cold and afraid.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 0,
      endTime: 27,
    },
    {
      text: "A kind boy named Tom found it shivering under a bush. He carefully picked it up and made a warm nest.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 27,
      endTime: 54,
    },
    {
      text: "Soon the bird was strong enough to fly again. It sang a beautiful song for Tom before flying home.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 54,
      endTime: 80,
    },
  ],
  6: [
    {
      text: "Bunny was lost in the big meadow. He hopped left and right but could not find his home.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 0,
      endTime: 20,
    },
    {
      text: "A friendly squirrel offered to help. Together they crossed the stream and passed the tall oak tree.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 20,
      endTime: 40,
    },
    {
      text: "Finally, they found the cozy burrow under the hill. Bunny was so happy he shared his carrots with his new friend.",
      image: require("@/public/assets/images/imgStory.png"),
      startTime: 40,
      endTime: 60,
    },
  ],
};
