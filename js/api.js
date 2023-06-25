const theResult = {
  code: 200,
  message: "成功",
  lyric:
    "[00:00.000] 作词 : Pt.Zou\n[00:01.000] 作曲 : Pt.Zou\n[00:09.032]I will run, I will climb, I will soar,\n[00:13.041]I’m undefeated，\n[00:17.051]迎着痛把眼中所有梦\n[00:21.061]都交给时间，\n[00:23.822]想飞就用心地去飞，\n[00:27.081]谁不经历狼狈，\n[00:31.843]So I’ll dream, until I make it real, and all I see is stars，\n[00:39.110]我的梦说别停留等待，\n[00:43.874]When your dreams come alive you’re unstoppable，\n[00:47.634]映出心中最想拥有的彩虹，\n[00:51.897]We will glow in the dark turning dust to gold,\n[00:55.654]因为你\n[00:58.913]it possible\n[01:07.188]possible\n[01:16.718]执着地勇敢地不回头，\n[01:20.980]Until I’m breaking, until I’m breaking，\n[01:24.739]Out of my cage, like a bird in the night,\n[01:28.750]总会有一天站在你身边，\n[01:32.260]泪就让它往下坠，\n[01:34.767]溅起伤口的美，\n[01:39.280]And if it takes, takes a thousand lives,\n[01:43.297]Then it’s worth fighting for，\n[01:46.805]It's not until you fall that you fly,\n[01:51.819]就让光芒折射泪湿的瞳孔，\n[01:55.328]映出心中最想拥有的彩虹，\n[01:59.341]带我奔向那片有你的天空，\n[02:03.353]因为你\n[02:06.611]it possible possible\n[02:14.883]possible possible，\n[02:23.659]世界会怎么变化，\n[02:25.917]都不是意外，\n[02:27.674]Never quit and never stop,\n[02:30.179]The rest of our lives,\n[02:31.683]世界会怎么变化，\n[02:33.940]都离不开爱，\n[02:35.695]Never quit and never stop,\n[02:38.703]It's not until you fall that you fly,\n[02:45.222]就让光芒折射泪湿的瞳孔，\n[02:48.981]映出心中最想拥有的彩虹，\n[02:53.244]带我奔向那片有你的天空，\n[02:57.005]因为你\n[03:00.263]it possible possible\n[03:08.537]possible possible\n[03:13.803]We’ll dream it possible（是我的梦）\n",
  time: "03:37.000",
  musicName: "Dream It Possible&我的梦（Pt.Zou Mashup)",
  musicUrl: "./image/华为我的梦.m4a",
  imageUrl: "./image/109951166557039575.png",
};
const result = {
  code: 200,
  message: "成功",
  userImage: "./image/user.jpeg",
  userText: "你知道这首歌居然被这么评论？",
}
const MyAPI = {
  getTitleInfo(data=result){
    return new Promise((resolve, reject) => {
      setInterval(() => {
        resolve(JSON.parse(JSON.stringify(data)));
      }, 100 + Math.floor(Math.random() * 200));
    });
  },
  getMusicInfo(data = theResult) {
    return new Promise((resolve, reject) => {
      setInterval(() => {
        resolve(JSON.parse(JSON.stringify(data)));
      }, 100 + Math.floor(Math.random() * 200));
    });
  },
};
