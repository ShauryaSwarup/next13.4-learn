import { User } from "@/shared/interfaces/user.interface";
import { notFound } from "next/navigation";
import { cache } from "react";
import { Alert } from "@/components/bootstrap";

type Props = {
    params: {
        username: string;
    };
};

async function getUser(username: string): Promise<User> {
    const response = await fetch(
        `https://api.unsplash.com/users/${username}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    );
    if (response.status === 404) notFound();    

    return await response.json();
}

const getUserCached = cache(getUser); //Required only if native fetch function not used.

export async function generateMetadata({ params: { username } }: Props) {
    const user = await getUserCached(username);
    return {
        title: `${user.first_name} ${user.last_name}`,
    };
}

export default async function Page({ params: { username } }: Props) {
    const user = await getUserCached(username); //Won't fetch twice, NextJS handles this
    return (
        <div>
            <Alert>
                <strong>generateMetadata function</strong>
                <p>
                    This page uses the generateMetadata function to set the
                    title of the page.
                </p>                
            </Alert>
            <h1>{user.username}</h1>
            <h2>
                {user.first_name} {user.last_name}
            </h2>
        </div>
    );
}
