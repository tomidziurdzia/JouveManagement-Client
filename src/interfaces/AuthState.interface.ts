import { BusinessInterface, ErrorInterface } from "./";

export interface AuthState {
  status: "checking" | "not-authenticated" | "authenticated";
  business: BusinessInterface | null;
  errorMessage: ErrorInterface | undefined;
}
