// All site copy lives here so it can be edited without touching layout code.

export const contact = {
  discord: "lukeyyc",
  email: "lukey@lukec.dev",
};

// A system's clip is either a YouTube video or a self-hosted file in public/videos.
// Self-hosted clips need a poster frame in public/videos/posters.
export type SystemMedia =
  | { kind: "youtube"; id: string }
  | { kind: "file"; src: string; poster: string };

export type System = {
  title: string;
  tags: string[];
  summary: string;
  media: SystemMedia;
};

const file = (name: string): SystemMedia => ({
  kind: "file",
  src: `/videos/${name}.mp4`,
  poster: `/videos/posters/${name}.jpg`,
});
const youtube = (id: string): SystemMedia => ({ kind: "youtube", id });

// Hero background clip: short, fast and recorded full screen, so it loops cleanly.
export const heroVideo = {
  src: "/videos/vaulting-and-swinging-hero.mp4", // silent, lighter encode of the card clip
  poster: "/videos/posters/vaulting-and-swinging.jpg",
};

// Shown in two staggered columns: even entries on the left, odd on the right.
export const systems: System[] = [
  {
    title: "AOT-style grappling",
    tags: ["Movement", "Physics", "Animation"],
    summary:
      "Full directional control mid-swing: W to rise, S to drop, A and D to steer, with flying animations that sell the speed.",
    media: youtube("mbixNk3FfYI"),
  },
  {
    title: "M1 combat and air combos",
    tags: ["Combat", "Physics"],
    summary:
      "A 5-hit katana M1 combo with hit effects, knockback and ragdolls, plus air combos that launch a target and follow it up. Shown against practice dummies, including ones that block.",
    media: file("m1-combat-and-air-combos"),
  },
  {
    title: "Vaulting and bar swinging",
    tags: ["Movement", "Animation"],
    summary:
      "Fast parkour through an obstacle course: vault over ledges and walls without losing speed, and swing around bars to launch into the next section.",
    media: file("vaulting-and-swinging"),
  },
  {
    title: "Wall climbing and wall hops",
    tags: ["Movement", "Physics"],
    summary:
      "8-directional climbing that holds onto walls at any angle, with ledge climb-ups and camera-aimed jump-offs, plus platformer-style wall hops between narrow walls.",
    media: file("wall-climb-and-wall-hop"),
  },
  {
    title: "Workers, shop and placement",
    tags: ["Tycoon", "Systems", "UI"],
    summary:
      "The core loop of Factory Freaks, a factory tycoon: hire workers from the Worker Depot, place them and their stations on your plot, and collect the skateboard parts they produce as cash. Production runs on the server, with live output per minute.",
    media: file("workers-shop-and-placement"),
  },
  {
    title: "Incremental mechanics",
    tags: ["Simulator", "Systems", "UI"],
    summary:
      "Progression for Screws and Cogs Simulator: gain screws to level up, spend them on boosts with Buy One, Next and Max, then push into masteries as the numbers climb into huge abbreviated values.",
    media: file("incremental-mechanics"),
  },
  {
    title: "Custom character controller",
    tags: ["Movement", "Physics"],
    summary:
      "Humanoid-free movement on a custom rig using ControllerManager and custom physics. Built to be extended, not rewritten.",
    media: youtube("5Beu_BJKFU8"),
  },
  {
    title: "Muscle growth and boxing bag",
    tags: ["Simulator", "Systems", "Data"],
    summary:
      "From a boxing simulator: bench press to build strength and watch the character bulk up with it, then train on a punching bag. Progress saves between sessions with ProfileService.",
    media: file("muscle-growth-and-boxing-bag"),
  },
  {
    title: "Invaders-style framework",
    tags: ["Arcade", "OOP"],
    summary:
      "Ro-Invaders, an arcade shooter built as an object-oriented framework: player and enemy ships extend one shared spaceship class, and a game manager runs each round.",
    media: file("invaders-style-framework"),
  },
  {
    title: "Inventory",
    tags: ["Systems", "UI"],
    summary:
      "Drag items between slots, equip and unequip them, and drop them into the world.",
    media: youtube("lT3IK_Ocy1Q"),
  },
  {
    title: "Hope Factor menu",
    tags: ["UI"],
    summary:
      "The main menu for Hope Factor, the game built around the grappling system.",
    media: youtube("ezNAIVwkDsk"),
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

// An entry can link out with href + linkLabel (e.g. a Roblox game page).
export const record: { name: string; detail: string; href?: string; linkLabel?: string }[] = [
  {
    name: "2.2M+ players",
    detail: "Total players on a project I scripted for, with every development goal met.",
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
