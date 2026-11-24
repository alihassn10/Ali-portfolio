// Master switch for the 3D avatar. While false, the site loads no three.js,
// no model and no poster image, and the layout re-centres without it.
// Flip back to true to bring the avatar back.
export const AVATAR_ENABLED = true;

// Whether to render the live 3D avatar. Falls back to the static poster when
// WebGL is missing or the visitor prefers reduced motion.
function detect() {
  if (typeof window === "undefined") return false;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export const USE_3D = AVATAR_ENABLED && detect();
