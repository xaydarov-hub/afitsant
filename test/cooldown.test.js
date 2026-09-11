import test from 'node:test';
import assert from 'node:assert/strict';
import { canCallNow, shouldExitCooldown } from '../src/lib/cooldown.js';

test('cooldown blocks calls while seconds remain', () => {
  assert.equal(canCallNow('sent', 10), false);
});

test('button re-enables once the countdown reaches zero', () => {
  assert.equal(canCallNow('sent', 0), true);
  assert.equal(canCallNow('error', 0), true);
});

test('status should reset to idle when cooldown expires', () => {
  assert.equal(shouldExitCooldown('sent', 0), true);
  assert.equal(shouldExitCooldown('sent', 5), false);
});
