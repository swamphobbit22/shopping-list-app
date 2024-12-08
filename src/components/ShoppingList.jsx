import { useState } from 'react';

export default function ShoppingList({ items, onChangeItem, onDeleteItem }) {
    
    if(items.length !== 0 ){
        return (   
        <section className='list'>
            <ul>
                {items.map(item => (
                    <li key={item.id} className='list-item'> 
                        <Item 
                        item={item}
                        onChangeItem={onChangeItem}
                        onDeleteItem={onDeleteItem}
                        />
                    </li> 
                ))}
            </ul>
        </section>
        );
    } else {
        return (
            <h3>Your shopping list is empty</h3>
        )
    }
};

//edit an item
function Item({item, onChangeItem, onDeleteItem}) {
    const [isEditing, setIsEditing] = useState(false);
    let itemContent;

    if(isEditing) {
        itemContent = (
        <>
            <input 
            value={item.text} 
            onChange={e => {
                onChangeItem({
                    ...item,
                    text: e.target.value
                });
            }} />
            <button className="edit-button" onClick={() => setIsEditing(false)}><i class="fa fa-floppy-o" aria-hidden="true"></i></button>
        </>
        );
    } else {
        itemContent = (
        <>
            <span>{item.text}</span>
            <button className="edit-button" onClick={() => setIsEditing(true)}><i class="fa fa-pencil" aria-hidden="true"></i></button>
        </>
        );
    };

    return (
        <label>
            <input 
            type="checkbox" 
            checked={item.done}
            onChange={e => {
                onChangeItem({
                    ...item,
                    done: e.target.checked
                });
            }}
        />
            {itemContent}
            <button className="delete-button" onClick={() => onDeleteItem(item.id)}><i class="fa fa-trash" aria-hidden="true"></i></button>
        </label>        
    );   
}

