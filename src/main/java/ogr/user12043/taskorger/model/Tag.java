package ogr.user12043.taskorger.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.awt.*;
import java.util.Date;
import java.util.Set;

/**
 * Created on 11.06.2019 - 15:29
 * part of taskorger
 *
 * @author user12043
 */
@Data
@Entity
@Table(name = "t_tag")
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Color color;

    @NotNull
    private Date createDate;

    @NotNull
    private Date updateDate = new Date();

    @ManyToMany
    @JsonIgnore
    private Set<Task> tasks;
}
