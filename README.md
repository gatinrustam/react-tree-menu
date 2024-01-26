# react-tree-menu
Рекурсивный обход древовидного меню и смена состояний выбранных пунктов. 
[Демо](https://gatinrustam.github.io/react-tree-menu)

## Задача: 
Отрендарить [плоский массив пунктов меню](https://github.com/gatinrustam/react-tree-menu/blob/master/src/data/categories.json) с указанием родителя. 

## Сделать мультивыбор пунктов, который будет помечать все вложенные элементы при выборе родительской категории.
```
export function getDescendantsIds(id, obj) {
  const { children } = obj[id];

  return [
    ...children,
    ...children.flatMap(childId => getDescendantsIds(childId, obj))
  ]
}
```

## Убирать родительские пункты меню, когда дочерние элементы будут исключены.
```
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
```

![image](https://dralexandra.ru/common/screenshot.png)
