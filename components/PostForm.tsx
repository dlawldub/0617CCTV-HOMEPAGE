"use client";

import { useState } from "react";
import { supabase, POST_CATEGORIES, type Post } from "@/lib/supabase";
import { dongStats } from "@/lib/data";
import styles from "./PostForm.module.css";

export default function PostForm({ onSuccess }: { onSuccess?: () => void }) {
  const [category, setCategory] = useState<Post["category"]>("일반");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [dong, setDong] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(
    null
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (!title.trim() || !content.trim()) {
      setMessage({ type: "err", text: "제목과 내용을 입력해 주세요." });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("posts").insert({
      category,
      title: title.trim(),
      content: content.trim(),
      author: author.trim() || "익명",
      dong: dong || null,
    });
    setSubmitting(false);

    if (error) {
      setMessage({ type: "err", text: `저장 실패: ${error.message}` });
      return;
    }

    setMessage({ type: "ok", text: "게시글이 저장되었습니다." });
    setTitle("");
    setContent("");
    setDong("");
    setCategory("일반");
    onSuccess?.();
  }

  return (
    <form className={`card ${styles.form}`} onSubmit={handleSubmit}>
      <h2 className={styles.title}>게시글 작성</h2>

      <label className={styles.label}>
        분류
        <div className={styles.cats}>
          {POST_CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              className={`${styles.cat} ${category === c ? styles.catActive : ""}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </label>

      <label className={styles.label}>
        제목
        <input
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력하세요"
          maxLength={200}
        />
      </label>

      <div className={styles.row}>
        <label className={styles.label}>
          작성자
          <input
            className={styles.input}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="작성자 (미입력 시 익명)"
            maxLength={50}
          />
        </label>
        <label className={styles.label}>
          관련 행정동
          <select
            className={styles.input}
            value={dong}
            onChange={(e) => setDong(e.target.value)}
          >
            <option value="">선택 안 함</option>
            {dongStats.map((d) => (
              <option key={d.dong} value={d.dong}>
                {d.dong}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className={styles.label}>
        내용
        <textarea
          className={styles.textarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요"
          rows={6}
          maxLength={5000}
        />
      </label>

      {message && (
        <p className={message.type === "ok" ? styles.ok : styles.err}>
          {message.text}
        </p>
      )}

      <button className="btn-primary" type="submit" disabled={submitting}>
        {submitting ? "저장 중…" : "게시글 등록"}
      </button>
    </form>
  );
}
