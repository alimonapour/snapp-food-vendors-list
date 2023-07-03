import { useNavigate } from "react-router-dom"
import styles from "./Home.module.scss"

export const Home = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.container}>
      <button className={styles.btn} onClick={() => navigate("/vendors-list")}>
        <h1>لیست رستوران ها</h1>
      </button>
    </div>
  )
}
