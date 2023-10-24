'use client';
import { Button } from "react-bootstrap";
interface ErrorProps {
    error: Error;
    reset: () => void;
}

export default function Error({error,reset}:ErrorProps) {
    return (
        <div>
            <h1>Oops, something went wrong!</h1>
            <pre>{error.message}</pre>
            <Button onClick={reset}>Reset</Button>
        </div>
    );
}