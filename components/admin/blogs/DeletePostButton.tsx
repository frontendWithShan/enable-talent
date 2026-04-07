"use client";

import { useState } from "react";

import ConfirmDeleteModal from "./ConfirmDeleteModal";

type DeletePostButtonProps = {
  action: (formData: FormData) => void | Promise<void>;
  className: string;
  postId: string;
  postTitle: string;
  redirectTo: string;
};

export default function DeletePostButton({
  action,
  className,
  postId,
  postTitle,
  redirectTo,
}: DeletePostButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [pending, setPending] = useState(false);

  return (
    <>
      <button
        className={className}
        onClick={() => setShowConfirm(true)}
        type="button"
      >
        Delete
      </button>

      {showConfirm ? (
        <ConfirmDeleteModal
          onCancel={() => setShowConfirm(false)}
          onConfirm={async () => {
            setPending(true);
            const formData = new FormData();
            formData.set("intent", "delete");
            formData.set("postId", postId);
            formData.set("redirectTo", redirectTo);
            try {
              await action(formData);
            } finally {
              setPending(false);
              setShowConfirm(false);
            }
          }}
          pending={pending}
          postTitle={postTitle}
        />
      ) : null}
    </>
  );
}
