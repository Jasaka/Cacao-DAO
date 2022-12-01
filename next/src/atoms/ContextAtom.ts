import { atom } from "recoil"
import { recoilPersist } from "recoil-persist"

const { persistAtom } = recoilPersist()

export const contextState = atom({
  key: "contextState",
  default: {
    loggedIn: false,
    token: "",
    userId: ""
  },
  effects_UNSTABLE: [persistAtom]
})