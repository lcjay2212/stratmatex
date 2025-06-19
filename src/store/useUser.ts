import { create } from "zustand";

interface UserDetails {
  token: string;
  refresh_token: string;
  email: string;
  username: string;
  reg_step2_completed: boolean | null;
  reg_step3_completed: boolean | null;
  roles: Array<string>;
  is_verified: boolean | null;
  ios_show_crypto: boolean | null;
  android_show_crypto: boolean | null;
  referral_code: null;
  "2fa_registration_verified": boolean | null;
  profile_id: string;
  profile_picture: string;
  has_store: boolean | null;
  stream_auth_key: string;
  merchant: boolean | null;
  advertiser: boolean | null;
  content_creator: boolean | null;
  purchaser: boolean | null;
  corporate: boolean | null;
  qux_merchant_plus: boolean | null;
  affiliate: boolean | null;
  app_developer: boolean | null;
  advertiser_has_company: boolean | null;
  incomplete_registration: null;
  purchaser_info: null;
  registration_completed: boolean | null;
  user_public_key: string;
  user_private_key: string;
  firstname: string;
  lastname: string;
}

type Props = {
  user: UserDetails | null;
  setUser: (e: Partial<UserDetails> | null) => void;
};

export const useUser = create<Props>((set) => ({
  user: null,
  setUser: (newUserData: Partial<UserDetails> | null): void =>
    set((state) => ({
      user:
        newUserData === null
          ? null
          : state.user
          ? ({ ...state.user, ...newUserData } as UserDetails)
          : (newUserData as UserDetails),
    })),
}));
