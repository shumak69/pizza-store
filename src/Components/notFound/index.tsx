import styles from "./notFound.module.scss";
import {Link} from 'react-router-dom'
function index() {
  return (
    <div className={styles.root}>
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p>
        К сожалению данная страница не найдена 
      </p>
      <Link to="/">
        <button className={styles.button}>Перейти на главную страницу</button>
      </Link>
    </div>
  );
}

export default index;
