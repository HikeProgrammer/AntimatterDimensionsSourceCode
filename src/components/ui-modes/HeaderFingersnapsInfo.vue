<script>
import GameSpeedDisplay from "@/components/GameSpeedDisplay";

export default {
  name: "HeaderFingersnapsInfo",
  components: {
    GameSpeedDisplay
  },
  data() {
    return {
      mult: new Decimal(0),
      fingersnaps: new Decimal(0),
      galaxyCount: 0,
      purchasedFingersnaps: 0,
      freeFingersnaps: 0,
    };
  },
  computed: {
    fingersnapsDisplay() {
      return `Total Fingersnaps: ${format(this.fingersnaps, 2, 3)} / sec`;
    },
    perUpgrade() {
      if (InfinityChallenge(3).isRunning) return `Fingersnaps upgrades give
        ${formatX(1.05 + this.galaxyCount * 0.005, 3, 3)} to all dimsensions`;
      return `Dimensions produce ${formatX(this.mult.reciprocal(), 2, 3)} faster per Fingersnaps upgrade`;
    },
  },
  methods: {
    update() {
      this.mult.copyFrom(Fingersnaps.multiplier);
      this.fingersnaps.copyFrom(Fingersnaps.perSecond);
      this.galaxyCount = player.galaxies;
      this.purchasedFingersnaps = player.totalTickBought;
      this.freeFingersnaps = FreeFingersnaps.amount;
    },
  },
};
</script>

<template>
  <div>
    <br>
    {{ perUpgrade }}
    <br>
    {{ fingersnapsDisplay }}
    <br>
    <GameSpeedDisplay />
  </div>
</template>

<style scoped>

</style>
