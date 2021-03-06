package ogr.user12043.taskorger.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.util.Set;

/**
 * Created on 2.06.2019 - 12:02
 * part of taskorger
 *
 * @author user12043
 */
@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "t_user")
public class User extends BaseEntity {
    private String name;

    @NotNull
    @Column(unique = true)
    @Length(max = 30)
    private String username;

    @NotNull
//    @JsonIgnore // This ignores both reading and writing
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private Byte role;

    @ManyToMany(mappedBy = "assignees")
    @JsonIgnore
    private Set<Task> tasks;
}
