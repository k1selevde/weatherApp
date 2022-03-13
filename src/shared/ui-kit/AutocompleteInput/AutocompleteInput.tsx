import React, {useEffect, useRef, useState} from 'react';
import {ArrayAndNotEmpty} from "../../helpers/common";
import useOnClickOutside from '../../hooks/useOnClickOutside';
import cn from 'classnames'
import styles from './AutocompleteInput.module.sass'
import Icon from '../Icon/Icon';
import {OptionAutocompleteInputType} from "../../../pages/Main/components/MainSearchField/MainSearchField";

type Option = OptionAutocompleteInputType

interface IAutocompleteInputProps {
    onChange: Function | null
    onOptionClick:  Function | null
    disabled?: boolean
    options: Array<Option>
    maxLength?: number
    placeholder?: string
    className?: string
    defaultValue?: string
    isError: boolean
    errorMessage: string
    isLoading: boolean
}

const AutocompleteInput: React.FC<IAutocompleteInputProps> = (props) => {

    const {
        onChange,
        onOptionClick,
        disabled,
        isError,
        isLoading,
        options,
        className,
        maxLength,
        placeholder,
        errorMessage = '',
        defaultValue = ''
    } = props;

    const dropdownVisibleRef = useRef(null);

    const [value, setValue] = useState<string>(defaultValue);
    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

    useEffect(() =>  {
        if (ArrayAndNotEmpty(options) && value.trim()) {
            setDropdownVisible(true)
        }
    }, [options])

    const handleClickOutside = () => {
        setDropdownVisible(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value

        setValue(val)
        onChange && onChange(val)
    }

    const handleOptionClick = (option: Option) => () => {
        setDropdownVisible(false)

        setValue(option.title)
        onOptionClick && onOptionClick(option);
    };

    useOnClickOutside(dropdownVisibleRef, handleClickOutside);

    const renderOption = (option: Option) => {
        return (
            <li key={option.id} className={styles.option} onClick={handleOptionClick(option)}>{option.title}</li>
        )
    }

    const renderOptions = () => {
        return (
            <>
                {

                    <ul className={styles.optionsList}>
                        {options.map(renderOption)}
                    </ul>
                }
            </>
        )
    }

    const renderError = () => (
        <div>Error... {errorMessage}</div>
    )

    const renderLoading = () => (
        <div>Loading</div>
    )

    const renderDropdown = () => {
        if (!dropdownVisible) return

        switch (true) {
            case (isError): {
                return <div ref={dropdownVisibleRef} className={styles.dropdownContainer}>
                    {renderError()}
                </div>
            }

            case (isLoading): {
                return <div ref={dropdownVisibleRef} className={styles.dropdownContainer}>
                    {renderLoading()}
                </div>
            }

            case (ArrayAndNotEmpty(options)): {
                return <div ref={dropdownVisibleRef} className={styles.dropdownContainer}>
                    {renderOptions()}
                </div>
            }

            default:
                return null
        }
    }

    const renderInput = () => {
        const inputCN = cn({
            [styles.input]: true,
            [`${className}`]: !!className
        })

        const props = {
            disabled,
            className: inputCN,
            maxLength,
            onChange: handleChange,
            value,
            placeholder
        }

        return <div className={styles.inputWrapper}>
            <input type="text" {...props} />
            <div className={styles.inputIcon}>
                <Icon iconType={'search'} />
            </div>
        </div>

    }

    return (
        <div className={styles.wrapper}>
            {renderInput()}
            {renderDropdown()}
        </div>
    );
};

export default AutocompleteInput;