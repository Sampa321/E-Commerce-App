import ImageKit from "@imagekit/nodejs";

let imagekit;

export default function getImageKit() {
    if (!imagekit) {
        if (!process.env.IMAGEKIT_PRIVATE_KEY) {
            throw new Error("IMAGEKIT_PRIVATE_KEY is required for image uploads");
        }

        imagekit = new ImageKit({ privateKey: process.env.IMAGEKIT_PRIVATE_KEY });
    }

    return imagekit;
}
