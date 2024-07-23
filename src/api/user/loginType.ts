import { baseType } from "@/api/baseType"

interface loginVO {
    token: string
}

interface userInfo {
    userAccount: string
    nickName: string
    userAvatar: string
}

export interface loginResData extends baseType {
    data: loginVO
}

export interface publicKeyResData extends baseType {
    data: string
}

export interface userInfoResData extends baseType {
    data: userInfo
}

export interface loginDTO {
    account: string
    password: string
}
