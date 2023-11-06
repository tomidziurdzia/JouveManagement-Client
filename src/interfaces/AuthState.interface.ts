import { BusinessInterface } from "./Business.interface";

export interface AuthState {
  status: "checking" | "not-authenticated" | "authenticated";
  business: BusinessInterface | null;
  errorMessage: Error | undefined;
}
