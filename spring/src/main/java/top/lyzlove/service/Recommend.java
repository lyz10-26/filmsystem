package top.lyzlove.service;

import top.lyzlove.DataTransferObject.ItemDTO;
import top.lyzlove.DataTransferObject.RelateDTO;
import top.lyzlove.core.ItemCF;
import top.lyzlove.core.UserCF;

import java.util.List;
import java.util.stream.Collectors;

public class Recommend {
    /**
     * @param userId 用户id
     * @author lyz
     * @date 2023-05-06 16:21
     * 方法描述: 猜你喜欢
     * @Return {@link List<ItemDTO>}
     */
    public static List<ItemDTO> userCfRecommend(int userId) {
        List<RelateDTO> data = FileDataSource.getData();
        List<Integer> recommendations = UserCF.recommend(userId, data);
        return FileDataSource.getItemData().stream().filter(e -> recommendations.contains(e.getId())).collect(Collectors.toList());
    }


    /**
     * 方法描述: 猜你喜欢
     *
     * @param itemId 物品id
     * @Return {@link List<ItemDTO>}
     * @author lyz
     * @date 2023-05-06 16:21
     */
    public static List<ItemDTO> itemCfRecommend(int itemId) {
        List<RelateDTO> data = FileDataSource.getData();
        List<Integer> recommendations = ItemCF.recommend(itemId, data);
        return FileDataSource.getItemData().stream().filter(e -> recommendations.contains(e.getId())).collect(Collectors.toList());
    }
}
