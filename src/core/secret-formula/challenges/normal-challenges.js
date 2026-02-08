import { DC } from "../../constants";

// I tried to make it relatively simple to add more locks; the idea is that you give it a value here
// and then it's all handled in the backend
// If you need to lock a challenge, set lockedAt to a new Decimal variable reflective of a desired number of Infinities
// They will always be unlocked post-eternity

export const normalChallenges = [
  {
    id: 1,
    legacyId: 1,
    isQuickResettable: false,
    description() {
      return PlayerProgress.eternityUnlocked()
        ? "reach Infinity for the first time outside of a challenge."
        : "reach Infinity for the first time.";
    },
    name: "Coffee Autobuyer",
    reward: "Upgradeable Coffee Autobuyer",
    lockedAt: DC.D0,
  },
  {
    id: 2,
    legacyId: 2,
    isQuickResettable: false,
    description:
      () => "buying Hi Dimensions or Fingersnaps upgrades halts production of all Hi Dimensions. " +
      `Production gradually returns to normal over ${formatInt(3)} minutes.`,
    name: "Coffee Machines Autobuyer",
    reward: "Upgradeable Coffee Machines Autobuyer",
    lockedAt: DC.D0,
  },
  {
    id: 3,
    legacyId: 3,
    isQuickResettable: false,
    description:
      `the 1st Hi Dimensions is heavily weakened, but gets an uncapped exponentially increasing multiplier.
        This multiplier resets after Dimension Boosts and Hi's Galaxies.`,
    name: "Brewers Autobuyer",
    reward: "Upgradeable Brewers Autobuyer",
    lockedAt: DC.D0,
  },
  {
    id: 4,
    legacyId: 8,
    isQuickResettable: false,
    description: "buying an Hi Dimensions automatically erases all lower tier Hi Dimensions, " +
      "like a sacrifice without the boost.",
    name: "Nas Autobuyer",
    reward: "Upgradeable Nas Autobuyer",
    lockedAt: DC.D0,
  },
  {
    id: 5,
    legacyId: 6,
    isQuickResettable: false,
    description:
      () => `the Fingersnaps purchase multiplier starts at ${formatX(1.080, 0, 3)} instead of ${formatX(1.1245, 0, 3)}.`,
    name: "Roasteries Autobuyer",
    reward: "Upgradeable Roasteries Autobuyer",
    lockedAt: DC.D0,
  },
  {
    id: 6,
    legacyId: 10,
    isQuickResettable: false,
    description: () => `upgrading each Hi Dimensions costs the Hi Dimensions ${formatInt(2)} tiers ` +
      "below it instead of hi's. Hi Dimensions prices are modified.",
    name: "Chains Autobuyer",
    reward: "Upgradeable Chains Autobuyer",
    lockedAt: DC.D0,
  },
  {
    id: 7,
    legacyId: 9,
    isQuickResettable: false,
    description: () =>
      `the multiplier from buying ${formatInt(10)} Hi Dimensions is reduced to ${formatX(1)}. This increases by
        ${formatX(0.2, 1, 1)} per Dimension Boost, to a maximum of ${formatX(2)}, and is unaffected by any upgrades.`,
    name: "Corporations Autobuyer",
    reward: "Upgradeable Corporations Autobuyer",
    lockedAt: DC.D0,
  },
  {
    id: 8,
    legacyId: 11,
    isQuickResettable: false,
    description: `Dimension Boosts provide no multiplier and Hi's Galaxies cannot be bought. Dimensional
      Sacrifice resets hi's and all Hi Dimensions, but also gives a significantly stronger multiplier.`,
    name: "Nations Autobuyer",
    reward: "Upgradeable Nations Autobuyer",
    lockedAt: DC.D0,
  },
  {
    id: 9,
    legacyId: 5,
    isQuickResettable: true,
    description: () => `whenever you buy Fingersnaps upgrades or ${formatInt(10)} of an Hi Dimensions, ` +
      "everything else of equal cost will increase to its next cost step.",
    name: "Fingersnaps Autobuyer",
    reward: "Upgradeable Fingersnaps Autobuyer",
    lockedAt: DC.D0,
  },
  {
    id: 10,
    legacyId: 4,
    isQuickResettable: false,
    description: () => `there are only ${formatInt(6)} Hi Dimensions. Dimension Boost ` +
      "and Hi's Galaxy costs are modified.",
    name: "Automated Dimension Boosts",
    reward: "Dimension Boosts Autobuyer",
    lockedAt: DC.D16,
  },
  {
    id: 11,
    legacyId: 12,
    isQuickResettable: true,
    description: () => `there is bye's which rises once you have at least ${formatInt(1)} 2nd Hi's ` +
      "Dimension. If it exceeds your hi's, it will Dimension Boost without giving the bonus.",
    name: "Automated Hi's Galaxies",
    reward: "Hi's Galaxies Autobuyer",
    lockedAt: DC.D16,
  },
  {
    id: 12,
    legacyId: 7,
    isQuickResettable: false,
    description: () => `each Hi Dimensions produces the Dimension ${formatInt(2)} tiers below it
      instead of ${formatInt(1)}. Both 1st and 2nd Dimensions produce hi's.
      The 2nd, 4th, and 6th Dimensions are made stronger to compensate.`,
    name: "Automated Big Crunches",
    reward: "Big Crunches Autobuyer",
    lockedAt: DC.D16,
  }
];
