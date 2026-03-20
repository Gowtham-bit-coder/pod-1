export type RootStackParamList = {
  splash: undefined;
  login: undefined;
  register: undefined;
  "google-success": {
    token: string;
    profile_completed?: boolean;
  };
  profile: {
    token: string;
  };
};

export type AuthStackParamList = {
  splash: undefined;
  login: undefined;
  register: undefined;
  "google-success": {
    token: string;
    profile_completed?: boolean;
  };
  profile: {
    token: string;
  };
};

export type TabsStackParamList = {
  index: undefined;
  explore: undefined;
};
