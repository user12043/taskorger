package ogr.user12043.taskorger.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.Set;

/**
 * Created on 11.06.2019 - 16:09
 * part of taskorger
 *
 * @author user12043
 */
@Data
@Entity
@Table(name = "t_column")
public class Column {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String name;
    private Byte ordinal;
    @NotNull
    private Integer columnLimit;
    @NotNull
    private Date createDate;
    @NotNull
    private Date updateDate = new Date();
    @OneToMany(cascade = CascadeType.REMOVE, mappedBy = "column", orphanRemoval = true)
    private Set<Task> tasks;
}
