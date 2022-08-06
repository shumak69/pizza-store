import { useDispatch, useSelector } from 'react-redux'
import { setSelectedFilter } from "../redux/slices/filterSlice"
const items=["Все","Мясные", "Вегетарианская","Гриль", "Острые","Закрытые",]
function Categories() {
    const active = useSelector<any>(state => state.filter.selectedFilter)
    const dispatch = useDispatch()
    
    return (
    <div className="categories">
        <ul>
            {items && items.map((item, i) => <li
            className={active === i ? 'active' : ''} 
            key={item} 
            onClick={() => dispatch(setSelectedFilter(i))}
        >{item}</li>)}
        </ul>
    </div>
    )
}

export default Categories