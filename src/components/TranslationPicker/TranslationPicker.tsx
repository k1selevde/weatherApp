import React, {ChangeEvent} from 'react';
import {useRecoilState} from "recoil";
import styled from 'styled-components';
import {localeState, LocaleStateType} from "../../i18n";

const TranslationPicker = () => {
    const [locale, setLocale] = useRecoilState(localeState)

    return (
        <div>
            <Select
                id="tdict"
                name="tdict"
                defaultValue={locale}
                onChange={
                    (e: ChangeEvent<HTMLSelectElement>) =>
                        setLocale(e.target.value as LocaleStateType)
                }
            >
                <option value="en">EN</option>
                <option value="ru">RU</option>
            </Select>
        </div>
    );
};

const Select = styled.select`
  background: var(--selected-default-color);
  border-color: var(--selected-inner-color);
  border-radius: 5px;
  padding: 4px;
  &:hover {
    cursor: pointer;
  }
`

export default TranslationPicker;