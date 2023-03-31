import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { environment } from '../../environments/environment';
import { v4 as uuid } from 'uuid';

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {
    bucket: S3;
    constructor(
    ) {
        this.bucket = new S3(
            {
                accessKeyId: environment.config.AWS_ACCESS_KEY,
                secretAccessKey: environment.config.AWS_SECRET_KEY,
                region: environment.config.AWS_REGION,
            }
        );
    }

    async uploadFile(fileToUpload: File, loader = true) {
        try {

            // give some unique filename
            const expression = /(?:\.([^.]+))?$/;
            const extension = expression.exec(fileToUpload?.name)?.[1] || 'png'; 
            const timestamp = String(Math.floor(Date.now()));
            const uniqueFilename = `${uuid()}_${timestamp}.${extension}`;

            const params = {
                Bucket: environment.config.AWS_BUCKET,
                Key: uniqueFilename,
                Body: fileToUpload,
                ACL: 'public-read'
            };
            return new Promise((resolve, reject) => {
                this.bucket.upload(params, function (err: any, data:any) {
                    if (err) {
                        reject(err);
                        return false;
                    } 

                    resolve(data);
                    return true;
                }).on('httpUploadProgress', (progress) => {
                });

            });
        } catch (err) {
            console.log('erororoor',err)
        }
    }
    
    async uploadMultipleFiles(files: any[]) {
        try {
            let data = [];
            for (let i = 0; i < files.length; i++) {
                data.push(this.uploadFile(files[i], false));
            }
            let result = await Promise.all(data);
            return Promise.resolve(result);
        } catch (err) {
            return Promise.reject(err);
        }
    }
}
