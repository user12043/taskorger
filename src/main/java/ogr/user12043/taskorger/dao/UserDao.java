package ogr.user12043.taskorger.dao;

import ogr.user12043.taskorger.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;

/**
 * Created on 2.06.2019 - 13:34
 * part of taskorger
 *
 * @author user12043
 */
@RepositoryRestResource(collectionResourceRel = "user", path = "user")
public interface UserDao extends JpaRepository<User, Long> {
    List<User> findUserByName(@Param("name") String name);

    List<User> findByUsernameAndPassword(@Param("username") String username, @Param("password") String password);

    @RestResource(exported = false)
    List<User> findByRole(Byte role);
}
