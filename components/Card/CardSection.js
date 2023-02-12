import Link from "next/link";
import React from "react";
import Card from "./Card";
import styles from "./cardSection.module.css";

const CardSection = (props) => {
  const { title, videos = [], size } = props;

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, index) => {
          return (
            <Link key={index} href={`/video/${video.id}`}>
              <Card id={index} imgUrl={video.imgUrl} size={size} />
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CardSection;
