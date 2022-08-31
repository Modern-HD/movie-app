package com.myweb.www.domain;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberVO {
    private long mno;
    private String id;
    private String pwd;
    private String oldNick;
    private String nickName;
    private String name;
    private String tel;
    private int point;
    private boolean auth;
    private String birth;
    private String profileLink;
    private String oldProfile;
    
    public MemberVO(String id, String pwd, String nickName, String name, String tel, String birth) {
        this.id = id;
        this.pwd = pwd;
        this.nickName = nickName;
        this.name = name;
        this.tel = tel;
        this.birth = birth;
    }
    public MemberVO(String id, String pwd) {
        this.id = id;
        this.pwd = pwd;
    }
    public MemberVO(long mno, String id, String nickName, String name, String tel, String oldProfile, String profileLink) {
        this.mno = mno;
        this.id = id;
        this.nickName = nickName;
        this.name = name;
        this.tel = tel;
        this.oldProfile = oldProfile;
        this.profileLink = profileLink;
    }
    public MemberVO(String id, String pwd, String nickName, String name, String tel, boolean auth, String birth) {
        this.id = id;
        this.pwd = pwd;
        this.nickName = nickName;
        this.name = name;
        this.tel = tel;
        this.auth = auth;
        this.birth = birth;
    }
}