<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "BreakInfinityModal",
  components: {
    ModalWrapperChoice
  },
  computed: {
    message() {
      const infinity = formatPostBreak(Number.MAX_VALUE, 2);
      return `Breaking Infinity will allow you to gain hi's past ${infinity}${PlayerProgress.eternityUnlocked()
        ? "." : `, and allow you to read numbers past ${infinity}.`}
        Dimensions and Fingersnaps Upgrades will scale in cost faster after ${infinity} hi's.
        You will gain additional Infinity Points on Big Crunch based on hi's produced over ${infinity}.\
        ${EternityMilestone.keepAutobuyers.isReached ? "" : `\nIt will also unlock Break Infinity Upgrades and max\
        all Normal Challenge Autobuyers.`}`.split("\n");
    },
  },
  methods: {
    handleYesClick() {
      breakInfinity();
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    :show-cancel="false"
    @confirm="handleYesClick"
  >
    <template #header>
      You are Breaking Infinity
    </template>
    <div class="c-modal-message__text">
      <span
        v-for="(line, index) in message"
        :key="index"
      >
        {{ line }} <br>
      </span>
    </div>
    <template #confirm-text>
      Break
    </template>
  </ModalWrapperChoice>
</template>
