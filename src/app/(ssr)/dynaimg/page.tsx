import { UnsplashImage } from "@/shared/interfaces/unsplash.interface";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Alert } from "react-bootstrap";

export const metadata : Metadata = {
    title: "Dynamic Image - NextJS 13.4",
};

// export const revalidate = 0;

export default async function Page() {
    const response = await fetch(
        `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    ,{
        cache: "no-cache",
        // next: {
        //     revalidate: 0
        // }
    });
    const data: UnsplashImage = await response.json();
    const width = Math.min(500, data.width);
    const height = (width / data.width) * data.height;

    return (
        <div className='d-flex flex-column align-items-center'>
            <Alert>
                This page <strong>fetches data dynamically.</strong> Every time you refresh the page, you get a new image from the Unsplash API.
            </Alert>
            <Image
                src={data.urls.raw}
                height={height}
                width={width}
                alt={data.description}
                className="rounded shadow mw-100 mh-100"
            />
            by <Link className="text-primary" href={`/user/${data.user.username}`}>{data.user.username}</Link>
        </div>
    )
}