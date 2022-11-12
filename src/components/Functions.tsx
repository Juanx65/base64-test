import { File } from "@ionic-native/file";
import { FileOpener } from "@ionic-native/file-opener";
import { isPlatform } from "@ionic/react";

export function convertBase64ToBlob(b64Data: any, contentType: any): Blob {
    contentType = contentType || '';
    const sliceSize = 512;
    b64Data = b64Data.replace(/^[^,]+,/, '');
    b64Data = b64Data.replace(/\s/g, '');
    const byteCharacters = window.atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
}

export function saveAndOpenPdf(pdf: any, filename: any) {
    const writeDirectory = isPlatform('ios') ? File.dataDirectory : File.externalDataDirectory;
    File.writeFile(writeDirectory, filename, convertBase64ToBlob(pdf, 'application/pdf;base64'), { replace: true })
        .then(() => {
            FileOpener.open(writeDirectory + filename, 'application/pdf')
                .catch(() => {
                    console.log('Error opening pdf file');
                });
        })
        .catch(() => {
            console.error('Error writing pdf file');
        });
}