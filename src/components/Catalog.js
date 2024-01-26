import React from "react";
import List from "./List";
import {getDescendantsIds, getAncestorsIds} from '../helpers.js';

export default function Catalog({ categories, selectedIds, setSelectedIds }) {
    function toggleId(id) {
        const set = new Set([
            ...selectedIds, 
            ...getDescendantsIds(id, categoriesObj),
            ...getAncestorsIds(id, categoriesObj, selectedIds)
        ]);

        const allSelected = Array.from(set);

        if (allSelected.includes(id)) {
            setSelectedIds(selectedIds.filter((selected) => {
                const children = getDescendantsIds(id, categoriesObj);
                const ancestors = getAncestorsIds(id, categoriesObj, selectedIds);

                return selected !== id && !children.includes(selected) && !ancestors.includes(selected)
            }));
        } else {
            setSelectedIds([...allSelected, id]);
        }
    }

    const categoriesObj = {};

    for (const category of categories) {
        categoriesObj[category.id] = {
            ...category,
            children: [],
        };
    }

    for (const category of categories) {
        if (category.parentId) {
            categoriesObj[category.parentId].children.push(category.id);
        }
    }

    const topLevelIds = categories
        .filter((parentCategory) => parentCategory.parentId === undefined)
        .map((category) => category.id);

    return (
        <List 
            currentCategories={topLevelIds} 
            categories={categoriesObj} 
            selectedIds={selectedIds} 
            toggleId={toggleId}
        />
    );
}
