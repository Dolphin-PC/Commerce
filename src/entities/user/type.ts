export type User = {
  Row: {
    id: number;
    email: string;
    nickname: string | null;
    isseller: boolean | null;
    createdat: string;
    deletedat: string;
    updatedat: string;
  };
  Insert: {
    email: string;
    nickname: string;
  };
  Update: {
    createdat?: string;
    deletedat?: string;
    email?: string;
    id?: never;
    isseller?: boolean;
    nickname?: string;
    updatedat?: string;
  };
  Relationships: [];
};
