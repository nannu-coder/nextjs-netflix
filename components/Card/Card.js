import Image from "next/image";
import React, { useState } from "react";
import styles from "./card.module.css";
import { motion } from "framer-motion";
import cls from "classnames";

const Card = (props) => {
  const { imgUrl = "/static/no-image.jpg", size = "medium", id } = props;
  const [imgSrc, setImgSrc] = useState(imgUrl);

  const clsMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const handleImgError = () => {
    setImgSrc("/static/no-image.jpg");
  };

  const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };

  return (
    <div className={styles.container}>
      <motion.div
        className={cls(styles.imgMotionWrapper, clsMap[size])}
        whileHover={scale}
      >
        <Image
          src={imgSrc}
          alt="image"
          layout="fill"
          onError={handleImgError}
        />
      </motion.div>
    </div>
  );
};

export default Card;
