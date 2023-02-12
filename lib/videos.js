export const getCommonVideos = async (url) => {
  try {
    const BASE_URL = `https://youtube.googleapis.com/youtube/v3`;

    const response = await fetch(
      `${BASE_URL}/${url}&key=${process.env.YOUTUBE_API_KEY}`
    );

    const datas = await response.json();

    if (datas?.error) {
      console.error("Youtube API error", datas.error);
      return [];
    }

    return datas.items.map((video) => {
      const id = video?.id?.videoId || video.id;
      return {
        id,
        imgUrl: video.snippet.thumbnails.high.url,
        title: video.snippet.title,
        description: snippet.description,
        publishTime: snippet.publishedAt,
        channelTitle: snippet.channelTitle,
        statistics: item.statistics ? item.statistics : { viewCount: 0 },
      };
    });
  } catch (error) {
    console.error("Something went wrong with video library", error);
  }
};

export const getVideos = (searchQuery) => {
  const URL = `search?part=snippet&maxResults=25&q=${searchQuery}`;
  return getCommonVideos(URL);
};

export const getPopularVideos = async () => {
  try {
    const URL =
      "videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US";

    return getCommonVideos(URL);
  } catch (error) {
    console.log(error);
  }
};

export const getVideoById = (videoId) => {
  try {
    const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;

    return getCommonVideos(URL);
  } catch (error) {
    console.log(error);
  }
};
