const CREATION_VERBS = [
  "building",
  "creating",
  "designing",
  "developing",
  "making",
];
const IDEA_TYPES = [
  "an app",
  "a website",
  "a product",
  "a service",
  "a tool",
  "a platform",
];
const PLACEHOLDER_IDEAS = [
  "Snore detector pillowcase for better sleep",
  "AI-powered wardrobe planner for fashionistas",
  "Virtual reality public speaking practice tool",
  "Plant-based recipe generator for meal planning",
  "Hologram pet projector for lonely individuals",
  "Augmented reality home design tool for DIYers",
  "AI matchmaking app for platonic friendships",
  "Smartphone breathalyzer for responsible drinking",
  "Eco-friendly period tracker with reusable pads",
  "Virtual closet swap app for sustainable fashion",
  "Bluetooth-enabled smart toaster with customized settings",
  "Portable UV-C sterilizer for germ-free travel",
  "Planetary alignment prediction for horoscopes lovers",
  "Whistle recognition to find lost keys",
  "AI-generated pick-up lines for shy daters",
  "Dog barking translator for pet owners",
  "Recipe generator based on fridge contents",
  "Mood-based playlist creator for music lovers",
  "Virtual reality meditation with cute animals",
  "Personalized fashion advisor using AI",
  "Sarcasm detector for text messages",
  "Language learning game with emojis",
  "Bad joke generator for pun enthusiasts",
  "Random acts of kindness idea generator",
  "Virtual pet that ages in real-time",
  "Recipe generator based on fridge contents",
  "App that predicts your next mood",
  "Language exchange with aliens",
  "Travel guide based on your playlist",
  "App that rates the perfect nap",
  "Personal stylist based on daily weather",
  "Time management game with virtual plants",
  "App that turns photos into music",
  "Virtual interior designer for tiny homes",
  "Personalized workout generator based on mood",
  "Virtual reality escape room with pets",
];

const getRandom = (arr: string[]): string => {
  const item = arr[Math.floor(Math.random() * arr.length)];
  return item ?? "";
};

const getRandomPartialIdea = () =>
  `I'm ${getRandom(CREATION_VERBS)} ${getRandom(IDEA_TYPES)}...`;

const getRandomCompleteIdea = (previousIdea?: string) => {
  console.log("getRandomCompleteIdea");
  let idea = getRandom(PLACEHOLDER_IDEAS);
  console.log("initial", idea);
  while (idea === previousIdea) {
    idea = getRandom(PLACEHOLDER_IDEAS);
  }
  return idea;
};

export const getRandomPlaceholder = (previousIdea?: string) => {
  if (Math.random() < 0.3) return getRandomPartialIdea();

  return getRandomCompleteIdea(previousIdea);
};
