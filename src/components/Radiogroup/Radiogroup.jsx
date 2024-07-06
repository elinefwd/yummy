// src/components/RadioGroup.js
import React from 'react';

const RadioGroup = ({ legend, name, options, selectedValue, onChange }) => {
    return (
        <fieldset>
            <legend>{legend}</legend>
            {options.map(option => (
                <label key={option.value}>
                    <input
                        type="radio"
                        name={name}
                        value={option.value}
                        onChange={() => onChange(option.value)}
                        checked={selectedValue === option.value}
                    />
                    {option.label}
                </label>
            ))}
        </fieldset>
    );
};

export default RadioGroup;
