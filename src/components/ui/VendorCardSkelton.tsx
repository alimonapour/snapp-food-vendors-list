import styles from "./VendorCardSkelton.module.scss"

export const CardSkeleton = () => {
  return (
    <div className={styles.cardSkeltonContainer}>
      <div className={styles.cardSkeltonFirstAnimationDiv}></div>
      <div className={styles.cardSkeltonDetailsContainer}>
        <div className={styles.cardSkeltonSecondAnimationDiv}>
          <h1 className={styles.cardSkeltonDetailItems}>{}</h1>
          <h2 className={styles.cardSkeltonDetailItems}>{}</h2>
          <h2 className={styles.cardSkeltonDetailItems}>{}</h2>
        </div>
      </div>
    </div>
  )
}

export const VendorCardSkeleton = () => {
  const skeletonRange = Array.from(Array(5).keys()).map((n) => n + 1)

  return (
    <div className={styles.vendorCardSkeltonContainer}>
      {skeletonRange.map((num) => {
        return <CardSkeleton key={num} />
      })}
    </div>
  )
}
