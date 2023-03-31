import { MAX_IMAGE_SIZE, IMAGE_FORMAT } from "./app-constant";

const readFile = (file: File) => {

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (imgsrc: any) => {
            resolve({ file: file, url: imgsrc.target.result, type: file.name.substr(file.name.lastIndexOf('.') + 1) })
        };
    })
}

export const onSelectFile = async (event: any, accept = IMAGE_FORMAT, maxSize = MAX_IMAGE_SIZE): Promise<any[]> => {

    if (event?.target?.files && event.target.files.length) {
        for (let file of event.target.files) {
            if (accept && accept.split(',').indexOf(file.type) === -1) {
                return Promise.reject({ type: 1 });
            }
            if (maxSize && maxSize < ((file.size / 1024) / 1024)) {
                return Promise.reject({ size: 1 });
            }
        }
        let files = [];
        for (let i = 0; i < event.target.files.length; i++) {
            files.push(readFile(event.target.files[i]));
        }
        return Promise.all(files);
    }

    return [];
}
