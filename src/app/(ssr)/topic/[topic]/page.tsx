import { UnsplashImage } from "@/shared/interfaces/unsplash.interface";
import Image from "next/image";
import styles from "./TopicPage.module.css";
import { Alert } from "react-bootstrap";

// To prevent caching of pages at all
// export const revalidate = 0;

// Means that no dynamic params are allowed, only Static Params provided during build time are allowed to be used/searched.
// export const dynamicParams = false; 

type Props = {
    params: { topic: string };
    // searchParams: { [key: string]: string | string[] | undefined };
};

export function generateMetadata({params:{topic}}:Props) {
    return {
        title: `${topic} - NextJS 13.4 Image Gallery`
    }
}

export function generateStaticParams() {
    return ["health", "coding", "fitness"].map((topic) => ({topic}));
}

export default async function Page({ params: { topic } }: Props) {
    const response = await fetch(
        `https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );
    const images: UnsplashImage[] = await response.json();

    return (
        <div>
            <Alert>
                This page uses <strong>generateStaticParams</strong> to render and cache static pages at build time, even though the URL has a dynamic param. Pages not included in the generateStaticParams will be fetched and rendered at runtime <strong>(cached for subsequent requests).</strong>
                <br/>Even the non-static params pages can be disabled if needed using <strong>dynamicParams=false.</strong> 
            </Alert>
            <h1>Topic: {topic}</h1>
            {images.map((image, i) => (
                <Image
                    key={i}
                    height={250}
                    width={250}
                    src={image.urls.raw}
                    alt={image.description}
                    className={styles.image}
                />
            ))}
        </div>
    );
}
