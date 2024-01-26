export function getDescendantsIds(id, obj) {
  const { children } = obj[id];

  return [
    ...children,
    ...children.flatMap(childId => getDescendantsIds(childId, obj))
  ]
}

export function getAncestorsIds(id, obj, selectedIds) {
  const result = [];
  const { parentId } = obj[id];
  
  if (parentId === undefined) {
    return result;
  }

  const allChildren = obj[parentId].children;
  
  const isAllChildrenSelected = allChildren
    .filter(item => item !== id)
    .every(item => selectedIds.includes(item));

  if (isAllChildrenSelected) {
     result.push(
      parentId, 
      ...getAncestorsIds(parentId, obj, selectedIds))
  }

  return result;
}