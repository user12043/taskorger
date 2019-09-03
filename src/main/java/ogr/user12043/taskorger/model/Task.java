package ogr.user12043.taskorger.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.Set;

/**
 * Created on 11.06.2019 - 15:26
 * part of taskorger
 *
 * @author user12043
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "t_task")
public class Task extends BaseEntity {
    private String header;

    @NotNull
    private String content;

    private Byte priority;  // 0, 1, 2 - LOW, NORMAL, HIGH

    private Date deadline;

    private Byte status;    // 0, 1, 2 - ONGOING, COMPLETED, CANCELLED

    @ManyToOne
    private Topic topic;

    @ManyToMany
    private Set<User> assignees;

    @NotNull
    @ManyToOne(targetEntity = Column.class)
    private Column column;

    @ManyToMany(mappedBy = "tasks")
    private Set<Tag> tags;
}
