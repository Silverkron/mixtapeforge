import { t as translate } from "./i18n";
import { createContext, useContext } from "react";
import type { useStudioController } from "./useStudioController";
export const StudioContext = createContext<ReturnType<
  typeof useStudioController
> | null>(null);
export function useStudio() {
  const context = useContext(StudioContext);
  if (!context) throw new Error(translate("Studio provider missing"));
  return context;
}
