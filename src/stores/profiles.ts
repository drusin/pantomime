import { defineStore } from "pinia";
import {
  createNewProfile,
  deleteProfile,
  getAllProfiles,
  getProfile
} from "@/stores/indexedDbHandler.ts";

export const useProfileStore = defineStore('profiles', {
  actions: {
    async createProfile(profilePicture: string) {
      return await createNewProfile(profilePicture);
    },
    async getProfile(id: number) {
      return await getProfile(id);
    },
    async getAllProfiles() {
      return await getAllProfiles();
    },
    async deleteProfile(id: number) {
      await deleteProfile(id);
    }
  },
})
