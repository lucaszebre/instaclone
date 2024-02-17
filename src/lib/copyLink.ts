export const copyCurrentURL = (path:string) => {
    // Check if window is defined (so this code can run in a Next.js environment)
    if (typeof window !== "undefined") {
      // Get the current URL
      const currentURL = window.location.href;
  
      // Copy the URL to the clipboard
      navigator.clipboard.writeText(`localhost:3000/${path}`)
        .then(() => {
          console.log("URL copied to clipboard successfully!");
        })
        .catch(err => {
          console.error("Failed to copy URL: ", err);
        });
    }
  };