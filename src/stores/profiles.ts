import { defineStore } from "pinia";
import { createNewProfile, getAllProfiles, getProfile } from "@/stores/indexedDbHandler.ts";

export const useProfileStore = defineStore('profiles', {
  actions: {
    async createProfile(profilePicture: string) {
      return await createNewProfile(profilePicture);
    },
    async getProfilePicture(id: number) {
      return await getProfile(id);
    },
    async getAllProfiles() {
      return await getAllProfiles();
    },
  },
})
