import {useState} from "react"
type ListProps<T> = {
    items: T[];
    keyExtractor: (item: T) => string | number;
    renderItem: (item: T, isSelected: boolean) => React.ReactNode;
    onSelectionChange?: (item: T) => void;
};

const List = <T,>({ items, keyExtractor, renderItem, onSelectionChange }: ListProps<T>) => {
    const [selectedKey, setSelectedKey] = useState<string | number | null>(null);
    const handleSelect = (item: T) => {
        const key = keyExtractor(item);
        setSelectedKey(key);
        onSelectionChange?.(item);
    };

    return (
        <ul>
            {items.map((item) => {
                const key = keyExtractor(item);
                return (
                    <li key={key} onClick={() => handleSelect(item)}>
                        {renderItem(item, selectedKey === key)}
                    </li>
                );
            })}
        </ul>
    );
};

export default List;