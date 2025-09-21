// import { createClient } from "@/utils/supabase/client";
// import { type User } from "@/store/organizationStore";

// interface PresenceChannel {
//   channel: any;
//   track: () => Promise<void>;
//   untrack: () => Promise<void>;
// }

// export const createPresenceChannel = (
//   organizationId: string,
//   user: User,
//   onPresenceUpdate: (onlineUsers: Record<string, User>) => void,
// ): PresenceChannel => {
//   const supabase = createClient();

//   // Canal de présence pour l'organisation
//   const presenceChannel = supabase.channel(`org:${organizationId}`, {
//     config: {
//       presence: {
//         key: user.id,
//       },
//     },
//   });

//   // Gérer la présence
//   presenceChannel.on("presence", { event: "sync" }, () => {
//     const presenceState = presenceChannel.presenceState();
//     const newOnlineUsers: Record<string, User> = {};

//     // Transformer l'état de présence en objet d'utilisateurs
//     Object.keys(presenceState).forEach((presenceId) => {
//       const userPresences = presenceState[presenceId];
//       userPresences.forEach((presence: any) => {
//         newOnlineUsers[presence.user.id] = {
//           ...presence.user,
//           online_at: presence.online_at,
//         };
//       });
//     });

//     onPresenceUpdate(newOnlineUsers);
//   });

//   return {
//     channel: presenceChannel,
//     track: async () => {
//       await presenceChannel.track({
//         user: {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//           role: user.role,
//           status: user.status,
//           avatar_url: user.avatar_url,
//         },
//         online_at: new Date().toISOString(),
//       });
//     },
//     untrack: async () => {
//       await presenceChannel.untrack();
//     },
//   };
// };

// export const subscribeToPresence = async (
//   presenceChannel: PresenceChannel,
//   onSubscribe: () => void,
// ) => {
//   const subscription = await presenceChannel.channel.subscribe(
//     async (status: string) => {
//       if (status === "SUBSCRIBED") {
//         await presenceChannel.track();
//         onSubscribe();
//       }
//     },
//   );

//   return () => {
//     presenceChannel.untrack();
//     subscription.unsubscribe();
//   };
// };
