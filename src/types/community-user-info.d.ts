type CommunityUserInfoType = {
  description: string;
  level: number;
  nextLevelExp: number;
  currentExp: number;
  point: number;
  isBanned: boolean;
  permission: number;
  banExpiresAt?: string;
  defaultBadge: {
    id: number;
    title: string;
    description: string;
    img: string;
    isDefault: boolean;
  };
};
