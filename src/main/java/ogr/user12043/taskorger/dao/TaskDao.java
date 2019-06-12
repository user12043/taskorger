package ogr.user12043.taskorger.dao;

import ogr.user12043.taskorger.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created on 12.06.2019 - 23:33
 * part of taskorger
 *
 * @author user12043
 */
@RepositoryRestResource(collectionResourceRel = "task", path = "task")
public interface TaskDao extends JpaRepository<Task, Long> {

}
