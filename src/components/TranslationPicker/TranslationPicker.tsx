import React from 'react';

const TranslationPicker = () => {
    return (
        <div>
            <select name="tdict" id="tdict"  defaultValue={'ru'}>
                <option value="en">EN</option>
                <option value="ru">RU</option>
            </select>
        </div>
    );
};

export default TranslationPicker;