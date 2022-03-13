import React from 'react';

const TranslationPicker = () => {
    return (
        <div>
            <select name="tdict" id="tdict">
                <option value="en">EN</option>
                <option value="ru" selected>RU</option>
            </select>
        </div>
    );
};

export default TranslationPicker;