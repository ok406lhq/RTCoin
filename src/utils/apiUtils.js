/// 查询正在上映的电影
export function queryMovies(city, start, count) {
  return "https://api.douban.com/v2/movie/in_theaters?city=" + city + "&start=" + start + "&count=" + count
}

/// 查询即将上映的电影
export function comingMovies(city, start, count) {
  return "https://api.douban.com/v2/movie/coming_soon?city=" + city + "&start=" + start + "&count=" + count
}

export const newsUrl = "https://v.juhe.cn/toutiao/index?key=1a52343f75501c9e0988e66bcb45d58e";
