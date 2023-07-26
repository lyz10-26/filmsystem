package top.lyzlove.DataTransferObject;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 关系数据
 * @author lyz
 * @DATE 2023-05-06 16:58
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RelateDTO {

    /** 用户id */
    private Integer useId;
    /** 物品id */
    private Integer itemId;
    /** 指数 */
    private Double index;
}
