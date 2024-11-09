import { useState, useEffect, ChangeEvent, useRef } from 'react'
import Icon from '@/components/Global/Icon'
type ValidatedInputProps = {
    label: string
    value: string
    placeholder?: string
    debounceTime?: number
    validate: (value: string) => Promise<boolean>
    onUpdate: (update: InputUpdate) => void
    className?: string
    autoComplete?: string
    name?: string
    suggestions?: string[]
}
export type InputUpdate = {
    value: string
    isValid: boolean
    isChanging: boolean
}
const ValidatedInput = ({
    label,
    placeholder = '',
    value,
    debounceTime = 300,
    onUpdate,
    validate,
    className,
    autoComplete,
    name,
    suggestions,
}: ValidatedInputProps) => {
    const [isValid, setIsValid] = useState(false)
    const [isValidating, setIsValidating] = useState(false)
    const [debouncedValue, setDebouncedValue] = useState<string>(value)
    const previousValueRef = useRef(value)
    const listId = useRef(`datalist-${Math.random().toString(36).substr(2, 9)}`)

    useEffect(() => {
        if ('' === debouncedValue) {
            return
        }
        let isStale = false
        previousValueRef.current = debouncedValue
        setIsValidating(true)
        validate(debouncedValue)
            .then((isValid) => {
                if (isStale) return
                setIsValid(isValid)
                onUpdate({ value: debouncedValue, isValid, isChanging: false })
            })
            .catch((error) => {
                if (isStale) return
                console.error('Unexpected error while validating recipient input field:', error)
                setIsValid(false)
                onUpdate({ value: debouncedValue, isValid: false, isChanging: false })
            })
            .finally(() => {
                if (isStale) return
                setIsValidating(false)
            })
        return () => {
            isStale = true
        }
    }, [debouncedValue])

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, debounceTime)
        return () => {
            clearTimeout(handler)
        }
    }, [value, debounceTime])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        onUpdate({ value: newValue, isValid: false, isChanging: !!newValue })
    }

    return (
        <div
            className={`relative w-full max-w-96 border border-n-1 dark:border-white${
                value && !isValidating && !isValid && debouncedValue === value ? ' border-red dark:border-red' : ''
            } ${className}`}
        >
            <label className="absolute left-1 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center bg-white text-h8 font-medium">
                {label}:
            </label>
            <div className="relative w-full">
                <input
                    type="text"
                    value={value}
                    onChange={handleChange}
                    className="h-12 w-full bg-white pl-8 pr-2 text-h8 font-medium 
                        outline-none selection:bg-transparent 
                        focus:bg-white focus:outline-none active:bg-white
                        dark:bg-n-1 dark:text-white dark:placeholder:text-white/75"
                    placeholder={placeholder}
                    spellCheck="false"
                    autoComplete={autoComplete || 'iban'}
                    name={name}
                    list={suggestions ? listId.current : undefined}
                />
            </div>
            {suggestions && (
                <datalist id={listId.current}>
                    {suggestions.map((suggestion, index) => (
                        <option key={index} value={suggestion} />
                    ))}
                </datalist>
            )}
            {value &&
                (isValidating ? (
                    <div className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center bg-white dark:bg-n-1">
                        <div
                            className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-none"
                            role="status"
                        />
                    </div>
                ) : (
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            onUpdate({ value: '', isValid: false, isChanging: false })
                        }}
                        className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center bg-white dark:bg-n-1"
                    >
                        <Icon className="h-6 w-6 dark:fill-white" name="close" />
                    </button>
                ))}
        </div>
    )
}
export default ValidatedInput
