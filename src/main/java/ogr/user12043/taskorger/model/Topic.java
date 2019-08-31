package ogr.user12043.taskorger.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.Set;

/**
 * Created on 11.06.2019 - 15:28
 * part of taskorger
 *
 * @author user12043
 */
@Data
@Entity
@Table(name = "t_topic")
public class Topic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(unique = true)
    private String name;

    private String foreground;

    private String background;

    @NotNull
    private Date createDate;

    @NotNull
    private Date updateDate = new Date();

    @OneToMany(mappedBy = "topic")
    @JsonIgnore
    private Set<Task> tasks;
}
