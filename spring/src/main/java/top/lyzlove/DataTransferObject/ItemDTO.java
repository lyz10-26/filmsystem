package top.lyzlove.DataTransferObject;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author lyz
 * @Date 2023-05-06 16:58
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemDTO {

    /** 主键 */
    private Integer id;
    /** 名称 */
    private String name;
    /** 日期 */
    private String date;
    /** 链接 */
    private String link;
}
