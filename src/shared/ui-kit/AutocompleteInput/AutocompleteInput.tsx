import React, {useEffect, useRef, useState} from 'react';
import {ArrayAndNotEmpty} from "../../helpers/common";
import useOnClickOutside from '../../hooks/useOnClickOutside';
import Icon from '../Icon/Icon';
import {OptionAutocompleteInputType} from "../../../pages/Main/components/MainSearchField/MainSearchField";
import styled from "styled-components";

type OptionType = OptionAutocompleteInputType

interface IAutocompleteInputProps {
    onChange: Function | null
    onOptionClick:  Function | null
    disabled?: boolean
    options: Array<OptionType>
    maxLength?: number
    placeholder?: string
    className?: string
    defaultValue?: string
    isError: boolean
    errorMessage: string
    isLoading: boolean
}

const AutocompleteInput = (props: IAutocompleteInputProps) => {

    const {
        onChange,
        onOptionClick,
        disabled,
        isError,
        isLoading,
        options,
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

    const handleOptionClick = (option: OptionType) => () => {
        setDropdownVisible(false)

        setValue(option.title)
        onOptionClick && onOptionClick(option);
    };

    useOnClickOutside(dropdownVisibleRef, handleClickOutside);

    const renderOption = (option: OptionType) => {
        return (
            <Option
                key={option.id}
                onClick={handleOptionClick(option)}
            >
                {option.title}
            </Option>
        )
    }

    const renderOptions = () => {
        return (
            <>
                {

                    <OptionsList>
                        {options.map(renderOption)}
                    </OptionsList>
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

    const renderSwitch = () => {
        switch (true) {
            case (isError): {
                return renderError()
            }

            case (isLoading): {
                return renderLoading()
            }

            case (ArrayAndNotEmpty(options)): {
                return renderOptions()
            }

            default:
                return null
        }
    }

    const renderDropdown = () => {
        if (!dropdownVisible) return

        return (
            <DropdownContainer ref={dropdownVisibleRef}>
                {renderSwitch()}
            </DropdownContainer>
        )

    }

    const renderInput = () => {
        const props = {
            autoFocus: true,
            disabled,
            maxLength,
            onChange: handleChange,
            value,
            placeholder,
            type: "text"
        }

        const styles = {
            background: 'transparent',
            border: 'none',
            color: 'inherit',
            padding: '5px 5px 5px 15px',
            width: '100%'
        }

        return <InputWrapper>
            <input {...props} style={styles}/>
            <div>
                <Icon iconType={'search'} />
            </div>
        </InputWrapper>

    }

    return (
        <Wrapper>
            {renderInput()}
            {renderDropdown()}
        </Wrapper>
    );
};


const Wrapper = styled.div`
      position: relative;
      width: 300px;
    `

const InputWrapper = styled.div`
      border-radius: 20px;
      background-color: var(--selected-default-color);
      color: var(--selected-inner-color);
      display: flex;
      padding: 5px;
    `

const DropdownContainer = styled.div`
      width: inherit;
      top: 110%;
      position: absolute;
      z-index: 10;
      border-radius: 5px;
      background-color: var(--selected-default-color);
      color: var(--selected-inner-color);
      overflow: hidden;
      padding: 10px 5px;
      box-shadow: 0 0 6px rgba(0,0, 0, 30%);
    `

const OptionsList = styled.ul`
      display: flex;
      flex-direction: column;
      gap: 5px;
    `

const Option = styled.li`
      border-radius: 5px;
      cursor: pointer;
      padding: 5px 5px 5px 8px;
      transition: all ease .3s;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &:hover {
        background: #b3d4fc;
      }
    `

export default AutocompleteInput;