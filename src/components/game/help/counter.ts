let hasShownDeathVision = false;

export function shouldShowDeathVision(): boolean {
  return !hasShownDeathVision;
}

export function markDeathVisionAsShown() {
  hasShownDeathVision = true;
}
