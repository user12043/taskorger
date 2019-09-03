package ogr.user12043.taskorger.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

/**
 * Created on 27.06.2019 - 23:19
 * part of taskorger
 *
 * @author user12043
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "t_announcement")
public class Announcement extends BaseEntity {
    @NotNull
    private String content;
}
