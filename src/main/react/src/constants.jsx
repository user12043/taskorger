/**
 * Created on 18.06.2019 - 00:24
 * part of taskorger
 * @author user12043
 */

class constants {
  static APP_CONTEXT = "/taskorger";
  static ROOT_ELEMENT_ID = "root";
  static API_ROOT = this.APP_CONTEXT + "/api/";
  static ROUTES = {
    ANNOUNCEMENTS: "/announcements",
    TASKS: "/tasks",
    NOTE_SRC: "/note-src",
    SETTINGS: "/settings",
    CONTROL_PANEL: "/control-panel",
    CONTROL_PANEL_SUB: {
      USER_MAN: "/control-panel/user-man",
      ANNOUNCEMENT_MAN: "/control-panel/announcement-man",
      TASK_MAN: "/control-panel/task-man"
    },
    LOGIN: "/login"
  };
  static LOGGED_USER = "loggedUser";
  static USER_ADMIN = "userAdmin";
  static ROLES = {
    USER: 0,
    ADMIN: 1
  }
}

Object.freeze(constants);

export default constants;
