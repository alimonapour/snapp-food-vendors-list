import styles from "./VendorCard.module.scss"
import { FaStar } from "react-icons/fa"
import { makeNumbersFarsi } from "../../utils/makeNumbersFarsi"

type Props = {
  restaurantTitle: string
  logoUrl: string
  coverPhotoUrl: string
  vendorRate: number | string
  deliveryType: string
  deliveryPrice: number | string
  description: string
}

const vendorRateColor = {
  veryHighRateColor: "#3f7e00",
  veryHighRateBackColor: "#5ba829",
  highRateColor: "#5ba839",
  highRateBackColor: "#f2faf5",
  goodRateColor: "#9acd32",
  goodRateBackColor: "#cdd614",
  mediumRateColor: "#ffba00",
  mediumRateBackColor: "#cdd614",
  lowRateColor: "#ff7800",
  lowRateBackColor: "#ffba00",
  lessRateColor: "#ff2717",
  lessRateBackColor: "#ff7800",
  veryLowRateColor: "#c10914",
  veryLowRateBackColor: "#00d170",
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
        alt={`cover of "${restaurantTitle}"`}
        className={styles.cardLogo}
      />
      <div className={styles.cardInfoContainer}>
        <div className={styles.cardInfo}>
          <div className={styles.cardTitleSection}>
            <h1 className={styles.cardTitle}>{restaurantTitle}</h1>
            <div
              className={styles.vendorRateContainer}
              style={{
                backgroundColor:
                  Number(vendorRate) >= 4.5
                    ? vendorRateColor.highRateBackColor
                    : Number(vendorRate) >= 4 && Number(vendorRate) < 4.5
                    ? vendorRateColor.highRateBackColor
                    : Number(vendorRate) >= 3.5 && Number(vendorRate) < 4
                    ? vendorRateColor.goodRateBackColor
                    : Number(vendorRate) >= 3 && Number(vendorRate) < 3.5
                    ? vendorRateColor.mediumRateBackColor
                    : Number(vendorRate) >= 2.5 && Number(vendorRate) < 3
                    ? vendorRateColor.lowRateBackColor
                    : Number(vendorRate) >= 2 && Number(vendorRate) < 2.5
                    ? vendorRateColor.lessRateBackColor
                    : Number(vendorRate) < 2
                    ? vendorRateColor.veryLowRateBackColor
                    : "",
              }}
            >
              <h4 className={styles.cardRate}>
                {makeNumbersFarsi(vendorRate)}
              </h4>
              <FaStar
                className={styles.starIcon}
                style={{
                  color:
                    Number(vendorRate) >= 4.5
                      ? vendorRateColor.veryHighRateColor
                      : Number(vendorRate) >= 4 && Number(vendorRate) < 4.5
                      ? vendorRateColor.highRateColor
                      : Number(vendorRate) >= 3.5 && Number(vendorRate) < 4
                      ? vendorRateColor.goodRateColor
                      : Number(vendorRate) >= 3 && Number(vendorRate) < 3.5
                      ? vendorRateColor.mediumRateColor
                      : Number(vendorRate) >= 2.5 && Number(vendorRate) < 3
                      ? vendorRateColor.lowRateColor
                      : Number(vendorRate) >= 2 && Number(vendorRate) < 2.5
                      ? vendorRateColor.lessRateColor
                      : Number(vendorRate) < 2
                      ? vendorRateColor.veryLowRateColor
                      : null,
                }}
              />
            </div>
          </div>
          <h4 className={styles.cardDescription}>{description}</h4>
          <h2 className={styles.cardDeliveryInfo}>
            <span className={styles.deliveryType}>{deliveryType}</span>{" "}
            {deliveryPrice === 0 ? (
              <span>رایگان</span>
            ) : (
              <span className={styles.deliveryPrice}>
                {makeNumbersFarsi(deliveryPrice)} تومان
              </span>
            )}
          </h2>
        </div>
      </div>
    </div>
  )
}
