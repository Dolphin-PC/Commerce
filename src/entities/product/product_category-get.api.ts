import { QueryData } from "@supabase/supabase-js";
import { supabase } from "../@db/supabase.config";


const productCategoryQuery = supabase.from("product").select("*, category(*)").maybeSingle();
export type ProductCategory = QueryData<typeof productCategoryQuery>