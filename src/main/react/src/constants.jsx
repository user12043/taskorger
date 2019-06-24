/**
 * Created on 18.06.2019 - 00:24
 * part of taskorger
 * @author user12043
 */

class constants {
  // static APP_CONTEXT = "taskorger/";
  static APP_CONTEXT = "/";
  static ROOT_ELEMENT_ID = "root";
  static API_ROOT = this.APP_CONTEXT + "api/";
  static ROUTES = {
    ANNOUNCEMENTS: "/announcements",
    TASKS: "/tasks",
    NOTE_SRC: "/note-src",
    SETTINGS: "/settings"
  }
}

Object.freeze(constants);

export default constants;