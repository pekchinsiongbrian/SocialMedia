package com.dxc.utils;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;

public class FileDownloadUtil {
	public static byte[] getFileBytes(String fileName, long userId) {
		String downloadPath = "C:/Users/psiongbrian/Downloads/SocialMedia/user-media/" + userId + "/" + fileName;
		
		try {
			byte[] bytes = Files.readAllBytes(Paths.get(downloadPath));
			return bytes;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
}
