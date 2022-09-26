package com.dxc.utils;

import org.apache.commons.lang3.RandomStringUtils;

public class RandomPasswordGenerator {
	public static String generateRandomPassword() {
		return RandomStringUtils.randomAscii(12);
	}
}
