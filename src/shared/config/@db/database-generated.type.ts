export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      cart: {
        Row: {
          createdAt: string;
          id: number;
          productId: number;
          quantity: number;
          userId: string;
        };
        Insert: {
          createdAt?: string;
          id?: number;
          productId: number;
          quantity: number;
          userId: string;
        };
        Update: {
          createdAt?: string;
          id?: number;
          productId?: number;
          quantity?: number;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "cart_productId_fkey";
            columns: ["productId"];
            isOneToOne: false;
            referencedRelation: "product";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "cart_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          }
        ];
      };
      category: {
        Row: {
          categoryName: string;
          id: number;
        };
        Insert: {
          categoryName: string;
          id?: never;
        };
        Update: {
          categoryName?: string;
          id?: never;
        };
        Relationships: [];
      };
      coupon: {
        Row: {
          couponkey: string;
          createdat: string;
          expiredat: string;
          id: number;
          userid: string;
          useyn: boolean | null;
        };
        Insert: {
          couponkey: string;
          createdat?: string;
          expiredat?: string;
          id?: number;
          userid: string;
          useyn?: boolean | null;
        };
        Update: {
          couponkey?: string;
          createdat?: string;
          expiredat?: string;
          id?: number;
          userid?: string;
          useyn?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: "coupon_userid_fkey";
            columns: ["userid"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          }
        ];
      };
      order: {
        Row: {
          createdAt: string;
          id: number;
          orderName: string | null;
          shipAddress: string | null;
          status: Database["public"]["Enums"]["ORDER_STATUS"];
          userId: string;
        };
        Insert: {
          createdAt?: string;
          id?: number;
          orderName?: string | null;
          shipAddress?: string | null;
          status: Database["public"]["Enums"]["ORDER_STATUS"];
          userId: string;
        };
        Update: {
          createdAt?: string;
          id?: number;
          orderName?: string | null;
          shipAddress?: string | null;
          status?: Database["public"]["Enums"]["ORDER_STATUS"];
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "order_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          }
        ];
      };
      order_detail: {
        Row: {
          id: number;
          orderId: number;
          productId: number;
          quantity: number;
        };
        Insert: {
          id?: number;
          orderId: number;
          productId: number;
          quantity?: number;
        };
        Update: {
          id?: number;
          orderId?: number;
          productId?: number;
          quantity?: number;
        };
        Relationships: [
          {
            foreignKeyName: "order_detail_orderId_fkey";
            columns: ["orderId"];
            isOneToOne: false;
            referencedRelation: "order";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "order_detail_productId_fkey";
            columns: ["productId"];
            isOneToOne: false;
            referencedRelation: "product";
            referencedColumns: ["id"];
          }
        ];
      };
      pay_history: {
        Row: {
          createdAt: string;
          id: number;
          orderId: number;
          payAmount: number | null;
          paymentId: string;
        };
        Insert: {
          createdAt?: string;
          id?: number;
          orderId: number;
          payAmount?: number | null;
          paymentId?: string;
        };
        Update: {
          createdAt?: string;
          id?: number;
          orderId?: number;
          payAmount?: number | null;
          paymentId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "pay_history_orderId_fkey";
            columns: ["orderId"];
            isOneToOne: true;
            referencedRelation: "order";
            referencedColumns: ["id"];
          }
        ];
      };
      product: {
        Row: {
          categoryId: number;
          createdAt: string;
          desc: string;
          discountType: Database["public"]["Enums"]["DISCOUNT_TYPE"] | null;
          discountValue: number | null;
          id: number;
          isDelete: boolean;
          name: string;
          price: number;
          quantity: number;
          sellerId: string | null;
          updatedAt: string;
        };
        Insert: {
          categoryId: number;
          createdAt?: string;
          desc: string;
          discountType?: Database["public"]["Enums"]["DISCOUNT_TYPE"] | null;
          discountValue?: number | null;
          id?: number;
          isDelete?: boolean;
          name: string;
          price: number;
          quantity: number;
          sellerId?: string | null;
          updatedAt?: string;
        };
        Update: {
          categoryId?: number;
          createdAt?: string;
          desc?: string;
          discountType?: Database["public"]["Enums"]["DISCOUNT_TYPE"] | null;
          discountValue?: number | null;
          id?: number;
          isDelete?: boolean;
          name?: string;
          price?: number;
          quantity?: number;
          sellerId?: string | null;
          updatedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "product_categoryId_fkey";
            columns: ["categoryId"];
            isOneToOne: false;
            referencedRelation: "category";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "product_sellerId_fkey";
            columns: ["sellerId"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["id"];
          }
        ];
      };
      product_image: {
        Row: {
          id: number;
          imgUrl: string;
          productId: number;
          thumnailUrl: string;
        };
        Insert: {
          id?: number;
          imgUrl: string;
          productId: number;
          thumnailUrl: string;
        };
        Update: {
          id?: number;
          imgUrl?: string;
          productId?: number;
          thumnailUrl?: string;
        };
        Relationships: [
          {
            foreignKeyName: "product_image_productId_fkey";
            columns: ["productId"];
            isOneToOne: false;
            referencedRelation: "product";
            referencedColumns: ["id"];
          }
        ];
      };
      refund_history: {
        Row: {
          "created\bAt": string;
          id: number;
          payHistoryId: number;
        };
        Insert: {
          "created\bAt"?: string;
          id?: number;
          payHistoryId: number;
        };
        Update: {
          "created\bAt"?: string;
          id?: number;
          payHistoryId?: number;
        };
        Relationships: [
          {
            foreignKeyName: "refund_history_payHistoryId_fkey";
            columns: ["payHistoryId"];
            isOneToOne: true;
            referencedRelation: "pay_history";
            referencedColumns: ["id"];
          }
        ];
      };
      user: {
        Row: {
          createdat: string;
          deletedat: string | null;
          email: string | null;
          id: string;
          isseller: boolean | null;
          nickname: string | null;
          updatedat: string;
        };
        Insert: {
          createdat?: string;
          deletedat?: string | null;
          email?: string | null;
          id?: string;
          isseller?: boolean | null;
          nickname?: string | null;
          updatedat?: string;
        };
        Update: {
          createdat?: string;
          deletedat?: string | null;
          email?: string | null;
          id?: string;
          isseller?: boolean | null;
          nickname?: string | null;
          updatedat?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      CHANNEL_TYPE: "TOSS";
      DISCOUNT_TYPE: "PERCENT" | "COST" | "NONE";
      ORDER_STATUS: "PAY_BEFORE" | "PAY_COMPLETE" | "PAY_COMPLETE_CONFIRM" | "PAY_CANCEL" | "SELLER_CONFIRM" | "SHIPPING" | "SHIP_COMPLETE" | "REFUND_REQUEST" | "REFUND_COMPLETE";
      PAY_METHOD: "CARD";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"]) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] & Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] & Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] & PublicSchema["Views"])
  ? (PublicSchema["Tables"] & PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database } ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"] : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema["Tables"] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database } ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"] : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema["Enums"] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database } ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"] : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
