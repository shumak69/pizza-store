import debounce from 'lodash.debounce';
import { useCallback, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";
import styles from "./search.module.scss";

function Search() {
  const [ inputValue, setInputValue ] = useState("");
  const dispatch = useDispatch();
  const inputEl = useRef<HTMLInputElement>(null);
  const clearInput = () => {
    dispatch(setSearchValue(''));
    setInputValue('');
    inputEl.current?.focus();
  }

  const searchChange = (event: any) => {
    setInputValue(event.target.value);
    inputChange(event)
  }

  const inputChange = useCallback(
    debounce((event: any) => {
      dispatch(setSearchValue(event.target.value))
    }, 500)
  , [])

  return (
    <div className={styles.search}>
      <label htmlFor="search">
        <svg
          enableBackground="new 0 0 512 512"
          className={styles.icon}
          height="512px"
          id="Layer_1"
          version="1.1"
          viewBox="0 0 512 512"
          width="512px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M504.984,478.912L361.365,335.271c28.868-34.715,46.246-79.299,46.246-127.965  C407.611,96.672,317.939,7,207.306,7C96.692,7,7,96.672,7,207.306c0,110.608,89.692,200.301,200.306,200.301  c48.676,0,93.256-17.379,127.972-46.248L478.896,505L504.984,478.912z M28.085,207.306c0-98.825,80.386-179.221,179.221-179.221  c98.815,0,179.221,80.396,179.221,179.221c0,98.831-80.405,179.215-179.221,179.215C108.471,386.521,28.085,306.137,28.085,207.306z  "
            fill="#425661"
          />
          <rect
            fill="#425661"
            height="21.084"
            width="200.729"
            x="105.181"
            y="197.438"
          />
          <rect
            fill="#425661"
            height="200.729"
            width="21.084"
            x="195.003"
            y="107.615"
          />
        </svg>
      </label>
      <input
        ref={inputEl}
        id="search"
        type="text"
        placeholder="Поиск пиццы..."
        className={styles.input}
        onChange={(e) => searchChange(e)}
        value={inputValue}
      />
      {inputValue && (
        <svg
          className={styles.close}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          onClick={clearInput}
        >
          <g>
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9.414l2.828-2.829 1.415 1.415L13.414 12l2.829 2.828-1.415 1.415L12 13.414l-2.828 2.829-1.415-1.415L10.586 12 7.757 9.172l1.415-1.415L12 10.586z" />
          </g>
        </svg>
      )}
    </div>
  );
}

export default Search;
