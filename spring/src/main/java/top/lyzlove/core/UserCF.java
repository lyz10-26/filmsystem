package top.lyzlove.core;

import top.lyzlove.DataTransferObject.RelateDTO;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class UserCF {
    /**
     * @param userId 当前用户
     * @param list   用户电影评分数据
     * @return {@link List <Integer>}
     * @author lyz
     * @DATE 2023-05-06 18:35
     * 方法描述: 推荐电影id列表
     */
    public static List<Integer> recommend(Integer userId, List<RelateDTO> list) {
        //按用户分组
        Map<Integer, List<RelateDTO>> userMap = list.stream().collect(Collectors.groupingBy(RelateDTO::getUseId));
        //获取其他用户与当前用户的关系值
        Map<Integer, Double> userDisMap = CoreMath.computeNeighbor(userId, userMap, 0);
        //获取关系最近的用户
        double maxValue = Collections.max(userDisMap.values());
        Set<Integer> userIds = userDisMap.entrySet().stream().filter(e -> e.getValue() == maxValue).map(Map.Entry::getKey).collect(Collectors.toSet());
        //取关系最近的用户
        Integer nearestUserId = userIds.stream().findAny().orElse(null);
        if (nearestUserId == null) {
            return Collections.emptyList();
        }
        //最近邻用户看过电影列表
        List<Integer> neighborItems = userMap.get(nearestUserId).stream().map(RelateDTO::getItemId).collect(Collectors.toList());
        //指定用户看过电影列表
        List<Integer> userItems = userMap.get(userId).stream().map(RelateDTO::getItemId).collect(Collectors.toList());
        //找到最近邻看过，但是该用户没看过的电影
        neighborItems.removeAll(userItems);
        return neighborItems;
    }
}
