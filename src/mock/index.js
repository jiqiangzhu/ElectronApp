import Mock from 'mockjs';

Mock.setup({
    timeout: '100-300'
})

Mock.mock(
    '/user/details',
    'get',
    () => {
        return {
            "level": 5,
            "listenSongs": 339,
            "userPoint": {
                "userId": 2003935822,
                "balance": 100,
                "updateTime": 1617714681815,
                "version": 10,
                "status": 0,
                "blockBalance": 0
            },
            "mobileSign": false,
            "pcSign": false,
            "profile": {
                "avatarDetail": null,
                "mutual": false,
                "followed": false,
                "remarkName": null,
                "authStatus": 0,
                "nickname": "你管他那么多嘞",
                "avatarUrl": "../../assets/img/avatar.jpg",
                "detailDescription": "",
                "experts": {},
                "expertTags": null,
                "djStatus": 0,
                "accountStatus": 0,
                "birthday": -2209017600000,
                "gender": 1,
                "province": 410000,
                "city": 411100,
                "defaultAvatar": false,
                "avatarImgId": 109951164411577060,
                "backgroundImgId": 109951162868128400,
                "backgroundUrl": "http://p1.music.126.net/2zSNIqTcpHL2jIvU6hG0EA==/109951162868128395.jpg",
                "vipType": 0,
                "userType": 0,
                "createTime": 1570336833373,
                "backgroundImgIdStr": "109951162868128395",
                "avatarImgIdStr": "109951164411577061",
                "description": "",
                "userId": 2003935822,
                "signature": "",
                "authority": 0,
                "followeds": 0,
                "follows": 5,
                "blacklist": false,
                "eventCount": 0,
                "allSubscribedCount": 0,
                "playlistBeSubscribedCount": 0,
                "avatarImgId_str": "109951164411577061",
                "followTime": null,
                "followMe": false,
                "artistIdentity": [],
                "cCount": 0,
                "sDJPCount": 0,
                "playlistCount": 2,
                "sCount": 0,
                "newFollows": 5
            },
            "peopleCanSeeMyPlayRecord": true,
            "bindings": [
                {
                    "expiresIn": 2147483647,
                    "refreshTime": 1570336815,
                    "bindingTime": 1570336815706,
                    "tokenJsonStr": null,
                    "expired": false,
                    "url": "",
                    "userId": 2003935822,
                    "id": 6972487356,
                    "type": 1
                },
                {
                    "expiresIn": 7200,
                    "refreshTime": 1570336855,
                    "bindingTime": 1570336792882,
                    "tokenJsonStr": null,
                    "expired": true,
                    "url": "",
                    "userId": 2003935822,
                    "id": 6972487357,
                    "type": 10
                }
            ],
            "adValid": true,
            "code": 200,
            "createTime": 1570336833373,
            "createDays": 549
        }
    }
)