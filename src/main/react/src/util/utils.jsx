/**
 * Created on 28.06.2019 - 15:33
 * part of taskorger
 * @author user12043
 */

import constants from "./constants";

export function handleFetchError(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export function apiReq(path, callback, options, error, notEmbedded) {
  fetch(notEmbedded ? path : constants.API_ROOT + path, {
    ...options,
    ...{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }
  })
    .then(handleFetchError)
    .then(response => {
      if (response.status === 201 || response.status === 204) {
        return response.text();
      } else {
        return response.json();
      }
    })
    .then(data => {
      callback(notEmbedded ? data : data._embedded);
    })
    .catch(response => {
      if (error) {
        error(response);
      } else {
        // TODO show global alert
      }
    });
}

export function getSelfLink(entityObject) {
  const url = entityObject._links.self.href;
  return url.substr(url.lastIndexOf("api/") + 4);
}

export function getIdFromSelfLink(entityObject) {
  const selfLink = getSelfLink(entityObject);
  return +selfLink.substr(selfLink.lastIndexOf("/") + 1);
}

export function isAdmin() {
  // eslint-disable-next-line no-debugger
  return (
    localStorage.getItem(constants.LOGGED_USER) &&
    +JSON.parse(localStorage.getItem(constants.LOGGED_USER)).role ===
      constants.ROLES.ADMIN
  );
}
