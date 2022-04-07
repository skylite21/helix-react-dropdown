import { useState, useRef, useEffect } from 'react';
import './dropdown.css';

const Dropdown = ({ options = [], onChange = () => {} }) => {
  const [selected, setSelected] = useState(options[0]);
  const [opened, setOpened] = useState(false);
  const container = useRef(null);

  const handleOutsideClick = (event) => {
    console.log('clicked');
    if (!container.current?.contains(event.target)) setOpened(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      console.log('dropdown unmounted');
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <div className='dropdown-container' ref={container}>
      <button
        className={opened ? 'selected' : 'selected closed'}
        onClick={() => {
          setOpened(!opened);
        }}>
        {selected}
        <span className={`icon ${opened ? 'arrow-up' : 'arrow-down'}`} />
      </button>
      {opened && (
        <div className='options'>
          {options
            .filter((option) => option !== selected)
            .map((option, index) => (
              <button
                key={index}
                className='option'
                onClick={() => {
                  setSelected(option);
                  setOpened(false);
                  onChange(option);
                }}>
                {option}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
