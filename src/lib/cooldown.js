export function canCallNow(status, secondsLeft) {
  return status === "idle" || status === "error" || secondsLeft <= 0;
}

export function shouldExitCooldown(status, secondsLeft) {
  return status === "sent" && secondsLeft <= 0;
}
