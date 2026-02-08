import { DC } from "../constants";

import { UpgradeableAutobuyerState } from "./autobuyer";

export class FingersnapsAutobuyerState extends UpgradeableAutobuyerState {
  get data() {
    return player.auto.fingersnaps;
  }

  get name() {
    return `Fingersnaps`;
  }

  get isUnlocked() {
    if (Pelle.isDisabled("fingersnapsAutobuyer")) return false;
    return this.canBeUpgraded;
  }

  get canBeUpgraded() {
    return NormalChallenge(9).isCompleted;
  }

  get baseInterval() {
    return Player.defaultStart.auto.fingersnaps.interval;
  }

  get isBought() {
    return this.data.isBought;
  }

  get antimatterCost() {
    return DC.E140;
  }

  get canBeBought() {
    return !Pelle.isDoomed;
  }

  get disabledByContinuum() {
    return Laitela.continuumActive;
  }

  get mode() {
    return this.data.mode;
  }

  set mode(value) {
    this.data.mode = value;
  }

  get hasUnlimitedBulk() {
    return this.mode === AUTOBUYER_MODE.BUY_MAX;
  }

  get canUnlockSlowVersion() {
    return player.records.thisEternity.maxAM.gte(this.antimatterCost);
  }

  toggleMode() {
    this.mode = [
      AUTOBUYER_MODE.BUY_SINGLE,
      AUTOBUYER_MODE.BUY_MAX
    ]
      .nextSibling(this.mode);
  }

  get canTick() {
    return Fingersnaps.isAvailableForPurchase && Fingersnaps.isAffordable && super.canTick;
  }

  tick() {
    super.tick();
    switch (this.mode) {
      case AUTOBUYER_MODE.BUY_SINGLE:
        buyFingerSnaps();
        break;
      case AUTOBUYER_MODE.BUY_MAX:
        buyMaxFingerSnaps();
        break;
    }
  }

  purchase() {
    if (!this.canUnlockSlowVersion) return;
    this.data.isBought = true;
  }

  get resetTickOn() {
    return Perk.antimatterNoReset.canBeApplied ? PRESTIGE_EVENT.ANTIMATTER_GALAXY : PRESTIGE_EVENT.DIMENSION_BOOST;
  }

  reset() {
    super.reset();
    if (EternityMilestone.keepAutobuyers.isReached || PelleUpgrade.keepAutobuyers.canBeApplied) return;
    this.data.mode = AUTOBUYER_MODE.BUY_SINGLE;
    this.data.isUnlocked = false;
    this.data.isBought = false;
    TabNotification.newAutobuyer.clearTrigger();
  }
}
