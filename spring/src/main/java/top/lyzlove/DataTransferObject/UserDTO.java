package top.lyzlove.DataTransferObject;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author lyz
 * @DATE 2023-05-06 16:57
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

    /** 主键 */
    private Integer id;
    /** 年纪 */
    private Integer age;
    /** 性别 */
    private String sex;
    /** 职业 */
    private String profession;
    /** 邮编 */
    private String postcode;
}
