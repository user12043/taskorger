package ogr.user12043.taskorger.dao;

import ogr.user12043.taskorger.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created on 12.06.2019 - 23:34
 * part of taskorger
 *
 * @author user12043
 */
@RepositoryRestResource(collectionResourceRel = "topic", path = "topic")
public interface TopicDao extends JpaRepository<Topic, Long> {

}
