package com.dxc.utils;

import java.io.File;
import java.util.List;

public class FileDeleteUtil {
	public static void deleteFile(long userId, String resourceToDelete, List<String> resources) {
		String path = "C:/Users/psiongbrian/Downloads/SocialMedia/user-media/" + userId + "/";
		if (resources.stream().filter(resource -> resource.equals(resourceToDelete)).count() == 1) {
			try {
				File f= new File(path + resourceToDelete);
				if (f.delete()) {
					System.out.println(f.getName() + " deleted");
				} else {
					System.out.println("Failed to delete");
				}
			} catch(Exception e) {
				e.printStackTrace();
			}  
		} // else, this resource is used in other posts by the same user, so we won't delete the resource
	}
}
