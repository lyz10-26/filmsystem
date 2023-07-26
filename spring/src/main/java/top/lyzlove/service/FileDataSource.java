package top.lyzlove.service;

import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import top.lyzlove.DataTransferObject.ItemDTO;
import top.lyzlove.DataTransferObject.RelateDTO;
import top.lyzlove.DataTransferObject.UserDTO;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * 方法描述: 读取基础数据
 * @Return {@link List<RelateDTO>}
 * @author lyz
 * @date 2023-05-06 16:15
 */
@Data
@Slf4j
public class FileDataSource {
    //定义一个文件地址变量
    public static String folderPath;
    static {
        folderPath= Objects.requireNonNull(FileDataSource.class.getResource("/data")).getPath();
    }
    public static List<RelateDTO> getData() {
        List<RelateDTO> relateList = new ArrayList<>();
        try {
            FileInputStream out = new FileInputStream(folderPath+"\\u.data");
            InputStreamReader reader = new InputStreamReader(out, StandardCharsets.UTF_8);
            BufferedReader in = new BufferedReader(reader);
            String line;
            while ((line = in.readLine()) != null) {
                String newline = line.replaceAll("\t", " ");
                String[] ht = newline.split(" ");
                Integer userId = Integer.parseInt(ht[0]);
                Integer movieId = Integer.parseInt(ht[1]);
                Double rating = Double.parseDouble(ht[2]);
                RelateDTO dto = new RelateDTO(userId, movieId, rating);
                relateList.add(dto);
            }
        } catch (IOException e) {
            log.error(e.getMessage());
        }
        return relateList;
    }
    /**
     * 方法描述: 读取用户数据
     *
     * @Return {@link List<UserDTO>}
     * @author lyz
     * @date 2023-05-06 17:21
     */
    public static List<UserDTO> getUserData() {
        List<UserDTO> userList = new ArrayList<>();
        try {
            FileInputStream out = new FileInputStream(folderPath+"\\u.user");
            InputStreamReader reader = new InputStreamReader(out, StandardCharsets.UTF_8);
            BufferedReader in = new BufferedReader(reader);
            String line;
            while ((line = in.readLine()) != null) {
                String newline = line.replaceAll("\t", " ");
                String[] ht = newline.split("\\|");
                Integer id = Integer.parseInt(ht[0]);
                Integer age = Integer.parseInt(ht[1]);
                String sex = ht[2];
                String profession = ht[3];
                String postcode = ht[4];
                UserDTO dto = new UserDTO(id, age, sex, profession, postcode);
                userList.add(dto);
            }
        } catch (IOException e) {
            log.error(e.getMessage());
        }
        return userList;
    }

    /**
     * 方法描述: 读取电影数据
     *
     * @Return {@link List<ItemDTO>}
     * @author lyz
     * @date 2023-05-06 17:32
     */
    public static List<ItemDTO> getItemData() {
        List<ItemDTO> itemList = new ArrayList<>();
        try {
            FileInputStream out = new FileInputStream(folderPath+"\\u.item");
            InputStreamReader reader = new InputStreamReader(out, StandardCharsets.UTF_8);
            BufferedReader in = new BufferedReader(reader);
            String line;
            while ((line = in.readLine()) != null) {
                String newline = line.replaceAll("\t", " ");
                String[] ht = newline.split("\\|");
                Integer id = Integer.parseInt(ht[0]);
                String name = ht[1];
                String date = ht[2];
                String link = ht[4];
                ItemDTO dto = new ItemDTO(id, name, date, link);
                itemList.add(dto);
            }
        } catch (IOException e) {
            log.error(e.getMessage());
        }
        return itemList;
    }
}

