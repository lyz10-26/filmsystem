package top.lyzlove.controller;

import cn.hutool.core.io.FileUtil;
import cn.hutool.core.util.IdUtil;
import top.lyzlove.common.Result;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;
import java.util.List;

@RestController
@RequestMapping("/files")
public class FileController {

    @Value("${server.port}")
    private String port;

    private static final String ip = "http://localhost";
    private static final String FILES_DIRECTORY = "/spring/src/main/resources/files/";

    @PostMapping("/upload")
    public Result<?> upload(MultipartFile file) throws IOException {
        String originalFilename = file.getOriginalFilename();
        String flag = IdUtil.fastSimpleUUID();
        String rootFilePath = System.getProperty("user.dir") + FILES_DIRECTORY + flag + "_" + originalFilename;
        FileUtil.writeBytes(file.getBytes(), rootFilePath);
        return Result.success(ip + ":" + port + "/files/" + flag);
    }

    @GetMapping("/{flag}")
    public void getFiles(@PathVariable String flag, HttpServletResponse response) throws IOException {
        // Upload IDs are lowercase hex UUIDs without hyphens.
        if (!flag.matches("[0-9a-f]{32}")) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid file identifier");
            return;
        }

        String basePath = System.getProperty("user.dir") + FILES_DIRECTORY;
        List<String> fileNames = FileUtil.listFileNames(basePath);
        String fileName = fileNames.stream()
                .filter(name -> name.startsWith(flag + "_"))
                .findFirst()
                .orElse(null);

        if (fileName == null) {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "File not found");
            return;
        }

        response.setHeader("Content-Disposition",
                "attachment; filename*=UTF-8''" + URLEncoder.encode(fileName, "UTF-8").replace("+", "%20"));
        response.setContentType("application/octet-stream");
        FileUtil.writeToStream(FileUtil.file(basePath, fileName), response.getOutputStream());
    }
}
