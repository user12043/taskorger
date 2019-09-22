package ogr.user12043.taskorger.dao;

import ogr.user12043.taskorger.model.Announcement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * Created on 27.06.2019 - 23:22
 * part of taskorger
 *
 * @author user12043
 */
@RepositoryRestResource(collectionResourceRel = "announcements", path = "announcement")
public interface AnnouncementDao extends JpaRepository<Announcement, Long> {

}
