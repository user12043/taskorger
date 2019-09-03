package ogr.user12043.taskorger.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

/**
 * Created on 11.06.2019 - 16:09
 * part of taskorger
 *
 * @author user12043
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "t_column")
public class Column extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String name;

    private Byte ordinal;

    @NotNull
    private Integer columnLimit;

    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "column", orphanRemoval = true)
    private Set<Task> tasks;
}
