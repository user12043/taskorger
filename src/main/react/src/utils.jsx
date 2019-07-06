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

export function apiReq(path, callback, options, notEmbedded) {
  fetch((notEmbedded) ? path : (constants.API_ROOT) + path, {
      ...options, ...{
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      }
    }
  )
    .then(handleFetchError)
    .then((response) => {
      if (response.status === 201 || response.status === 204) {
        return response.text();
      } else {
        return response.json();
      }
    })
    .then((data) => {
      callback((notEmbedded) ? data : (data["_embedded"]))
    })
    .catch((response) => {
      alert("fetching failed!: " + response.message);
    });
}

export function getSelfLink(entityObject) {
  return entityObject["_links"]["self"]["href"];
}
