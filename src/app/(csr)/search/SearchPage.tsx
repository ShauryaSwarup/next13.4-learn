"use client";

import { UnsplashImage } from "@/shared/interfaces/unsplash.interface";
import Image from "next/image";
import { useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import styles from "./SearchPage.module.css";

export default function SearchPage() {
    const [results, setResults] = useState<UnsplashImage[] | null>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<boolean>(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const query = formData.get("query") as string;
        if (query) {
            setResults(null);
            setLoading(true);
            setError(false);
            try {
                const response = await fetch(`/api/search?query=${query}`);
                const results: UnsplashImage[] = await response.json();
                setResults(results);
            } catch (error) {
                console.log(error);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className='mb-3' controlId='search-input'>
                    <Form.Label>Search</Form.Label>
                    <Form.Control
                        name='query'
                        type='text'
                        placeholder='Eg. cats, dogs, etc.'
                    />
                </Form.Group>
                <Button variant='primary' type='submit' disabled={loading}>
                    Search
                </Button>
            </Form>
            {loading && <Spinner animation='border' role="status" className="d-block m-auto"/>}
            {error && <p>Something went wrong. Please try again!</p>}
            {results && (
                <Container>
                    <div>
                        <h2>Results</h2>
                        <div className='d-flex flex-wrap'>
                            {results.map((result, id) => (
                                <Image
                                    src={result.urls.raw}
                                    width={250}
                                    height={250}
                                    key={id}
                                    alt={result.description}
                                    className={styles.image}
                                />
                            ))}
                        </div>
                    </div>
                </Container>
            )}
        </div>
    );
}
