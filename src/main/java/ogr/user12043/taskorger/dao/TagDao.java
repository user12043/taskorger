package ogr.user12043.taskorger.dao;

import ogr.user12043.taskorger.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created on 12.06.2019 - 23:32
 * part of taskorger
 *
 * @author user12043
 */
@RepositoryRestResource(collectionResourceRel = "tags", path = "tag")
public interface TagDao extends JpaRepository<Tag, Long> {

}
