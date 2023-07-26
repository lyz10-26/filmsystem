package top.lyzlove.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import top.lyzlove.DataTransferObject.ItemDTO;
import top.lyzlove.common.Result;
import top.lyzlove.service.Recommend;

import java.util.List;

@RestController
@RequestMapping("/recommend")
public class RecommendController {
    /**
     * 推荐模块
     * @author lyz
     * @DATE 2023-05-06 19:34
     */
    @GetMapping("/user/{id}")
    public Result<List<ItemDTO>> recommendUser(@PathVariable int id) {
        System.out.println("------基于用户协同过滤推荐---------------下列电影");
        List<ItemDTO> itemList = Recommend.userCfRecommend(id);
        System.out.println(itemList);
        return Result.success(itemList);


    }

    @GetMapping("/film/{id}")
    public Result<List<ItemDTO>> recommendFilm(@PathVariable int id) {
        System.out.println("------基于物品协同过滤推荐---------------下列电影");
        List<ItemDTO> itemList1 = Recommend.itemCfRecommend(id);
        System.out.println(itemList1);
        return Result.success(itemList1);
    }
}
