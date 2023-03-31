export const IMAGE_FORMAT = "image/jpeg,image/png,image/jpg";
export const MAX_IMAGE_SIZE = 10;
export const IMAGE_FORMAT_ERROR = "Uploaded image format is not supported. Supported formats are jpeg,png,jpg";
export const MAX_SIZE_ERROR = (size = MAX_IMAGE_SIZE) => `Upload image size is greater than ${size}mb.`;
