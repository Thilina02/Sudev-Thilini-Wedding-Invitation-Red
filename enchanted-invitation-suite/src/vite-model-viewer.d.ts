import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
      src?: string;
      alt?: string;
      ar?: boolean;
      "camera-controls"?: boolean;
      "auto-rotate"?: boolean;
      "touch-action"?: string;
      "shadow-intensity"?: string;
      "environment-image"?: string;
    };
  }
}
