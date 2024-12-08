import { useMediaQuery } from 'react-responsive'
import { useReducer, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import AddToList from './components/AddToList'
import ShoppingList from './components/ShoppingList'
//import Form from './components/Form'

//set local storage
const LOCAL_STORAGE_KEY = 'shoppingListApp.items';

export default function App() {
  
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024});
  const isDesktop = useMediaQuery({ minWidth: 1025 })

  const [items, dispatch] = useReducer(itemsReducer,[], () => {
    const savedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  }, [items]);


  function handleAddItem(text) {
    dispatch({
      type: 'added',
      id: Date.now(),
      text: text,
    });
  }

  function handleChangeItem(item) {
    dispatch({
      type: 'changed',
      item: item
    });
  }

  function handleDeleteItem(itemId) {
    dispatch({
      type: 'deleted',
      id: itemId
    });
  }
  return (
    <>
    <Header />
    {/* Render content based on screen size */}

    {isMobile && (
      <div>
    <ShoppingList 
        items={items}
        onChangeItem={handleChangeItem}
        onDeleteItem={handleDeleteItem}
    />
    <AddToList 
      onAddToList={handleAddItem}
    />
      </div>
    )}

    {isTablet && (
          <div>
        <ShoppingList 
            items={items}
            onChangeItem={handleChangeItem}
            onDeleteItem={handleDeleteItem}
        />
        <AddToList 
          onAddToList={handleAddItem}
        />
          </div>
        )} 

    {isDesktop && (
          <div>
        <ShoppingList 
            items={items}
            onChangeItem={handleChangeItem}
            onDeleteItem={handleDeleteItem}
        />
        <AddToList 
          onAddToList={handleAddItem}
        />
          </div>
        )}
    </>
  )
}

function itemsReducer(items, action) {
  switch (action.type) {
    case 'added': {
      return [...items, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return items.map(t => {
        if (t.id === action.item.id) {
          return action.item;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return items.filter(item => item.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

//let  initialItems = [];
//let nextId = 1;