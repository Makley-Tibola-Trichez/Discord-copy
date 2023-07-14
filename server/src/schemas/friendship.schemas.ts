import { z } from 'zod';

export const inviteNewFriendBodySchema = z.object({
  inviteUserID: z.string().uuid(),
});

export const blockFriendBodySchema = z.object({
  friendshipID: z.string().uuid(),
});

export const declineInviteBodySchema = blockFriendBodySchema;
export const unblockFriendBodySchema = blockFriendBodySchema;
export const acceptInviteBodySchema = blockFriendBodySchema;
export const undoFriendshipSchema = blockFriendBodySchema;
