import { useState } from "react"
import { FaArrowCircleUp } from "react-icons/fa"
import styles from "./ScrollToTop.module.scss"
const ScrollButton = () => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop
    if (scrolled > 1000) {
      setVisible(true)
    } else if (scrolled <= 600) {
      setVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  window.addEventListener("scroll", toggleVisible)

  return (
    <div className={styles.btnContainer}>
      <button style={{ display: visible ? "inline" : "none" }}>
        <FaArrowCircleUp onClick={scrollToTop} className={styles.btn} />
      </button>
    </div>
  )
}

export default ScrollButton
