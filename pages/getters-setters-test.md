# Generic getters & setters test

In the good old days, before Lombok and the likes, we created vast amounts
of domain model classes which contained a lot of getters and setters.

Getting a test score of 100% on the domain model package used to be quite
some work, during that time, I created a getters and setters test that tested
(like its name suggests) all getters and setters of the domain model classes.

```
import static org.junit.Assert.assertEquals;

import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;

import org.junit.Test;

/**
 * This class tests all the getters and setters for the listed domain objects.
 */
public class GettersAndSettersTest {

  @SuppressWarnings("rawtypes")
  private static Class[] domainClasses = {ClassA.class, ClassB.class, etc..};
  
  @Test
  @SuppressWarnings("rawtypes")
  public void shouldTestAllGettersAndSetters() {
  
    for (Class clazz : domainClasses) {
      Method[] methods = clazz.getMethods();
  
      try {
        Object instance = clazz.newInstance();
  
        for (Method method : methods) {
          if (method.getName().startsWith("set")) {
            Class<?>[] parameterTypes = method.getParameterTypes();
  
            String getterName = "get" + method.getName().substring(3);
  
            Object newParameter;
            if (parameterTypes[0] == Calendar.class) {
              newParameter = new GregorianCalendar();
            }
            else if (parameterTypes[0] == BigDecimal.class) {
              newParameter = new BigDecimal("0");
            }
            else if (parameterTypes[0] == List.class) {
              newParameter = new ArrayList<Object>();
            }
            else if (parameterTypes[0] == Integer.class || parameterTypes[0].getName().equals("int")) {
              newParameter = new Integer(1);
            }
            else if (parameterTypes[0] == Long.class || parameterTypes[0].getName().equals("long")) {
              newParameter = new Long(1);
            }
            else if (parameterTypes[0].getName().equals("boolean")) {
              newParameter = new Boolean(true);
              getterName = "is" + method.getName().substring(3);
            }
            else if (parameterTypes[0] == SomeCustomEnum.class) {
              newParameter = SomeCustomEnum.VALUE_A;
            }
            else {
              newParameter = parameterTypes[0].newInstance();
            }
            method.invoke(instance, newParameter);
  
            Method getter = clazz.getMethod(getterName);
  
            Object returnedObject = getter.invoke(instance);
  
            assertEquals(newParameter, returnedObject);
          }
        }
      }
      catch (Exception e) {
        // Ok we can't test this class, skip
        e.printStackTrace();
        continue;
      }
    }
  }
}
```