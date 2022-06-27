export default class VideoComponent {
  constructor() {
    this.videoWrappers = document.querySelectorAll('.js-video-wrapper');

    this.init();
  }

  init() {
    this.videoWrappers.forEach(wrapper => {
      this.initHTML5Video(wrapper);
      this.initYoutubeVideo(wrapper);
    });
  }

  initHTML5Video(videoWrapper) {
    const video = videoWrapper.querySelector('.js-video');
    const buttonPlay = videoWrapper.querySelector('.js-video-play');

    if (!video) return;

    const togglePlay = () => {
      if (video.paused || video.ended) {
        video.play();
        videoWrapper.classList.add('is-active');
      } else {
        video.pause();
        videoWrapper.classList.remove('is-active');
      }
    }

    buttonPlay.addEventListener('click', togglePlay);
  }

  initYoutubeVideo(videoWrapper) {
    const video = videoWrapper.querySelector('.js-video-youtube');
    const buttonPlay = videoWrapper.querySelector('.js-video-play');

    if (!video) return;

    window.onYouTubeIframeAPIReady = function() {
      const videoId = video.getAttribute('data-youtube-id');
      let videoIsReady = false;

      const player = new YT.Player(video, {
        videoId: videoId,
        playerVars: {},
        events: {
          onReady: function (event) {
            videoIsReady = true;
          },
          onStateChange: function (event) {
            // On video end
            if (event.data == 0) {
              videoWrapper.classList.remove('is-active');
              videoWrapper.classList.remove('hide-btn-play');
            }
          }
        }
      });

      buttonPlay.addEventListener('click', (event) => {
        event.preventDefault();

        videoWrapper.classList.add('is-active');
        videoWrapper.classList.add('hide-btn-play');

        if (videoIsReady) {
          player.playVideo();
        }
      });
    }
  }
}

new VideoComponent()
