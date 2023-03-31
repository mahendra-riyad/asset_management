export const LOGIN = "users/login";
export const SIGNUP = "users/register";

export const ADD_ASSET = "asset";
export const GET_ASSET_LIST = "asset/listing";
export const GET_ASSET_DETAIL = (assetId: string) =>  `asset/${assetId}`;
export const DELETE_ASSET = (assetId: string) =>  `asset/${assetId}`;