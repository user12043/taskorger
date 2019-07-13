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

export function apiReq(path, callback, options, error, notEmbedded) {
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
      if (error) {
        error(response);
      } else {
        alert("fetching failed!: " + response.message);
      }
    });
}

export function getSelfLink(entityObject) {
  let url = entityObject["_links"]["self"]["href"];
  return url.substr(url.lastIndexOf("api/") + 4);
}

export function getIdFromSelfLink(entityObject) {
  let selfLink = getSelfLink(entityObject);
  return +selfLink.substr(selfLink.lastIndexOf("/") + 1);
}
