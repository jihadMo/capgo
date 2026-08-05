/**
 * Nostr Taker Bounty Acceptance Handler
 * Handles taker acceptance events (kind 30078 / NIP-78 custom app data)
 * linking a taker's pubkey to a bounty ID with proof of acceptance.
 */

export interface BountyAcceptanceParams {
  bountyId: string;
  takerPubkey: string;
  creatorPubkey: string;
  acceptedAt: number;
}

export interface NostrAcceptanceEvent {
  kind: number;
  created_at: number;
  tags: string[][];
  content: string;
  pubkey: string;
}

export function createBountyAcceptanceEvent(params: BountyAcceptanceParams): NostrAcceptanceEvent {
  return {
    kind: 30078,
    created_at: params.acceptedAt || Math.floor(Date.now() / 1000),
    tags: [
      ['d', `satcode:acceptance:${params.bountyId}`],
      ['e', params.bountyId],
      ['p', params.creatorPubkey],
      ['t', 'bounty-acceptance'],
    ],
    content: JSON.stringify({
      status: 'ACCEPTED',
      bountyId: params.bountyId,
      takerPubkey: params.takerPubkey,
    }),
    pubkey: params.takerPubkey,
  };
}

export function validateBountyAcceptanceEvent(event: NostrAcceptanceEvent, expectedBountyId: string): boolean {
  if (!event || event.kind !== 30078) return false;
  const bountyTag = event.tags.find(t => t[0] === 'e');
  if (!bountyTag || bountyTag[1] !== expectedBountyId) return false;
  
  try {
    const payload = JSON.parse(event.content);
    return payload.status === 'ACCEPTED' && payload.bountyId === expectedBountyId;
  } catch {
    return false;
  }
}
