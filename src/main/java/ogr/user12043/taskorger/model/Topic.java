package ogr.user12043.taskorger.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

/**
 * Created on 11.06.2019 - 15:28
 * part of taskorger
 *
 * @author user12043
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "t_topic")
public class Topic extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(unique = true)
    private String name;

    private String foreground;

    private String background;

    @OneToMany(mappedBy = "topic")
    @JsonIgnore
    private Set<Task> tasks;
}
