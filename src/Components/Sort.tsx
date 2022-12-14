import {  memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSort, Sort as SortType } from "../redux/slices/filterSlice";
import { RootState } from "../redux/store";

type SortItem = {
  name: string;
  type: 'rating' | 'price' | 'title';
  params: string;
};

export const list: SortItem[] = [
  { name: "популярности", type: "rating", params: "asc" },
  { name: "цене (по возрастанию)", type: "price", params: "asc" },
  { name: "цене (по убиванию)", type: "price", params: "desc" },
  { name: "алфавиту", type: "title", params: "asc" },
];

const Sort = memo(function Sort() {
  const [isOpen, setIsOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);
  const active = useSelector<RootState, SortType>((state) => state.filter.sortType);
  const dispatch = useDispatch();
  function selectItem(i: SortItem) {
    dispatch(setSelectedSort(i));
    setIsOpen(false);
  }

  useEffect(() => {
    const hidePopUp = function (e: MouseEvent) {
      if (sortRef.current && !e.composedPath().includes(sortRef.current)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.body.addEventListener("click", hidePopUp);
    }
    return () => {
      document.body.removeEventListener("click", hidePopUp);
    };
  }, [isOpen]);
  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setIsOpen((state) => !state)}>{active.name}</span>
      </div>
      {isOpen && (
        <div className="sort__popup">
          <ul>
            {list.map((name, i) => (
              <li
                key={name.name}
                /* className={active === i ? "active" : ""} */
                onClick={() => selectItem(name)}
              >
                {name.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
})

export default Sort;
