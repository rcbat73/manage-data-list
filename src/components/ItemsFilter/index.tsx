import React, { useState } from 'react';

import './index.css';

interface FilterProps {
  value: string;
  title: string;
  items: string[];
  onSelectedItem: React.Dispatch<React.SetStateAction<FiltersFields>>;
}

const ItemsFilter = React.memo(({ value, title, items = [], onSelectedItem}: FilterProps) => {
  const [selectedItem, setSelectedItem] = useState(value);
  
  const onClickHandler = (event: React.MouseEvent<HTMLLIElement>) => {
    const text = event.currentTarget.textContent || '';
    setSelectedItem((prev) => prev?.toLowerCase() === text.toLowerCase() ? '' : text);
    onSelectedItem((prev) => {
      return {
        ...prev,
        [title.toLowerCase()]: prev[title.toLowerCase() as keyof FiltersFields] === text
          ? ''
          : text,
      };
    });
  }

  return (
    <div className='filter-selector'>
      <h2>{title}</h2>
      <ul className='filters-container'>
        {
          items.map((item) => {            
            return (
              <li
                key={item}
                onClick={onClickHandler}
                className={`filter-item${selectedItem.toLowerCase() === item.toLowerCase() ? ' selected' : ''}`}
              >
                  {item}
              </li>
            );
          })
        }      
      </ul>
    </div>    
  )
});

export default ItemsFilter;
