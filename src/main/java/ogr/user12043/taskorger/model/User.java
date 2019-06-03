package ogr.user12043.taskorger.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Created on 2.06.2019 - 12:02
 * part of taskorger
 *
 * @author user12043
 */
@Data
@Entity
@Table(name = "t_user")
public class User {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String userName;
    private String password;
}
