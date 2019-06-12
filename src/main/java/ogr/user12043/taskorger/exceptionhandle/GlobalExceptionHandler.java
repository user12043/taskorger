package ogr.user12043.taskorger.exceptionhandle;

import ogr.user12043.taskorger.utils.Constants;
import org.springframework.core.convert.ConversionFailedException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.servlet.http.HttpServletRequest;

/**
 * Created on 12.06.2019 - 22:02
 * part of taskorger
 *
 * @author user12043
 */
@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler({EmptyResultDataAccessException.class})
    public ResponseEntity recordNotFound(HttpServletRequest request, EmptyResultDataAccessException e) {
        return new ResponseEntity<>("No such field", HttpStatus.NO_CONTENT);
    }

    // ConversionFailedException throws when received a request like "http://.../api/<path>/<any_string>"
    // must be "http://.../api/<path>/<id>" normally.
    // e.g. "http://.../api/user/12" return user with id 12
    // should return 400
    @ExceptionHandler({ConversionFailedException.class})
    public ResponseEntity conversionFailed(HttpServletRequest request, ConversionFailedException e) {
        HttpHeaders headers = new HttpHeaders();
        //redirect to http cats error page
        headers.add("Location", Constants.HTTP_CATS_URI + HttpStatus.BAD_REQUEST.value());
        return new ResponseEntity<>("No such request", headers, HttpStatus.FOUND);
    }
}
