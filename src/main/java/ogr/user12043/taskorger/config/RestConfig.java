package ogr.user12043.taskorger.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;

import javax.persistence.EntityManager;

/**
 * Created on 31.08.2019 - 19:28
 * part of taskorger
 *
 * @author user12043
 */
@Configuration
@EnableJpaAuditing
public class RestConfig implements RepositoryRestConfigurer {
    private final EntityManager entityManager;

    public RestConfig(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        // expose ids for all entities
        entityManager.getMetamodel().getEntities().forEach((entityType -> config.exposeIdsFor(entityType.getJavaType())));
    }
}
