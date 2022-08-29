<template>
    <div class="commentLayout">
        <span class="commentListTitle">{{commentTitle}}</span>
        <ul class="commentList">
            <li class="comment" v-for="comment in commentData" :key="comment.commentId">
                <div class="profile">
                    <img :src="comment.user.avatarUrl" alt="头像">
                </div>
                <div class="commentDetail">
                    <div class="commentContent">
                        <span class="userId">{{comment.user.nickname}}</span>:{{comment.content}}
                    </div>
                    <div class="commentInfo">
                        <div class="date">
                            {{comment.timeStr}}
                        </div>
                        <div class="like">
                            赞：{{comment.likedCount}}
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang='ts'>
import { ref, reactive, toRef, toRefs} from 'vue'
const props = defineProps(['commentTitle','commentData']);
const {commentData} = toRefs(props);

</script>

<style scoped lang='scss'>
.commentLayout {
    display: flex;
    flex-direction: column;
    .commentListTitle {
        width: 100%;
        font-size: 14px;
        font-weight: 600;
        text-align: left;
    }
    .commentList {
        list-style: none;
        .comment {
            display: flex;
            align-items: center;
            // justify-content: flex-start;
            width: 690px;
            height: 80px;
            border-bottom: 1px solid rgb(230, 230, 230);
            .profile {
                width: 36px;
                height: 36px;
                border-radius: 18px;
                overflow: hidden;
                img {
                    width: 36px;
                    height: 36px;
                }
            }
            .commentDetail {
                display: flex;
                flex-direction: column;
                width: 650px;
                margin-left: 15px;
                text-align: left;
                .commentContent {
                    font-size: 13px;
                    color: #303030;
                    .userId {
                        color: #767dc0
                    }
                }
                .commentInfo {
                    justify-self: flex-end;
                    margin-top: 8px;
                    font-size: 13px;
                    color: #8b8b8b;
                    display: flex;
                    justify-content: space-between;
                    .like {
                        color: #303030;
                        margin-right: 15px;
                    }
                }
            }
        }
    }
}
</style>