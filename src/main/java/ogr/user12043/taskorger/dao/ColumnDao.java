package ogr.user12043.taskorger.dao;

import ogr.user12043.taskorger.model.Column;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created on 12.06.2019 - 21:42
 * part of taskorger
 *
 * @author user12043
 */
@RepositoryRestResource(collectionResourceRel = "columns", path = "column")
public interface ColumnDao extends JpaRepository<Column, Long> {

}
