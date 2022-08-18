export default async function Api(url, data = {}) {
  try {
    if (!data.headers) data.headers = {};


    if (localStorage.getItem("access_token")) {
      data["headers"]["Authorization"] =
        "Bearer " + localStorage.getItem("access_token");
    }
    const response = await fetch("https://api.pominkizal.ru" + url, data);
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  } catch (err) {
    return Promise.reject(err);
  }
}
