package ogr.user12043.taskorger.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.Set;

/**
 * Created on 11.06.2019 - 15:26
 * part of taskorger
 *
 * @author user12043
 */
@Data
@Entity
@Table(name = "t_task")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String header;

    @NotNull
    private String content;

    private Byte priority;  // 0, 1, 2 - LOW, NORMAL, HIGH

    private Date deadline;

    private Byte status;    // 0, 1, 2 - ONGOING, COMPLETED, CANCELLED

    @NotNull
    private Date createDate;

    @NotNull
    private Date updateDate = new Date();

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
