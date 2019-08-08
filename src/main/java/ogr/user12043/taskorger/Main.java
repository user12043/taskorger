package ogr.user12043.taskorger;

import ogr.user12043.taskorger.dao.UserDao;
import ogr.user12043.taskorger.model.User;
import ogr.user12043.taskorger.utils.UserRoles;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

import java.util.Date;
import java.util.List;

/**
 * Created on 2.06.2019 - 12:17
 * part of taskorger
 *
 * @author user12043
 */
@SpringBootApplication
public class Main {
    private final UserDao userDao;

    public Main(UserDao userDao) {
        this.userDao = userDao;
    }

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    // Create administrator user if none exists
    @EventListener(ApplicationReadyEvent.class)
    public void afterStart() {
        final List<User> admins = userDao.findByRole((byte) UserRoles.USER.ordinal());
        if (admins.isEmpty()) {
            User adminUser = new User();
            adminUser.setName("admin");
            adminUser.setPassword("admin");
            adminUser.setUsername("admin");
            adminUser.setCreateDate(new Date());
            adminUser.setRole((byte) UserRoles.ADMIN.ordinal());
            userDao.saveAndFlush(adminUser);
        }
    }
}
