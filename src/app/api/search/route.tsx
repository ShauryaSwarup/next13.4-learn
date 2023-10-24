import { UnsplashSearchResult } from "@/shared/interfaces/unsplash.interface";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    if (!query) {
        return NextResponse.json({
            error:"Missing query",
            status: 400,
        });
    }
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`);
    const {results}:UnsplashSearchResult= await response.json();
    return NextResponse.json(results);
}
