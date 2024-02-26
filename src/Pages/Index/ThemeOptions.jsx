import React from 'react';

const ThemeOptions = ({ selectedTheme, setSelectedTheme }) => {
  const themes = {
    mydark: 'Dark',
    mylight: 'Light',
    retro: 'Retro',
    cyberpunk: 'Cyberpunk',
    coffee: 'Coffee',
    aqua: 'Aqua',
    synthwave: 'Synthwave',
    lofi: 'Lofi',
  };

  return (
    <ul
      tabIndex={0}
      className='dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52 absolute top-full left-[calc(-16px)] mt-1'
    >
      {Object.entries(themes).map(([themeKey, themeName]) => (
        <li key={themeKey}>
          <input
            type='radio'
            name='theme-dropdown'
            className='theme-controller btn btn-sm btn-block btn-ghost justify-start'
            aria-label={themeName}
            value={themeKey}
            checked={selectedTheme === themeKey}
            onChange={() => setSelectedTheme(themeKey)}
          />
        </li>
      ))}
    </ul>
  );
};

export default ThemeOptions;
