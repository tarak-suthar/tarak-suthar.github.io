import React, { useState, useRef, useEffect } from 'react';
import Icon from '@mdi/react';
import { mdiMagnify, mdiClose, mdiHistory } from '@mdi/js';
import './Search.css';

const Search = ({
    onSearch,
    onClear,
    recentSearches = [],
    onRemoveRecent,
    placeholder = "Search product or category..."
}) => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        if (onSearch) onSearch(value);
    };

    const handleClear = () => {
        setQuery('');
        if (onClear) onClear();
        if (inputRef.current) inputRef.current.focus();
    };

    const handleCancel = () => {
        setQuery('');
        setIsFocused(false);
        if (onClear) onClear();
        if (inputRef.current) inputRef.current.blur();
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    // When clicking the cancel button, we want to clear and blur
    // but the input might try to keep focus if we aren't careful.
    // The mousedown preventDefault helps with button actions vs blur.

    return (
        <div className="search-wrapper">


            <div className={`search-bar-container ${isFocused || query ? 'active' : ''}`}>
                <div className="search-input-wrapper">
                    <Icon path={mdiMagnify} size={1} className="search-icon" />
                    <input
                        ref={inputRef}
                        type="text"
                        className="search-input"
                        placeholder={placeholder}
                        value={query}
                        onChange={handleInputChange}
                        onFocus={handleFocus}
                    // onBlur={() => setTimeout(() => setIsFocused(false), 200)} // Delay to allow click on items
                    />
                </div>
                {(isFocused || query) && (
                    <button
                        className="cancel-button"
                        onClick={handleCancel}
                        onMouseDown={(e) => e.preventDefault()} // Prevent blur before click
                    >
                        Cancel
                    </button>
                )}
            </div>

            {/* Recent Searches / History View */}
            {/* Show this if we have history and the user is focused or typing (and has no results yet? 
                Design implies these are always visible in the search 'screen'. 
                For now, let's show them when focused or if query is empty but we are in 'search mode'. */}

            {isFocused && recentSearches.length > 0 && !query && (
                <div className="recent-searches-container">
                    {recentSearches.map((item, index) => (
                        <div key={index} className="recent-search-item">
                            <div className="recent-item-left" onClick={() => { setQuery(item); if (onSearch) onSearch(item); }}>
                                <Icon path={mdiMagnify} size={0.8} className="recent-icon" />
                                <span className="recent-text">{item}</span>
                            </div>
                            <button
                                className="remove-recent-btn"
                                onClick={(e) => { e.stopPropagation(); if (onRemoveRecent) onRemoveRecent(item); }}
                            >
                                <Icon path={mdiClose} size={0.7} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Example Active State (Mocking design reference "iphone 12 pro max" styled item if typed?)
                The design shows "iphone 12 pro max" with green text. 
                If that's the current input, the input text itself changes color.
            */}
        </div>
    );
};

export default Search;
