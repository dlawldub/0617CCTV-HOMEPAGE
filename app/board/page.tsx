"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase, isSupabaseConfigured, type Post } from "@/lib/supabase";
import PostForm from "@/components/PostForm";
import styles from "./board.module.css";

const CATEGORY_CLASS: Record<Post["category"], string> = {
  공지: "badge-info",
  점검: "badge-muted",
  장애: "badge-alert",
  일반: "badge-green",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${p(d.getMonth() + 1)}.${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

export default function BoardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setError("Supabase 환경변수가 설정되지 않았습니다. .env.local 의 NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY 를 확인하세요.");
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data, error: dbError } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (dbError) setError(dbError.message);
    else setPosts((data as Post[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);

  return (
    <main className="section">
      <div className="page-shell">
        <span className="section-label">BOARD · 유지보수 게시판</span>
        <h1 className="section-title">유지보수 정보 공유 게시판</h1>
        <p className="section-desc">
          방범CCTV 점검·장애·공지 정보를 등록하고 공유합니다. 작성한 게시글은
          Supabase 데이터베이스에 저장됩니다.
        </p>

        <div className={styles.layout}>
          <PostForm onSuccess={fetchPosts} />

          <section className={styles.listCol}>
            <div className={styles.listHead}>
              <h2 className={styles.listTitle}>게시글</h2>
              <span className={styles.listCount}>{loading ? "…" : `${posts.length}건`}</span>
            </div>

            {error ? (
              <div className={styles.error}>{error}</div>
            ) : loading ? (
              <div className={styles.empty}>불러오는 중…</div>
            ) : posts.length === 0 ? (
              <div className={styles.empty}>
                아직 등록된 게시글이 없습니다. 첫 게시글을 작성해 보세요.
              </div>
            ) : (
              <ul className={styles.list}>
                {posts.map((p) => (
                  <li key={p.id} className={`card ${styles.item}`}>
                    <div className={styles.itemHead}>
                      <span className={`badge ${CATEGORY_CLASS[p.category]}`}>
                        {p.category}
                      </span>
                      <h3 className={styles.itemTitle}>{p.title}</h3>
                    </div>
                    <p className={styles.itemContent}>{p.content}</p>
                    <div className={styles.itemMeta}>
                      <span className={styles.author}>{p.author}</span>
                      {p.dong && <span className={styles.dong}>{p.dong}</span>}
                      <span className={`${styles.date} mono`}>
                        {formatDate(p.created_at)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
