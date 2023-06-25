// @ts-ignore
FastClick.attach(document.querySelector("#app"));

(async () => {
  console.log(
    `参考地址： https://y.music.163.com/m/song?id=1415594585&fromSimiSong=1 ;`
  );

  const bindingHeader = function bindingHeader(data) {
    const { userImage, userText } = data;
    const theImage = document.querySelector(".header-left img");
    // @ts-ignore
    theImage.src = userImage;
    const theDiv = document.querySelector(".header-left div");
    // @ts-ignore
    theDiv.innerHTML = userText;
  };
  const loadingBox = document.querySelector(".loading-box");
  try {
    // @ts-ignore
    loadingBox.style.display = "flex";
    const { code, message, userImage, userText } = await MyAPI.getTitleInfo();
    if (code !== 200) {
      console.log(`message-->`, message);
      return;
    }
    bindingHeader({ userImage, userText });
  } catch (error) {
    console.log(`error:-->`, error);
  } finally {
    // @ts-ignore
    loadingBox.style.display = "none";
  }

  let theMusicTextList = [];

  const bindLyric = function bindLyric(lyric) {
    let arr = [];
    lyric.replace(
      /\[(?<minutes>\d+):(?<seconds>\d+).(?<millisecond>\d+)\](?<text>[^\n]+)\n/g,
      (_, $1, $2, $3, $4) => {
        // console.log(_, $1, $2, $3, $4);
        const item = {
          minutes: $1,
          seconds: $2,
          millisecond: $3,
          text: $4,
        };
        arr.push(item);
      }
    );
    // console.log(`arr-->`, arr);
    let theString = ``;
    arr.forEach(({ minutes, seconds, millisecond, text }) => {
      theString += `<p minutes="${minutes}" seconds="${seconds}" millisecond="${millisecond}">
        ${text}
      </p>`;
    });
    const contentBox = document.querySelector(".content-box");
    // @ts-ignore
    contentBox.innerHTML = theString;

    theMusicTextList = [...contentBox.querySelectorAll("p")];
    // console.log(`theMusicTextList-->`, theMusicTextList);
  };
  const bindingMusic = function bindingMusic(data) {
    // @ts-ignore
    const { lyric, time, musicName, musicUrl, imageUrl } = data;

    const theBackground = document.querySelector(".the-background");
    // @ts-ignore
    theBackground.style.backgroundImage = `url(${imageUrl})`;
    // console.log(`theBackground-->`, theBackground);

    const discImage = document.querySelector(".background-disc img");
    // @ts-ignore
    discImage.src = imageUrl;

    const mainTitle = document.querySelector(".main-title");
    // @ts-ignore
    mainTitle.innerHTML = musicName;

    const theAudio = document.querySelector(".the-audio");
    // @ts-ignore
    theAudio.src = musicUrl;

    bindLyric(lyric);
  };
  try {
    // @ts-ignore
    loadingBox.style.display = "flex";
    const { code, message, lyric, time, musicName, musicUrl, imageUrl } =
      await MyAPI.getMusicInfo();
    if (code !== 200) {
      console.log(`message-->`, message);

      return;
    }
    bindingMusic({ lyric, time, musicName, musicUrl, imageUrl });
  } catch (error) {
    console.log(`error:-->`, error);
  } finally {
    // @ts-ignore
    loadingBox.style.display = "none";
  }

  let timer = null;
  const handlePlayEnd = function handlePlayEnd() {
    const backgroundDisc = document.querySelector(".background-disc");
    if (timer) {
      clearInterval(timer);
      timer = null;
    }

    backgroundDisc.style.transform = `rotate(0deg)`;
    theMusicTextList.forEach((item) => item.classList.remove("active"));

    const contentBox = document.querySelector(".content-box");
    contentBox.style.transform = `translateY(${-0}px)`;

    const barCurrent = document.querySelector(".bar-current");
    barCurrent.innerHTML = `00:00.000`;
    const barDuration = document.querySelector(".bar-duration");
    barDuration.innerHTML = `00:00.000`;
    const barAlready = document.querySelector(".bar-already");
    barAlready.style.width = `0%`;
  };
  const handleMusicText = function handleMusicText() {
    const theAudio = document.querySelector(".the-audio");

    let { currentTime, duration } = theAudio;
    if (isNaN(currentTime) || isNaN(duration)) {
      return;
    }
    if (currentTime >= duration) {
      handlePlayEnd();
    }

    const backgroundDisc = document.querySelector(".background-disc");
    backgroundDisc.style.transform = `rotate(${Math.floor(
      currentTime * 20
    )}deg)`;
    const handleFormat = (time) => {
      let minutes = Math.floor(time / 60);
      minutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      let seconds = Math.floor((time - 60 * minutes) % 60);
      seconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      let millisecond = (time % 1).toFixed(3).slice(2);
      return { minutes, seconds, millisecond };
    };
    let {
      minutes: currentMinutes,
      seconds: currentSeconds,
      millisecond: currentMillisecond,
    } = handleFormat(currentTime);
    const barCurrent = document.querySelector(".bar-current");
    barCurrent.innerHTML = `${currentMinutes}:${currentSeconds}.${currentMillisecond}`;
    let {
      minutes: durationMinutes,
      seconds: durationSeconds,
      millisecond: durationMillisecond,
    } = handleFormat(duration);
    const barDuration = document.querySelector(".bar-duration");
    barDuration.innerHTML = `${durationMinutes}:${durationSeconds}.${durationMillisecond}`;

    let ratio = Math.round((currentTime / duration) * 100);
    // ratio = ratio < 0 ? 0 : ratio > 100 ? 100 : ratio;
    if (ratio <= 0) {
      ratio = 0;
    }
    if (ratio >= 100) {
      ratio = 100;
    }
    const barAlready = document.querySelector(".bar-already");
    barAlready.style.width = `${ratio}%`;

    // console.log(currentTime, duration);
    let activeList = theMusicTextList.filter((item) => {
      let minutes = item.getAttribute("minutes");
      let seconds = item.getAttribute("seconds");
      let millisecond = item.getAttribute("millisecond");

      return (
        minutes === currentMinutes &&
        seconds === currentSeconds &&
        Math.abs(+currentMillisecond - +millisecond) < 300
      );
    });

    if (!activeList?.length) {
      return;
    }
    theMusicTextList.forEach((item) => item.classList.remove("active"));
    activeList.forEach((item) => item.classList.add("active"));

    let index = theMusicTextList.findIndex((item) =>
      Array.from(item.classList).includes("active")
    );
    let offset = theMusicTextList[index].offsetTop - 25;
    const contentBox = document.querySelector(".content-box");
    contentBox.style.transform = `translateY(${-offset}px)`;
  };
  const handlePlayer = function handlePlayer(ev) {
    const theAudio = document.querySelector(".the-audio");
    const musicPlayer = document.querySelector(".music-player");
    ev.stopPropagation();

    if (theAudio?.paused) {
      theAudio.play();
      musicPlayer.style.display = "none";
      // ev.stopPropagation()

      handleMusicText();
      if (!timer) {
        timer = setInterval(handleMusicText, 10);
      }
      return;
    }

    theAudio.pause();
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    musicPlayer.style.display = "block";
  };
  // const musicPlayer = document.querySelector(".music-player");
  // musicPlayer.addEventListener('click',handlePlayer)
  const mainPlayer = document.querySelector(".main-player");
  mainPlayer.addEventListener("click", handlePlayer);

  const theAudio = document.querySelector(".the-audio");
  theAudio.addEventListener("ended", handlePlayEnd);
  const handleAudioPlay = function handleAudioPlay(ev) {
    const musicPlayer = document.querySelector(".music-player");
    musicPlayer.style.display = "none";
    // ev.stopPropagation()

    handleMusicText();
    if (!timer) {
      timer = setInterval(handleMusicText, 10);
    }
  };
  theAudio.addEventListener("play", handleAudioPlay);
  const handleAudioPaused = function handleAudioPaused(ev) {
    const musicPlayer = document.querySelector(".music-player");
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    musicPlayer.style.display = "block";
  };
  theAudio.addEventListener("pause", handleAudioPaused);
})();
