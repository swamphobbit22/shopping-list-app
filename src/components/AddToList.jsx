import { useState } from 'react';

export default function AddToList({ onAddToList}) {

    const [list, setList] = useState('');
   
    return (
        <div className='addShopping'> 
            <input className="addItem-box" maxWidth="60" placeholder="Add item here" value={list} onChange={e => setList(e.target.value)} />
            <button className="add-button" onClick={() => {
                if (list.trim() !== '') {
                    onAddToList(list);  
                    setList('');  
                }
            }}>Add</button>
        </div>

    )
   
}