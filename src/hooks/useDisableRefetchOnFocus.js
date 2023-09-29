import { focusManager } from "@tanstack/react-query";
import { useEffect } from "react";

export function useDisableRefetchOnFocus() {
  useEffect(() => {
    focusManager.setFocused(false);
    return () => focusManager.setFocused(undefined);
  }, []);
}
