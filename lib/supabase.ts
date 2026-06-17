import { createClient } from "@supabase/supabase-js";

/**
 * Supabase 클라이언트.
 * publishable(anon) 키만 사용하므로 서버·브라우저 양쪽에서 안전하게 사용 가능.
 * 행 단위 접근 제어는 데이터베이스의 RLS 정책으로 처리됩니다.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase = createClient(url ?? "", anonKey ?? "", {
  auth: { persistSession: false },
});

/** 게시글 타입 */
export interface Post {
  id: number;
  category: "공지" | "점검" | "장애" | "일반";
  title: string;
  content: string;
  author: string;
  dong: string | null;
  created_at: string;
}

export const POST_CATEGORIES = ["공지", "점검", "장애", "일반"] as const;
