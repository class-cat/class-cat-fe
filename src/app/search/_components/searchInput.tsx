import { useState, useEffect } from "react";
import { Icons } from "~/components/icons";
import { Input } from "~/components/ui/input";
import { useDebounce } from "~/hooks/useDebounce";

type Props = {
    value: string;
    setValue: (value: string) => void;
};

export function SearchInput({ value, setValue }: Props) {
    const [inputValue, setInputValue] = useState(value);
    const debouncedValue = useDebounce(inputValue, 500);

    useEffect(() => {
        setValue(debouncedValue);
    }, [debouncedValue, setValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <div className="flex w-full items-center rounded-lg border-2 border-secondary ">
            <div className="w-full justify-between inline-flex items-center justify-center px-4">
                <Icons.search className="hidden h-6 w-6 md:block" />
                <Input
                    className="focus-visible:outline-none"
                    placeholder="Słowo kluczowe..."
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
}
