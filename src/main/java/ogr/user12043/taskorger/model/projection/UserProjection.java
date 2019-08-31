package ogr.user12043.taskorger.model.projection;

import ogr.user12043.taskorger.model.User;
import org.springframework.data.rest.core.config.Projection;

/**
 * Created on 31.08.2019 - 19:49
 * part of taskorger
 *
 * @author user12043
 */
@Projection(name = "relatedUser", types = User.class)
public interface UserProjection {
    Long getId();

    String getName();

    String getUsername();
}
