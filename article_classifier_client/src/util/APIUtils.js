import { API_BASE_URL } from "../constants/constant";

const request = options => {
  const headers = new Headers({
    "Content-Type": "application/json"
  });

  const defaults = { headers: headers };
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options).then(response =>
    response.json().then(json => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};

export function getArticleCategory(articleRequest) {
  return request({
      url: API_BASE_URL + "/article/category",
      method: 'POST',
      contentType: "application/json",
      body: JSON.stringify(articleRequest)
  });
}

export function getCategoryList() {
  return request({
      url: API_BASE_URL + "/article/categories",
      method: 'GET',
      contentType: "application/json"
  });
}




