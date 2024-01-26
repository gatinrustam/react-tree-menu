import { useState } from 'react';
import categories from './data/categories.json';

import Catalog from './components/Catalog';

// function generateColor() {
//   for(let i = 0; i < 2e9; i++);
//   return `hsl(${Math.random() * 360}, 100%, 50%)`;
// }

// function Box() {
//   const [color, setColor] = useState(() => generateColor());
//   console.log(color);

//   return (
//     <button
//       style={{
//         width: 100,
//         height: 100,
//         background: color,
//       }}
//     />
//   )
// }


function App() {
  const [selectedIds, setSelectedIds] = useState([]);

  return (
    <div className="app">
      <div>
        <h2>Все выбранные категории списком:</h2>
        <button onClick={() => setSelectedIds([])}>Сбросить фильтры</button>
        <ul>
          {selectedIds.map(id => {
            return (
              <li key={id}>{categories.find(category => category.id === id).name}</li>
            )
          })}
        </ul>
      </div>

      <Catalog 
        categories={categories} 
        selectedIds={selectedIds} 
        setSelectedIds={setSelectedIds} 
      />
    </div>
  );
}

export default App;
