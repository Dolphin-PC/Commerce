export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cart: {
        Row: {
          createdAt: string
          id: number
          productId: number
          userId: number
        }
        Insert: {
          createdAt?: string
          id?: number
          productId: number
          userId: number
        }
        Update: {
          createdAt?: string
          id?: number
          productId?: number
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: "cart_productId_fkey"
            columns: ["productId"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      category: {
        Row: {
          categoryName: string
          id: number
        }
        Insert: {
          categoryName: string
          id?: never
        }
        Update: {
          categoryName?: string
          id?: never
        }
        Relationships: []
      }
      coupon: {
        Row: {
          couponkey: string
          createdat: string
          expiredat: string
          id: number
          userid: number | null
          useyn: boolean | null
        }
        Insert: {
          couponkey: string
          createdat?: string
          expiredat?: string
          id?: never
          userid?: number | null
          useyn?: boolean | null
        }
        Update: {
          couponkey?: string
          createdat?: string
          expiredat?: string
          id?: never
          userid?: number | null
          useyn?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "coupon_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      order: {
        Row: {
          createdAt: string
          id: number
          status: string
          userId: number
        }
        Insert: {
          createdAt?: string
          id?: number
          status: string
          userId: number
        }
        Update: {
          createdAt?: string
          id?: number
          status?: string
          userId?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_userId_fkey"
            columns: ["userId"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      order_detail: {
        Row: {
          id: number
          orderId: number | null
          productId: number | null
        }
        Insert: {
          id?: number
          orderId?: number | null
          productId?: number | null
        }
        Update: {
          id?: number
          orderId?: number | null
          productId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "order_detail_orderId_fkey"
            columns: ["orderId"]
            isOneToOne: false
            referencedRelation: "order"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_detail_productId_fkey"
            columns: ["productId"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      pay_history: {
        Row: {
          "created\bAt": string
          id: number
          orderId: number
          payAmount: number
          payMethod: string
        }
        Insert: {
          "created\bAt"?: string
          id?: number
          orderId: number
          payAmount: number
          payMethod: string
        }
        Update: {
          "created\bAt"?: string
          id?: number
          orderId?: number
          payAmount?: number
          payMethod?: string
        }
        Relationships: [
          {
            foreignKeyName: "pay_history_orderId_fkey"
            columns: ["orderId"]
            isOneToOne: true
            referencedRelation: "order"
            referencedColumns: ["id"]
          },
        ]
      }
      product: {
        Row: {
          categoryId: number
          createdAt: string
          desc: string
          discountType: Database["public"]["Enums"]["DISCOUNT_TYPE"] | null
          discountValue: number | null
          id: number
          isDelete: boolean
          name: string
          price: number
          quantity: number
          sellerId: number
          updatedAt: string
        }
        Insert: {
          categoryId: number
          createdAt?: string
          desc: string
          discountType?: Database["public"]["Enums"]["DISCOUNT_TYPE"] | null
          discountValue?: number | null
          id?: number
          isDelete?: boolean
          name: string
          price: number
          quantity: number
          sellerId: number
          updatedAt?: string
        }
        Update: {
          categoryId?: number
          createdAt?: string
          desc?: string
          discountType?: Database["public"]["Enums"]["DISCOUNT_TYPE"] | null
          discountValue?: number | null
          id?: number
          isDelete?: boolean
          name?: string
          price?: number
          quantity?: number
          sellerId?: number
          updatedAt?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_categoryId_fkey"
            columns: ["categoryId"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_sellerId_fkey"
            columns: ["sellerId"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      product_image: {
        Row: {
          id: number
          imgUrl: string
          productId: number
        }
        Insert: {
          id?: number
          imgUrl: string
          productId: number
        }
        Update: {
          id?: number
          imgUrl?: string
          productId?: number
        }
        Relationships: [
          {
            foreignKeyName: "product_image_productId_fkey"
            columns: ["productId"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
        ]
      }
      refund_history: {
        Row: {
          "created\bAt": string
          id: number
          payHistoryId: number
        }
        Insert: {
          "created\bAt"?: string
          id?: number
          payHistoryId: number
        }
        Update: {
          "created\bAt"?: string
          id?: number
          payHistoryId?: number
        }
        Relationships: [
          {
            foreignKeyName: "refund_history_payHistoryId_fkey"
            columns: ["payHistoryId"]
            isOneToOne: true
            referencedRelation: "pay_history"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          createdat: string
          deletedat: string | null
          email: string
          id: number
          isseller: boolean | null
          nickname: string | null
          updatedat: string
        }
        Insert: {
          createdat?: string
          deletedat?: string | null
          email: string
          id?: number
          isseller?: boolean | null
          nickname?: string | null
          updatedat?: string
        }
        Update: {
          createdat?: string
          deletedat?: string | null
          email?: string
          id?: number
          isseller?: boolean | null
          nickname?: string | null
          updatedat?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      DISCOUNT_TYPE: "PERCENT" | "COST"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
