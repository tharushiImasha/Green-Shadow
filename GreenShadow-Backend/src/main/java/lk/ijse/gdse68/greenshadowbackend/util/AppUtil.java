package lk.ijse.gdse68.greenshadowbackend.util;

import java.util.Base64;
import java.util.UUID;

public class AppUtil {
   public static String toBase64image(byte[] image){
        return Base64.getEncoder().encodeToString(image);
   }

}
