import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import path from "path";

// Configuración de Multer

////////////////////////// MULTER FOR PROFILE IMAGES
const storageImg = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../img"));
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);;
    },
});

const fileFilterImg = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/gif" ||
        file.mimetype === "application/pdf"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
export const uploadImg = multer({ storage: storageImg, fileFilter: fileFilterImg });


////////////////////////// MULTER FOR IMAGES IN PUBLICATIONS
const storagePostImg = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../postImage"));
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);;
    },
});

const fileFilterPostImg = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/gif" ||
        file.mimetype === "application/pdf"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
export const uploadPostImg = multer({ storage: storagePostImg, fileFilter: fileFilterPostImg });

////////////////////////// MULTER FOR DOCUMENTS
const storageDocuments = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../documents"));
    },

    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }

});

const fileFilterDocuments = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (
        file.mimetype === "application/pdf" ||
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, true);
    }
}
export const uploadDocuments = multer({ storage: storageDocuments, fileFilter: fileFilterDocuments });


// const storageDynamic = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const folder = req.body.type === "post" ? "postImage" : "img";
//     cb(null, path.join(__dirname, `../../${folder}`));
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName);
//   },
// });

// const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
//     if (
//         file.mimetype === "image/jpeg" ||
//         file.mimetype === "image/png" ||
//         file.mimetype === "image/gif" ||
//         file.mimetype === "application/pdf"
//     ) {
//         cb(null, true);
//     } else {
//         cb(null, false);
//     }
// }
// export const upload = multer({ storage: storageDynamic, fileFilter });
