/**
 * Created on 28.06.2019 - 15:33
 * part of taskorger
 * @author user12043
 */

import constants from "./constants"

export function handleFetchError(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export function apiReq(path, callback) {
  fetch(constants.API_ROOT + path)
    .then(handleFetchError)
    .then((response) => response.json())
    .then((data) => callback(data))
    .catch((response) => {
      alert("fetching failed!: " + response.message);
    });
}
