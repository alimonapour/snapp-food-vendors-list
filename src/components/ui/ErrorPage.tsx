import styles from "./ErrorPage.module.scss"
export const ErrorPage = () => {
  return (
    <div className={styles.container}>
      <img className={styles.errorImage} />
      <div className={styles.itemsContainer}>
        <h1>متاسفانه مشکل فنی پیش آمده است</h1>
        <p>به زودی برمیگردیم. می خوای با خبر بشی؟</p>
        <input className={styles.input} placeholder="شماره موبایل" />
        <button className={styles.btn}>
          <h1>خبرم کن</h1>
        </button>
      </div>
    </div>
  )
}
