import React, { useState } from 'react';

import './index.css';

interface SearchByProps {
  value: string[];
  title: string;
  fields: string[];  
  onSelectedFields: React.Dispatch<React.SetStateAction<string[]>>;
}

const SearchBy = React.memo(({ value = [], title, fields = [], onSelectedFields }: SearchByProps) => {
  const [selectedFields, setSelectedFields] = useState<string[]>(value);

  const onClickHandler = (event: React.MouseEvent<HTMLLIElement>) => {
    const text = event.currentTarget.textContent?.toLowerCase() || '';
    const getSelected = (prev: string[]) => {
        return selectedFields.includes(text)
            ? prev.filter((field) => field !== text)
            : [...prev, text];
    };

    setSelectedFields(getSelected);
    onSelectedFields(getSelected);
  }

  return (
    <div className='fields-selector'>
      <h2>{title}</h2>
      <ul className='fields-container'>
        {
          fields.map((field) => {            
            return (
              <li
                key={field}
                onClick={onClickHandler}
                className={`field${selectedFields.includes(field.toLowerCase()) ? ' selected' : ''}`}
              >
                  <span>{field}</span>
              </li>
            );
          })
        }      
      </ul>
    </div>    
  )
});

export default SearchBy;
