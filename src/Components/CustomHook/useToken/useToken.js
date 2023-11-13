import React, { useEffect, useState } from 'react';

const useToken = (email) => {
    const [token, setToken] = useState(false);
    useEffect(() => {
        if (email) {
            fetch('http://localhost:5000/jwt', {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ email })
            })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        localStorage.setItem("token", data.token)
                        setToken(true);
                    }
                })
        }

    }, [email])
    return [token];

};

export default useToken;