// All site copy lives here so it can be edited without touching layout code.

export const contact = {
  discord: "lukeyyc",
  email: "lukey@lukec.dev",
};

export type System = {
  id: string; // YouTube video id
  title: string;
  tags: string[];
  summary: string;
};

export const heroClipId = "mbixNk3FfYI"; // Grappling showcase

export const systems: System[] = [
  {
    id: "mbixNk3FfYI",
    title: "AOT-style grappling",
    tags: ["Movement", "Physics", "Animation"],
    summary:
      "Full directional control mid-swing: W to rise, S to drop, A and D to steer, with flying animations that sell the speed.",
  },
  {
    id: "5Beu_BJKFU8",
    title: "Custom character controller",
    tags: ["Movement", "Physics"],
    summary:
      "Humanoid-free movement on a custom rig using ControllerManager and custom physics. Built to be extended, not rewritten.",
  },
  {
    id: "h_s0AI0Lpvw",
    title: "Wall climbing",
    tags: ["Movement"],
    summary:
      "8-directional climbing with floor and ledge detection, ledge climb-ups, wall-to-wall jumps and jump-offs aimed by the camera.",
  },
  {
    id: "DwT5H_8QP7w",
    title: "M1 combat and air combos",
    tags: ["Combat"],
    summary:
      "A 5-hit M1 combo, air combos, blocking and weapons, built as the base for a battlegrounds-style game.",
  },
  {
    id: "kecYc7lpH_w",
    title: "Wall hops",
    tags: ["Movement", "Physics"],
    summary:
      "Platformer-style wall hopping with physics values that are easy to tune per map.",
  },
  {
    id: "lT3IK_Ocy1Q",
    title: "Inventory",
    tags: ["Systems", "UI"],
    summary:
      "Drag items between slots, equip and unequip them, and drop them into the world.",
  },
  {
    id: "LfMPQ54kd6I",
    title: "Simulator mechanics",
    tags: ["Systems"],
    summary:
      "Mechanics built and refined for Screws and Cogs Simulator, a live simulator game.",
  },
  {
    id: "ezNAIVwkDsk",
    title: "Hope Factor menu",
    tags: ["UI"],
    summary:
      "The main menu for Hope Factor, the game built around the grappling system.",
  },
];

export const process = [
  {
    title: "Scope",
    body: "Send me the idea, any reference clips and your deadline. I break it into features and quote a price in USD or Robux.",
  },
  {
    title: "Prototype",
    body: "You get a rough, playable version of the core mechanic early, so we can judge how it feels before anything gets polished.",
  },
  {
    title: "Build and polish",
    body: "The full system with tuned physics, animations hooked up and edge cases handled. I send progress clips as it comes together.",
  },
  {
    title: "Hand-off",
    body: "Clean, commented code dropped into your place, with notes on which values to tweak and where they live.",
  },
];

export const strengths = [
  "Backend scripting",
  "Physics scripting",
  "UI and frontend scripting",
];

export const record = [
  {
    name: "80,000+ players",
    detail: "Total players on a project I scripted for, with every development goal met.",
  },
  {
    name: "Blackhole Treasure Incremental",
    detail: "A live Roblox game I've worked on.",
    href: "https://www.roblox.com/games/70607966869797/Blackhole-Treasure-Incremental",
    linkLabel: "Play on Roblox",
  },
  {
    name: "SkillsUSA",
    detail:
      "State champion in Web Design and Development, then 6th at nationals. My Business in IT team won state too.",
  },
  {
    name: "CompTIA A+",
    detail: "Certified, plus certifications in web development, Linux and security.",
  },
  {
    name: "IT background",
    detail: "Before Roblox I worked in IT for a restaurant group.",
  },
];
