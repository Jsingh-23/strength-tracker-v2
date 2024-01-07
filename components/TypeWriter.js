// Custom TypeWriter effect ( not currently using )


import React, { useState, useEffect } from 'react';

const TypeWriter = ({ text, delay, infinite }) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        let timeout;

        if (currentIndex <= text.length) {
            timeout = setTimeout(() => {
                setCurrentText(prevText => prevText + text[currentIndex]);
                setCurrentIndex(prevIndex => prevIndex + 1);
            }, delay);
        } else if (infinite) {
            timeout = setTimeout(() => {
                setCurrentIndex(0);
                setCurrentText('');
            }, 5000);
            // setCurrentIndex(0);
            // setCurrentText('');
        }

        return () => clearTimeout(timeout);
    }, [currentIndex, delay, infinite, text]);

    return <span>{currentText}</span>;
};

export default TypeWriter;