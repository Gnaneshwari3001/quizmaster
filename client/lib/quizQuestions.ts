const allQuestions = [
  {
    question: "A clock shows 3:15. What is the angle between the hour and minute hands?",
    type: "multiple-choice",
    options: ["0°", "7.5°", "15°", "22.5°"],
    correctAnswer: "7.5°",
    category: "logic",
    difficulty: "medium"
  },
  {
    question: "A man pushes his car to a hotel and loses his fortune. Why?",
    type: "text",
    correctAnswer: "He's playing Monopoly",
    category: "brainstorming",
    difficulty: "hard"
  },
  {
    question: "What comes next in the sequence: 2, 6, 12, 20, 30, ?",
    type: "multiple-choice",
    options: ["40", "42", "44", "46"],
    correctAnswer: "42",
    category: "logic",
    difficulty: "medium"
  },
  {
    question: "A farmer needs to get a fox, chicken, and bag of grain across a river. He can only take one item at a time. How does he do it without anything being eaten?",
    type: "text",
    correctAnswer: "Take chicken first, then bring grain and take chicken back, leave chicken and take fox, then return for chicken",
    category: "brainstorming",
    difficulty: "hard"
  },
  {
    question: "If it takes 5 machines 5 minutes to make 5 widgets, how long would it take 100 machines to make 100 widgets?",
    type: "multiple-choice",
    options: ["5 minutes", "20 minutes", "100 minutes", "500 minutes"],
    correctAnswer: "5 minutes",
    category: "logic",
    difficulty: "medium"
  },
  {
    question: "You have two ropes. Each rope takes exactly 1 hour to burn, but they don't burn at a uniform rate. How can you measure 45 minutes?",
    type: "text",
    correctAnswer: "Light both ends of one rope and one end of the other. When the first rope burns out (30 min), light the other end of the second rope",
    category: "brainstorming",
    difficulty: "hard"
  },
  {
    question: "What is the missing number in the sequence: 1, 1, 2, 3, 5, 8, 13, ?",
    type: "multiple-choice",
    options: ["18", "19", "20", "21"],
    correctAnswer: "21",
    category: "logic",
    difficulty: "easy"
  },
  {
    question: "A man lives on the 20th floor of an apartment building. Every morning he takes the elevator down to the ground floor. When he comes home, he takes the elevator to the 10th floor and walks the rest of the way... except on rainy days. Why?",
    type: "text",
    correctAnswer: "He's too short to reach the button for the 20th floor, except when he has an umbrella",
    category: "brainstorming",
    difficulty: "hard"
  },
  {
    question: "If you're running a race and you pass the person in second place, what place are you in?",
    type: "multiple-choice",
    options: ["First place", "Second place", "Third place", "It depends"],
    correctAnswer: "Second place",
    category: "logic",
    difficulty: "easy"
  },
  {
    question: "You're in a room with three light switches. Each switch controls a light bulb in another room. You can only visit the other room once. How do you determine which switch controls which bulb?",
    type: "text",
    correctAnswer: "Turn on first switch for a few minutes, turn it off, turn on second switch, then go to the room. The bulb that's on is switch 2, the warm bulb is switch 1, the cool off bulb is switch 3",
    category: "brainstorming",
    difficulty: "hard"
  },
  {
    question: "What's the next number in the pattern: 2, 4, 8, 16, 32, ?",
    type: "multiple-choice",
    options: ["48", "60", "64", "72"],
    correctAnswer: "64",
    category: "logic",
    difficulty: "easy"
  },
  {
    question: "A doctor gives you three pills and tells you to take one every half hour. How long will the pills last?",
    type: "multiple-choice",
    options: ["30 minutes", "1 hour", "1.5 hours", "2 hours"],
    correctAnswer: "1 hour",
    category: "logic",
    difficulty: "medium"
  },
  {
    question: "If a plane crashes on the border of two countries, where do you bury the survivors?",
    type: "multiple-choice",
    options: ["Country A", "Country B", "International waters", "You don't bury survivors"],
    correctAnswer: "You don't bury survivors",
    category: "logic",
    difficulty: "easy"
  },
  {
    question: "You have 12 balls that look identical. One ball is either heavier or lighter than the others. Using a balance scale only 3 times, how can you find the odd ball?",
    type: "text",
    correctAnswer: "Divide into 3 groups of 4. Weigh two groups. If balanced, odd ball is in third group. If not balanced, it's in the heavier/lighter group. Continue dividing and weighing",
    category: "brainstorming",
    difficulty: "hard"
  },
  {
    question: "A man was born in 1955. Today is his 18th birthday. How is this possible?",
    type: "text",
    correctAnswer: "He was born in room 1955 of a hospital",
    category: "brainstorming",
    difficulty: "hard"
  },
  {
    question: "If you have a 3-gallon jug and a 5-gallon jug, how can you measure exactly 4 gallons?",
    type: "text",
    correctAnswer: "Fill 5-gallon jug, pour into 3-gallon jug (2 gallons left in 5-gallon), empty 3-gallon, pour the 2 gallons into 3-gallon, fill 5-gallon again, pour into 3-gallon (1 gallon fits), leaving 4 gallons in 5-gallon jug",
    category: "brainstorming",
    difficulty: "hard"
  },
  {
    question: "What comes next in this sequence: O, T, T, F, F, S, S, E, ?",
    type: "multiple-choice",
    options: ["I", "N", "T", "E"],
    correctAnswer: "N",
    category: "logic",
    difficulty: "hard"
  },
  {
    question: "A woman has seven daughters. Each daughter has one brother. How many children does the woman have?",
    type: "multiple-choice",
    options: ["7", "8", "14", "15"],
    correctAnswer: "8",
    category: "logic",
    difficulty: "medium"
  },
  {
    question: "Five pirates find 100 gold coins. They must decide how to distribute them. The most senior pirate proposes a distribution. All pirates (including the proposer) vote. If at least half agree, the coins are distributed accordingly. Otherwise, the proposer is thrown overboard and the next most senior pirate makes a proposal. What should the most senior pirate propose?",
    type: "text",
    correctAnswer: "98 coins for himself, 0 for second pirate, 1 for third pirate, 0 for fourth pirate, 1 for fifth pirate",
    category: "brainstorming",
    difficulty: "hard"
  },
  {
    question: "What comes next in this pattern: Red, Green, Blue, Red, Green, ?",
    type: "multiple-choice",
    options: ["Blue", "Red", "Yellow", "Purple"],
    correctAnswer: "Blue",
    category: "logic",
    difficulty: "easy"
  },
  {
    question: "If you could solve one world problem, what would it be and why?",
    type: "text",
    correctAnswer: "Any thoughtful answer about global issues like poverty, climate change, education, etc.",
    category: "brainstorming",
    difficulty: "medium"
  },
  {
    question: "A snail is at the bottom of a 20-foot well. Each day it climbs up 3 feet, but each night it slides back down 2 feet. How many days will it take for the snail to reach the top?",
    type: "multiple-choice",
    options: ["18 days", "19 days", "20 days", "21 days"],
    correctAnswer: "18 days",
    category: "logic",
    difficulty: "medium"
  },
  {
    question: "Name three creative uses for a paperclip that aren't holding papers together.",
    type: "text",
    correctAnswer: "Reset device buttons, zipper pull replacement, bookmark, jewelry, lock pick, phone stand",
    category: "brainstorming",
    difficulty: "easy"
  },
  {
    question: "Which number should replace the question mark: 2, 6, 12, 20, 30, ?",
    type: "multiple-choice",
    options: ["40", "42", "44", "46"],
    correctAnswer: "42",
    category: "logic",
    difficulty: "medium"
  },
  {
    question: "You have 9 balls that look identical. 8 weigh the same, but 1 is heavier. Using a balance scale only twice, how can you find the heavy ball?",
    type: "text",
    correctAnswer: "Divide into 3 groups of 3. Weigh two groups. If balanced, heavy ball is in third group. If not, it's in heavier group. Then weigh 2 balls from the heavy group.",
    category: "logic",
    difficulty: "hard"
  },
  {
    question: "What's the most creative way to use a smartphone besides calling, texting, or browsing the internet?",
    type: "text",
    correctAnswer: "Any creative answer like microscope with lens, plant growth time-lapse, spirit level, magnifying glass, etc.",
    category: "brainstorming",
    difficulty: "medium"
  },
  {
    question: "If today is Wednesday, what day will it be 100 days from now?",
    type: "multiple-choice",
    options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    correctAnswer: "Thursday",
    category: "logic",
    difficulty: "medium"
  },
  {
    question: "How would you improve the design of a common household item like a toothbrush?",
    type: "text",
    correctAnswer: "Any innovative improvement like replaceable heads, built-in timer, UV sanitizer, ergonomic grip, etc.",
    category: "brainstorming",
    difficulty: "medium"
  },
  {
    question: "A father is 30 years older than his son. In 12 years, he will be twice as old as his son. How old is the father now?",
    type: "multiple-choice",
    options: ["42 years", "48 years", "54 years", "60 years"],
    correctAnswer: "42 years",
    category: "logic",
    difficulty: "medium"
  },
  {
    question: "List three things that are always in front of you but can't be touched.",
    type: "text",
    correctAnswer: "Future, horizon, your reflection, shadow, air, etc.",
    category: "brainstorming",
    difficulty: "medium"
  },
  {
    question: "What comes next: 1, 4, 9, 16, 25, ?",
    type: "multiple-choice",
    options: ["30", "35", "36", "49"],
    correctAnswer: "36",
    category: "logic",
    difficulty: "easy"
  },
  {
    question: "If you could add one subject to school curriculum worldwide, what would it be?",
    type: "text",
    correctAnswer: "Any thoughtful answer like emotional intelligence, financial literacy, critical thinking, life skills, etc.",
    category: "brainstorming",
    difficulty: "medium"
  },
  {
    question: "In a race, you overtake the person in 2nd place. What position are you in now?",
    type: "multiple-choice",
    options: ["1st place", "2nd place", "3rd place", "It depends"],
    correctAnswer: "2nd place",
    category: "logic",
    difficulty: "easy"
  },
  {
    question: "Think of an innovative solution for reducing food waste in restaurants.",
    type: "text",
    correctAnswer: "Any creative solution like smaller portions, donation programs, compost systems, apps for leftovers, etc.",
    category: "brainstorming",
    difficulty: "medium"
  },
  {
    question: "Which shape comes next in this sequence: Circle, Square, Triangle, Circle, Square, ?",
    type: "multiple-choice",
    options: ["Triangle", "Circle", "Pentagon", "Rectangle"],
    correctAnswer: "Triangle",
    category: "logic",
    difficulty: "easy"
  },
  {
    question: "What's a creative way to make waiting in line more enjoyable for everyone?",
    type: "text",
    correctAnswer: "Any creative idea like games, entertainment, information displays, social activities, music, etc.",
    category: "brainstorming",
    difficulty: "easy"
  },
  {
    question: "If you arrange these numbers in ascending order, which comes third: 0.7, 3/4, 0.65, 4/5?",
    type: "multiple-choice",
    options: ["0.7", "3/4", "0.65", "4/5"],
    correctAnswer: "3/4",
    category: "logic",
    difficulty: "medium"
  },
  {
    question: "Design a new public transportation system for your ideal city.",
    type: "text",
    correctAnswer: "Any innovative transport idea like underground pods, aerial routes, renewable energy, smart scheduling, etc.",
    category: "brainstorming",
    difficulty: "hard"
  },
  {
    question: "Mary's mother has four children: North, South, East, and ___?",
    type: "multiple-choice",
    options: ["West", "Mary", "Middle", "Center"],
    correctAnswer: "Mary",
    category: "logic",
    difficulty: "easy"
  },
  {
    question: "What's an innovative way to help elderly people feel more connected to their community?",
    type: "text",
    correctAnswer: "Any thoughtful solution like intergenerational programs, tech training, community gardens, mentorship, etc.",
    category: "brainstorming",
    difficulty: "medium"
  },
  {
    question: "If it takes 6 people 6 minutes to eat 6 apples, how long does it take 3 people to eat 3 apples?",
    type: "multiple-choice",
    options: ["3 minutes", "6 minutes", "9 minutes", "12 minutes"],
    correctAnswer: "6 minutes",
    category: "logic",
    difficulty: "medium"
  },
  {
    question: "Create a solution to make homework more engaging for students.",
    type: "text",
    correctAnswer: "Any creative approach like gamification, real-world projects, collaborative work, choice-based learning, etc.",
    category: "brainstorming",
    difficulty: "medium"
  },
  {
    question: "What number comes next: 2, 3, 5, 7, 11, 13, ?",
    type: "multiple-choice",
    options: ["15", "17", "19", "21"],
    correctAnswer: "17",
    category: "logic",
    difficulty: "medium"
  },
  {
    question: "How would you redesign a park to make it more environmentally friendly and community-focused?",
    type: "text",
    correctAnswer: "Any eco-friendly ideas like native plants, rain gardens, community plots, renewable energy, wildlife habitats, etc.",
    category: "brainstorming",
    difficulty: "medium"
  },
  {
    question: "A train leaves New York at 3 PM traveling at 60 mph. Another train leaves Chicago at 4 PM traveling at 80 mph toward New York. If the cities are 800 miles apart, when will they meet?",
    type: "multiple-choice",
    options: ["8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"],
    correctAnswer: "9:00 PM",
    category: "logic",
    difficulty: "hard"
  },
  {
    question: "What's an innovative way to encourage people to recycle more?",
    type: "text",
    correctAnswer: "Any creative incentive like rewards programs, competitions, art projects, community challenges, education, etc.",
    category: "brainstorming",
    difficulty: "medium"
  },
  {
    question: "If you write down all numbers from 1 to 100, how many times will you write the digit 7?",
    type: "multiple-choice",
    options: ["10", "19", "20", "21"],
    correctAnswer: "20",
    category: "logic",
    difficulty: "hard"
  },
  {
    question: "Design a creative workspace that would boost productivity and happiness.",
    type: "text",
    correctAnswer: "Any innovative workspace idea like natural lighting, flexible spaces, plants, collaboration areas, relaxation zones, etc.",
    category: "brainstorming",
    difficulty: "medium"
  },
  {
    question: "A room has 4 corners. In each corner is a cat. In front of each cat are 3 cats. How many cats are in the room?",
    type: "multiple-choice",
    options: ["4", "12", "16", "It depends"],
    correctAnswer: "4",
    category: "logic",
    difficulty: "medium"
  },
  {
    question: "Invent a new game that could be played at a dinner party.",
    type: "text",
    correctAnswer: "Any creative game idea involving conversation, interaction, or entertainment suitable for dinner parties",
    category: "brainstorming",
    difficulty: "medium"
  },
  {
    question: "If you take away my first letter, I am a crime. If you take away my first two letters, I am an animal. If you take away my first and last letters, I am a form of music. What am I?",
    type: "text",
    correctAnswer: "Grape (Rape, Ape, Rap)",
    category: "logic",
    difficulty: "hard"
  },
  {
    question: "How would you make a boring commute more interesting and productive?",
    type: "text",
    correctAnswer: "Any creative ideas like audiobooks, podcasts, language learning, meditation, networking, games, etc.",
    category: "brainstorming",
    difficulty: "easy"
  },
  {
    question: "I am taken from a mine and shut up in a wooden case, from which I am never released, yet I am used by almost everyone. What am I?",
    type: "multiple-choice",
    options: ["Coal", "Diamond", "Pencil lead", "Gold"],
    correctAnswer: "Pencil lead",
    category: "logic",
    difficulty: "medium"
  },
  {
    question: "Design an ideal playground that would be fun for both children and adults.",
    type: "text",
    correctAnswer: "Any creative playground design with multi-generational activities, fitness equipment, social spaces, etc.",
    category: "brainstorming",
    difficulty: "medium"
  },
  {
    question: "What is always coming but never arrives?",
    type: "multiple-choice",
    options: ["Tomorrow", "The future", "Death", "Success"],
    correctAnswer: "Tomorrow",
    category: "logic",
    difficulty: "easy"
  },
  {
    question: "Create a new holiday and explain how people would celebrate it.",
    type: "text",
    correctAnswer: "Any creative holiday concept with meaningful purpose and celebration activities",
    category: "brainstorming",
    difficulty: "medium"
  },
  {
    question: "You see a boat filled with people. It has not sunk, but when you look again you don't see a single person on the boat. Why?",
    type: "text",
    correctAnswer: "All the people were married (not single)",
    category: "logic",
    difficulty: "medium"
  },
  {
    question: "How would you improve the experience of grocery shopping to make it more enjoyable?",
    type: "text",
    correctAnswer: "Any creative improvements like better organization, entertainment, social features, technology integration, etc.",
    category: "brainstorming",
    difficulty: "medium"
  },
  {
    question: "What occurs once in every minute, twice in every moment, yet never in a thousand years?",
    type: "multiple-choice",
    options: ["The letter M", "Time", "Opportunity", "Change"],
    correctAnswer: "The letter M",
    category: "logic",
    difficulty: "medium"
  },
  {
    question: "Invent a solution to help people remember where they parked their car.",
    type: "text",
    correctAnswer: "Any creative solution like photo reminders, location apps, visual markers, parking lot improvements, etc.",
    category: "brainstorming",
    difficulty: "easy"
  },
  {
    question: "Forward I am heavy, but backward I am not. What am I?",
    type: "multiple-choice",
    options: ["Ton/Not", "Heavy/Light", "Big/Small", "Full/Empty"],
    correctAnswer: "Ton/Not",
    category: "logic",
    difficulty: "medium"
  },
  {
    question: "Design a perfect study environment for maximum learning and retention.",
    type: "text",
    correctAnswer: "Any thoughtful study space design with lighting, organization, comfort, technology, and learning aids",
    category: "brainstorming",
    difficulty: "medium"
  }
];

// Export only multiple-choice questions
export const quizQuestionsData = allQuestions.filter(q => q.type === "multiple-choice");
