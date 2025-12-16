"use client";

import { useState } from "react";
import { updatePost } from "@/services/client/postService";
import { usePostStore } from "@/app/store/usePostStore";
import { IPost } from "@/interfaces/IPost";
import styles from "./EditPostModal.module.css";

interface EditPostModalProps {
  post: IPost;
  onClose: () => void;
}

interface MediaItem {
  url: string;
  type: "image" | "video";
}

export default function EditPostModal({ post, onClose }: EditPostModalProps) {
  const updatePostStore = usePostStore((s) => s.updatePost);

  const [text, setText] = useState<string>(post.content);
  const [media, setMedia] = useState<MediaItem[]>(post.media || []);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const removeMedia = (index: number) => {
    setMedia((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setNewFiles((prev) => [...prev, ...files]);
  };

  const handleSave = async () => {
    setLoading(true);

    const uploadedMedia: MediaItem[] = [];

    newFiles.forEach((file) => {
      uploadedMedia.push({
        url: URL.createObjectURL(file), 
        type: file.type.includes("video") ? "video" : "image",
      });
    });

    const formattedMedia = [...media, ...uploadedMedia];

    const res = await updatePost(String(post._id), {
      content: text,
      media: formattedMedia,
    });

    updatePostStore(String(post._id), res.post);

    setLoading(false);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>

        <div className={styles.header}>
          <h3>Edit Post</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.mediaSection}>

          {media.map((m, i) => (
            <div key={i} className={styles.mediaItem}>
              {m.type === "image" && <img src={m.url} alt="" />}
              {m.type === "video" && <video src={m.url} controls />}
              <button
                className={styles.removeMedia}
                onClick={() => removeMedia(i)}
              >
                ×
              </button>
            </div>
          ))}

          {newFiles.map((file, i) => (
            <div key={i} className={styles.mediaItem}>
              <img src={URL.createObjectURL(file)} alt="" />
              <span className={styles.newTag}>NEW</span>
            </div>
          ))}

        </div>

        <label className={styles.uploadBtn}>
          Add Media
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleFileUpload}
          />
        </label>

        <textarea
          className={styles.textarea}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          className={styles.saveBtn}
          disabled={loading || text.trim() === ""}
          onClick={handleSave}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

      </div>
    </div>
  );
}
