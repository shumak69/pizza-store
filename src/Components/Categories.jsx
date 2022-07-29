import { useState } from "react"

function Categories({items}) {
    const [activeItem, setActiveItem] = useState('Все');
    return (
    <div className="categories">
        <ul>
        {/* <li
        onClick={() => setActiveItem('all')}
        className={activeItem === 'all' ? 'active' : ''} 
        >Все</li> */}
            {items && items.map((item) => <li
            className={activeItem === item ? 'active' : ''} 
            key={item} 
            onClick={() => setActiveItem(item)}
        >{item}</li>)}
        </ul>
    </div>
    )
}

export default Categories