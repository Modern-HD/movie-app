package com.myweb.www.handler;

import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

public class TokenHandler {
	
	public List<String> tokenParser(String str) {
		List<String> tokenList = new ArrayList<>();
		StringTokenizer stz = new StringTokenizer(str);
		while(stz.hasMoreTokens()) {
			tokenList.add(stz.nextToken());
		}
		return tokenList;
	}
	
}
