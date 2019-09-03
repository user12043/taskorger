package ogr.user12043.taskorger.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.Set;

/**
 * Created on 11.06.2019 - 15:29
 * part of taskorger
 *
 * @author user12043
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "t_tag")
public class Tag extends BaseEntity {
    private String name;

    private String color;

    @ManyToMany
    @JsonIgnore
    private Set<Task> tasks;
}
