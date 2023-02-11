import React from "react";
import Card from "./Card";
import styles from "./cardSection.module.css";

const CardSection = (props) => {
  const { title, videos, size } = props;
  console.log(videos);

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, index) => {
          return (
            <Card key={index} id={index} imgUrl={video.imgUrl} size={size} />
          );
        })}
      </div>
    </section>
  );
};

export default CardSection;
