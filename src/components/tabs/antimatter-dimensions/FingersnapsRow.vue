<script>
export default {
  name: "FingersnapsRow",
  data() {
    return {
      purchasedFingersnaps: 0,
      freeFingersnaps: 0,
      isVisible: false,
      mult: new Decimal(0),
      cost: new Decimal(0),
      isAffordable: false,
      fingersnaps: new Decimal(0),
      gameSpeedMult: 1,
      galaxyCount: 0,
      isContinuumActive: false,
      continuumValue: 0,
      hasTutorial: false,
      hasRealityButton: false,
      isEC9: false,
    };
  },
  computed: {
    classObject() {
      return {
        "l-fingersnaps-container": true,
        "l-fingersnaps-container--hidden": !this.isVisible
      };
    },
    multiplierDisplay() {
      if (InfinityChallenge(3).isRunning) return `Multiply all Hi Dimensions by
        ${formatX(1.05 + this.galaxyCount * 0.005, 3, 3)}`;
      const tickmult = this.mult;
      return `${formatX(tickmult.reciprocal(), 2, 3)} faster / upgrade.`;
    },
    fingersnapsDisplay() {
      return `Fingersnaps: ${format(this.fingersnaps, 2, 3)} / sec`;
    },
    continuumString() {
      return formatFloat(this.continuumValue, 2);
    },
    upgradeCount() {
      const purchased = this.purchasedFingersnaps;
      if (!this.freeFingersnaps) return quantifyInt("Purchased Upgrade", purchased);
      if (purchased === 0 || this.isContinuumActive) return `${formatInt(this.freeFingersnaps)} Free Upgrades`;
      return `${formatInt(purchased)} Purchased + ${formatInt(this.freeFingersnaps)} Free`;
    }
  },
  methods: {
    update() {
      this.hasRealityButton = PlayerProgress.realityUnlocked() || TimeStudy.reality.isBought;
      this.purchasedFingersnaps = player.totalTickBought;
      this.freeFingersnaps = FreeFingersnaps.amount;
      this.isEC9 = EternityChallenge(9).isRunning;
      this.isVisible = Fingersnaps.isUnlocked || this.isEC9;
      if (!this.isVisible) return;
      this.mult.copyFrom(Fingersnaps.multiplier);
      this.cost.copyFrom(Fingersnaps.cost);
      this.isAffordable = Fingersnaps.isAvailableForPurchase && Fingersnaps.isAffordable;
      this.fingersnaps.copyFrom(Fingersnaps.perSecond);
      this.gameSpeedMult = getGameSpeedupForDisplay();
      this.galaxyCount = player.galaxies;
      this.isContinuumActive = Laitela.continuumActive;
      if (this.isContinuumActive) this.continuumValue = Fingersnaps.continuumValue;
      this.hasTutorial = Tutorial.isActive(TUTORIAL_STATE.FINGERSNAPS);
    },
    buttonClass() {
      return {
        "o-primary-btn": true,
        "fingersnaps-btn": true,
        "o-primary-btn--disabled": !this.isAffordable && !this.isContinuumActive,
        "o-non-clickable o-continuum": this.isContinuumActive,
        "tutorial--glow": this.isAffordable && this.hasTutorial
      };
    },
  }
};
</script>

<template>
  <div :class="classObject">
    <div class="fingersnaps-buttons">
      <button
        v-tooltip="upgradeCount"
        :class="buttonClass()"
        onclick="buyFingerSnaps()"
      >
        <span v-if="isContinuumActive">
          Fingersnaps Continuum: {{ continuumString }}
        </span>
        <span v-else-if="isEC9">
          Fingersnaps Unpurchasable (EC 9)
        </span>
        <span v-else>
          Fingersnaps Cost: {{ format(cost) }}
        </span>
        <div
          v-if="hasTutorial"
          class="fas fa-circle-exclamation l-notification-icon"
        />
      </button>
      <button
        v-if="!isContinuumActive"
        class="o-primary-btn fingersnaps-max-btn"
        :class="{ 'o-primary-btn--disabled': !isAffordable && !isContinuumActive }"
        onclick="buyMaxFingerSnaps()"
      >
        Buy Max
      </button>
    </div>
    <div
      v-if="hasRealityButton"
      class="fingersnaps-labels"
    >
      {{ fingersnapsDisplay }} | {{ multiplierDisplay }}
    </div>
  </div>
</template>

<style scoped>
.o-primary-btn {
  position: relative;
  vertical-align: middle;
}

.fingersnaps-btn {
  position: relative;
  width: 30rem;
  height: 2.5rem;
  padding: 0.25rem;
}

.fingersnaps-labels {
  color: var(--color-text);
  padding: 0.25rem;
}

.l-fingersnaps-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 0.5rem;
}

.l-fingersnaps-container--hidden {
  visibility: hidden;
}

.fingersnaps-max-btn {
  margin-left: 0.5rem;
  width: 10rem;
  height: 2.5rem;
  padding: 0.25rem;
}

.o-non-clickable {
  cursor: auto;
}

.o-continuum {
  border-color: var(--color-laitela--accent);
  color: var(--color-laitela--accent);
  background: var(--color-laitela--base);
}

.o-continuum:hover {
  border-color: var(--color-laitela--accent);
  color: var(--color-laitela--base);
  background: var(--color-laitela--accent);
}
</style>
