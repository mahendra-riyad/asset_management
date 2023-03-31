import { IRoute } from "../models/route.interface";

export const ACCOUNT: IRoute = {
  path: "account",
  get fullUrl(): string {
    return `/${this.path}`;
  },
};

export const LOGIN: IRoute = {
  path: "login",
  get fullUrl(): string {
    return `${ACCOUNT.fullUrl}/${this.path}`;
  },
};

export const SIGNUP: IRoute = {
  path: "signup",
  get fullUrl(): string {
    return `${ACCOUNT.fullUrl}/${this.path}`;
  },
};

export const FEATURES: IRoute = {
  path: "",
  get fullUrl(): string {
    return `${this.path}`;
  },
};

export const DASHBOARD: IRoute = {
  path: "dashboard",
  get fullUrl(): string {
    return `${FEATURES.fullUrl}/${this.path}`;
  },
};