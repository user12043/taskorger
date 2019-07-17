package ogr.user12043.taskorger.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * Created on 27.06.2019 - 23:19
 * part of taskorger
 *
 * @author user12043
 */
@Data
@Entity
@Table(name = "t_announcement")
public class Announcement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String content;

    @NotNull
    private Date createDate;

    @NotNull
    private Date updateDate = new Date();
}
