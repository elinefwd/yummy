// src/components/Footer.js
import React from 'react';

const Footer = ({ content, useCodeWrapper }) => {
    return (
        <footer>
            {useCodeWrapper ? (
                <code>
                    <p>{content}</p>
                </code>
            ) : (
                <p>{content}</p>
            )}
        </footer>
    );
};

export default Footer;
