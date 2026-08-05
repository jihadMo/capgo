import { createBountyAcceptanceEvent, validateBountyAcceptanceEvent } from './acceptance';

describe('Nostr Taker Bounty Acceptance', () => {
  const params = {
    bountyId: 'bounty_12345',
    takerPubkey: 'pubkey_taker_999',
    creatorPubkey: 'pubkey_creator_888',
    acceptedAt: 1770000000,
  };

  it('creates valid Nostr NIP-78 event for taker acceptance', () => {
    const event = createBountyAcceptanceEvent(params);
    expect(event.kind).toBe(30078);
    expect(event.pubkey).toBe('pubkey_taker_999');
    expect(validateBountyAcceptanceEvent(event, 'bounty_12345')).toBe(true);
  });

  it('rejects event with mismatched bounty ID', () => {
    const event = createBountyAcceptanceEvent(params);
    expect(validateBountyAcceptanceEvent(event, 'bounty_other')).toBe(false);
  });
});
