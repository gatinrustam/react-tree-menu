import React, { useState } from "react";

export default function List({ currentCategories, categories, selectedIds, toggleId }) {
    const [expand, setExpand] = useState([]);

    function handleClick(id) {
        setExpand((prev) => {
            if (prev.includes(id)) {
                return prev.filter(item => item !== id)
            }

            return [...prev, id];
        });
    }

    return (
        <ul>
            {currentCategories.map((current) => {
                const { children, name, id } = categories[current];

                return (
                    <li className="item" key={current}>
                        <span className="row">
                            {
                                children.length > 0 && 
                                <button 
                                    onClick={() => handleClick(current)}
                                    className="item__button"
                                >
                                    <span className={expand.includes(current) ? "arrow arrow__down" : "arrow"}></span>
                                </button>
                            }
                            <label>
                                <input 
                                    type="checkbox" 
                                    checked={selectedIds.includes(current)} 
                                    onChange={() => toggleId(current)}
                                    name={name}
                                ></input>
                                {name}
                            </label>
                        </span>
                        {
                            children.length > 0 && 
                            expand.includes(current) && 
                            <List 
                                currentCategories={children} 
                                categories={categories} 
                                selectedIds={selectedIds} 
                                toggleId={toggleId} 
                            />
                        }
                    </li>
                );
            })}
        </ul>
    );
}
