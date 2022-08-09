import { useDispatch, useSelector } from 'react-redux'
import { setSelectedFilter } from "../redux/slices/filterSlice"
import { RootState } from '../redux/store'
import { memo } from 'react'
const items=["Все","Мясные", "Вегетарианская","Гриль", "Острые","Закрытые",]
const Categories = memo(function Categories() {
    const active = useSelector<RootState, number>(state => state.filter.selectedFilter)
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
})

export default Categories