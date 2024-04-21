import React from "react";
import copy from "copy-text-to-clipboard";
import { Bounce, toast } from "react-toastify";

interface Props {
  link: string;
  children: React.ReactNode;
}

function Copy({ link, children }: Props) {
  const handleCopyLink = async () => {
    //await navigator.clipboard.writeText(link);
    copy(link);
    const copiedText = await navigator.clipboard.readText();
    if (link === copiedText) {
      toast.info("Copied to clipboard", {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  return <button onClick={handleCopyLink}>{children}</button>;
}

export default Copy;
