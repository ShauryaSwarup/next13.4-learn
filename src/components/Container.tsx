"use client";

import React, { useEffect, useState } from "react";

export default function Container({ children}: { children: React.ReactNode}) {
    const [lang, setLang] = useState<String|null>("english");

    useEffect(() => {
        setTimeout(() => {
            setLang("spanish");
        }, 3000);
    }, []);

    return (
        <div >
            <br />
            This div is returned from a Client Side Rendered Component (CSR) <br/>
            [This is at the layout level, so it will be rendered on every page]
            <br />
            <br />
            <h1 style={{color:'#66FF99'}}>Lang:</h1>
            <p style={{color:'#66FF99'}}>{lang}</p>
            <br />
            {children}
        </div>
    );
}
