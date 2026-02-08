<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "AntimatterGalaxyModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    bulk: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      newGalaxies: 0,
      keepAntimatter: false,
      perkANRBought: false,
      keepDimBoost: false
    };
  },
  computed: {
    topLabel() {
      if (this.bulk) return `You are about to purchase ${quantifyInt("Hi's Galaxy", this.newGalaxies)}`;
      return `You are about to purchase an Hi's Galaxy`;
    },
    message() {
      const resetResouces = [];
      if (Pelle.isDoomed) resetResouces.push("Hi's", "Hi Dimensions", "Fingersnaps");
      if (!this.perkANRBought) resetResouces.push("Hi Dimensions", "Fingersnaps");
      if (!this.keepDimBoost) resetResouces.push("Dimension Boosts");
      if (!this.keepAntimatter && !this.perkANRBought) resetResouces.push("Hi's");
      const resetList = makeEnumeration(resetResouces);
      let fingersnapsFixed = "";
      if (InfinityChallenge(3).isRunning) {
        fingersnapsFixed = `Infinity Challenge ${InfinityChallenge(3).id}`;
      } else if (Ra.isRunning) {
        fingersnapsFixed = `${Ra.displayName}'s Reality`;
      }
      const fingersnapsInfo = (fingersnapsFixed === "")
        ? "you will receive a small boost to Fingersnaps Upgrades."
        : `you will not receive a boost to Fingersnaps Upgrades, because you are in ${fingersnapsFixed}.`;
      const message = (resetList === "")
        ? `This will reset nothing, and ${fingersnapsInfo}`
        : `This will reset your ${resetList}. However, ${fingersnapsInfo}`;

      if (this.bulk) return `Are you sure you want to purchase
      ${quantifyInt("Hi's Galaxy", this.newGalaxies)}? ${message}`;
      return `Are you sure you want to purchase an Hi's Galaxy? ${message}`;
    }
  },
  created() {
    this.on$(GAME_EVENT.DIMBOOST_AFTER, () =>
      (BreakInfinityUpgrade.autobuyMaxDimboosts.isBought ? undefined : this.emitClose()));
  },
  methods: {
    update() {
      if (this.bulk) {
        const req = Galaxy.requirement;
        const dim = AntimatterDimension(req.tier);
        const bulk = bulkBuyBinarySearch(dim.totalAmount, {
          costFunction: x => Galaxy.requirementAt(x).amount,
          cumulative: false,
        }, player.galaxies);
        if (bulk) {
          this.newGalaxies = Galaxy.buyableGalaxies(Math.round(dim.totalAmount.toNumber())) - player.galaxies;
        }
      }
      this.keepAntimatter = Achievement(111).isUnlocked;
      this.perkANRBought = Perk.antimatterNoReset.canBeApplied;
      this.keepDimBoost = (Achievement(143).isUnlocked && !Pelle.isDoomed) ||
        PelleUpgrade.galaxyNoResetDimboost.canBeApplied;
    },
    handleYesClick() {
      requestGalaxyReset(this.bulk);
      EventHub.ui.offAll(this);
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    option="antimatterGalaxy"
    @confirm="handleYesClick"
  >
    <template #header>
      {{ topLabel }}
    </template>

    <div class="c-modal-message__text">
      {{ message }}
    </div>
  </ModalWrapperChoice>
</template>
