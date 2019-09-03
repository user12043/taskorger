package ogr.user12043.taskorger.model;

import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;

/**
 * Created on 3.09.2019 - 21:36
 * part of taskorger
 *
 * @author user12043
 */
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Data
class BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @CreatedDate
    private Date createDate;

    @LastModifiedDate
    private Date updateDate;
}
