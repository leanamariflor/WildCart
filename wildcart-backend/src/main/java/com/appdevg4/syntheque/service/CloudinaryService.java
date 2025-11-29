package com.appdevg4.syntheque.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService(@Value("${CLOUDINARY_URL}") String url) {
        this.cloudinary = new Cloudinary(url);
        cloudinary.config.secure = true;
    }

    public String uploadImage(MultipartFile file) {
        try {
            Map upload = cloudinary.uploader().upload(
                file.getBytes(),
                ObjectUtils.asMap("folder","wildcart")
            );
            return upload.get("secure_url").toString();

        } catch (IOException e) {
            throw new RuntimeException("Upload failed → " + e.getMessage());
        }
    }
}
