import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {OptionAutocompleteInputType} from "../../types";
import spinner from '../assets/animated/spinner.svg'
import {ArrayAndNotEmpty} from "../helpers/common";
import useOnClickOutside from '../hooks/useOnClickOutside';
import Icon from './Icon';

type OptionType = OptionAutocompleteInputType

interface IAutocompleteInputProps {
    onBlur?: () => void
    onChange?: (value: string) => void
    onOptionClick?: (option: OptionType) => void
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
        onBlur,
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
        const hasSomeData = isLoading || isError || ArrayAndNotEmpty(options)

        if (hasSomeData && value.trim()) {
            setDropdownVisible(true)
        } else {
            setDropdownVisible(false)
        }
    }, [options, isLoading, isError, value])

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
        <>Error... {errorMessage}</>
    )

    const renderLoading = () => (
        <LoaderWrapper>
            <img src={spinner} alt="loading..." width={70} height={70}/>
        </LoaderWrapper>
    )

    const renderSwitch = () => {
        switch (true) {
            case (isLoading):
                return renderLoading()

            case (isError):
                return renderError()

            case (ArrayAndNotEmpty(options)):
                return renderOptions()

            default:
                return renderLoading()
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
            onBlur,
            onChange: handleChange,
            value,
            placeholder,
            type: "text"
        }

        return <InputWrapper>
            <Input {...props} />
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

const Input = styled.input`
  background: transparent;
  border: none;
  color: inherit;
  padding: 5px 5px 5px 15px;
  width: 100%;
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

const LoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

export default AutocompleteInput;