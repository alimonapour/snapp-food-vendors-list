import styles from "./VendorCard.module.scss"

type Props = {
  restaurantTitle: string
  logoUrl: string
  coverPhotoUrl: string
  vendorRate: number | string
  deliveryType: string
  deliveryPrice: number | string
  description: string
}

export const VendorCard = ({
  restaurantTitle,
  logoUrl,
  coverPhotoUrl,
  vendorRate,
  deliveryType,
  deliveryPrice,
  description,
}: Props) => {
  return (
    <div className={styles.vendorCardContainer}>
      <div
        className={styles.cardCoverPhoto}
        style={{ backgroundImage: `url(${coverPhotoUrl})` }}
      ></div>
      <img
        className={styles.cardCoverImage}
        src={coverPhotoUrl}
        alt={`cover of "${restaurantTitle}"`}
      />
      <img
        src={logoUrl}
        // alt={`cover of "${restaurantTitle}"`}
        className={styles.cardLogo}
      />
      <div className={styles.cardInfoContainer}>
        <div className={styles.cardInfo}>
          <div className={styles.cardTitleSection}>
            <h1 className={styles.cardTitle}>{restaurantTitle}</h1>
            <h4 className={styles.cardRate}>{vendorRate}</h4>
          </div>
          <h4 className={styles.cardDescription}>{description}</h4>
          <h2 className={styles.cardDeliveryInfo}>
            <span>{deliveryType}</span> <span>{deliveryPrice} تومان</span>
          </h2>
        </div>
      </div>
    </div>
  )
}
