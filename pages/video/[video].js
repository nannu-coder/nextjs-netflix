import { getVideoById } from "@/lib/videos";
import clsx from "classnames";
import { useRouter } from "next/router";
import Modal from "react-modal";
Modal.setAppElement("#__next");
import styles from "../../styles/video.module.css";

export async function getStaticProps() {
  const videoId = "V2efVSXSlqc";
  const videoArray = getVideoById(videoId);
  console.log(videoArray);

  return {
    props: {
      video: videoArray.length > 0 ? videoArray[0] : {},
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export async function getStaticPaths() {
  const listOfVideos = ["8pDqJVdNa44", "V2efVSXSlqc", "Fkjps8Tcooo"];

  // Get the paths we want to pre-render based on posts
  const paths = listOfVideos.map((video) => ({
    params: { video },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}

const Video = ({ video }) => {
  const { title, publishTime, description, channelTitle, viewCount } = video;
  console.log(video);
  const router = useRouter();
  const videoId = router.query.video;

  const handleToggleLike = () => {};
  const handleToggleDislike = () => {};

  return (
    <div className={styles.container}>
      <Modal
        isOpen={true}
        onRequestClose={() => {}}
        // style={styles.overlay}
        className={styles.modal}
        contentLabel="Watch The Video"
      >
        <iframe
          id="ytplayer"
          className={styles.videoPlayer}
          type="text/html"
          width="100%"
          height="360"
          src={`http://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=http://example.com`}
          //   frameBorder="0"
        ></iframe>

        <div className={styles.likeDislikeBtnWrapper}>
          <div className={styles.likeBtnWrapper}>
            <button onClick={handleToggleLike}>
              <div className={styles.btnWrapper}>
                {/* <Like selected={toggleLike} /> */}
              </div>
            </button>
          </div>
          <button onClick={handleToggleDislike}>
            <div className={styles.btnWrapper}>
              {/* <DisLike selected={toggleDisLike} /> */}
            </div>
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
