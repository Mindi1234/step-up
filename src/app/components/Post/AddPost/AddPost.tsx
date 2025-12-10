"use client";

import { useState } from "react";
import { uploadImageToCloudinary } from "@/services/server/cloudinaryService";
import { useUserStore } from "@/app/store/useUserStore";
import { useModalPostStore } from "@/app/store/usePostModelStore"
import { addPost } from "@/services/client/postService";
import PostMedia from "../PostMedia/PostMedia";
import styles from "./AddPost.module.css";
import { usePostStore } from "@/app/store/usePostStore";

interface AddPostProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

export default function AddPost({ onClose }: AddPostProps) {
  const isPostModalOpen = useModalPostStore((state) => state.isPostModalOpen);
  const closePostModal = useModalPostStore((state) => state.closePostModal);
  const user = useUserStore((state) => state.user);

  const [content, setContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const setHasMore = usePostStore((s) => s.setHasMore);


  if (!isPostModalOpen) return null;

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    setError(null);
    setIsLoading(true);
    try {
      const aiResponse = await fetch("/api/agent/posts/filter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          hasMedia: files.length > 0,
        }),
      });

      const aiData = await aiResponse.json();

      if (!aiData.allowed) {
        // setError(aiData.reason || "This post is not suitable for StepUp.");
        setError("This post is not suitable for StepUp.");
        setIsLoading(false);
        return;
      }
      if (aiData.rewrite) {
        setAiSuggestion(aiData.rewrite);
        setIsLoading(false);
        return;
      }
      const mediaUrls = await Promise.all(
        files.map(async (file) => {
          if (file.size > 20 * 1024 * 1024)
            throw new Error(`File ${file.name} too big.`);
          const url = await uploadImageToCloudinary(file);
          return {
            url,
            type: file.type.startsWith("video") ? "video" : "image",
          };
        })
      );

      await addPost({
        userId: user.id,
        content: aiData.rewrite || content,
        media: mediaUrls,
      });

      setContent("");
      setHasMore(true);
      setFiles([]);
      (onClose || closePostModal)();
    } catch (err) {
      console.error(err);
      setError((err as Error).message || "Error adding post");
    } finally {
      setIsLoading(false);
    }
  };

  // return (

  //   <div className={styles.addPostModal}>
  //     <form onSubmit={handleSubmit} className={styles.addPostForm}>
  //       <button
  //         type="button"
  //         className={styles.closeButton}
  //         onClick={onClose || closePostModal}
  //       >
  //         ×
  //       </button>

  //       {error && <p className={styles.errorMessage}>❌ {error}</p>}

  //       <textarea
  //         placeholder="Add comment..."
  //         value={content}
  //         onChange={(e) => setContent(e.target.value)}
  //         className={styles.contentTextArea}
  //         disabled={isLoading}
  //       />

  //       <div className={styles.actionsContainer}>
  //         <label htmlFor="file-upload" className={styles.fileInputLabel}>
  //           <span className={styles.fileInputIcon}>🖼️</span>
  //           Add image/video
  //         </label>
  //         <input
  //           id="file-upload"
  //           type="file"
  //           multiple
  //           accept="image/*,video/*"
  //           onChange={handleFiles}
  //           className={styles.fileInput}
  //           disabled={isLoading}
  //         />
  //         <PostMedia files={files} />
  //       </div>

  //       <button
  //         type="submit"
  //         className={styles.submitButton}
  //         disabled={isLoading || (content.trim() === "" && files.length === 0)}
  //       >
  //         {isLoading ? "Uploading..." : "Upload Post"}
  //       </button>
  //     </form>
  //   </div>
  // );
  return (
    <div className={styles.addPostModal}>

      {/* --- כאן ממקמים את ה-AI suggestion --- */}
      {aiSuggestion && (
        <div className={styles.aiSuggestionBox}>
          <h4>✨ Improved wording that the AI ​​offers:</h4>
          <p>{aiSuggestion}</p>

          <button
            className={styles.useSuggestionButton}
            onClick={() => {
              setContent(aiSuggestion);
              setAiSuggestion(null);
            }}
          >
            Use this wording
          </button>

          <button
            className={styles.rejectSuggestionButton}
            onClick={() => setAiSuggestion(null)}
          >
            Leave with the original wording.
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.addPostForm}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose || closePostModal}
        >
          ×
        </button>

        {error && <p className={styles.errorMessage}>❌ {error}</p>}

        <textarea
          placeholder="Add comment..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.contentTextArea}
          disabled={isLoading}
        />

        <div className={styles.actionsContainer}>
          <label htmlFor="file-upload" className={styles.fileInputLabel}>
            <span className={styles.fileInputIcon}>🖼️</span>
            Add image/video
          </label>
          <input
            id="file-upload"
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={handleFiles}
            className={styles.fileInput}
            disabled={isLoading}
          />
          <PostMedia files={files} />
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isLoading || (content.trim() === "" && files.length === 0)}
        >
          {isLoading ? "Uploading..." : "Upload Post"}
        </button>
      </form>
    </div>
  );

}