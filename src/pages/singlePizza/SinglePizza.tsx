import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from './singlePizza.module.scss'
function SinglePizza  (){
    const navigate = useNavigate();
    const [pizza, setPizza] = useState<{
        imageUrl: string;
        title: string;
        price: number;
        id: string;
    }>()
    const {id} = useParams();
    useEffect(() => {
        axios.get(`https://62e3c9643c89b95396d05783.mockapi.io/items/${id}`)
        .then((res) => {
            setPizza(res.data);
        })
        .catch(error => {
            alert(error);
            navigate('/')
        })
    }, [])
    if(!pizza) {
        return <div>Загрузка...</div>
    }
    return (
        <div className={styles.singlePizza}>
            <div className={styles.wrapper}>
                <img src={pizza.imageUrl} alt="pizza" />
            </div>
            <div className={styles.info}>
                <div className={styles.title}>{pizza.title}</div>
                <div className={styles.price}>цена {pizza.price} ₴</div>
                <button className="button button--outline" onClick={() => navigate(-1)}>Вернутся назад</button>
            </div>
        </div>
    )
}

export default SinglePizza;

