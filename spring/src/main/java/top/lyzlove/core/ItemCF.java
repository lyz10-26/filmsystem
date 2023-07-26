package top.lyzlove.core;

import top.lyzlove.DataTransferObject.RelateDTO;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class ItemCF {
    /**
     * @param itemId 当前电影id
     * @param list   用户电影评分数据
     * @return {@link List <Integer>}
     * @author lyz
     * @DATE 2023-05-06 18:34
     * 方法描述: 推荐电影id列表
     */
    public static List<Integer> recommend(Integer itemId, List<RelateDTO> list) {
        //按物品分组
        Map<Integer, List<RelateDTO>> itemMap = list.stream().collect(Collectors.groupingBy(RelateDTO::getItemId));
        //获取其他物品与当前物品的关系值
        Map<Integer, Double> itemDisMap = CoreMath.computeNeighbor(itemId, itemMap, 1);
        //获取关系最近物品
        double maxValue = Collections.max(itemDisMap.values());
        return itemDisMap.entrySet().stream().filter(e -> e.getValue() == maxValue).map(Map.Entry::getKey).collect(Collectors.toList());
    }
}
