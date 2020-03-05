<template>
  <div class="comment" v-if="Object.keys(evaluation).length !== 0">
    <!-- 商家评分 -->
    <div class="rating-wrap">
      <div class="rating-info">
        <h4>{{ evaluation.rating.shop_score.toFixed(1) }}</h4>
        <div class="shop-score">
          <span>商家评分</span>
          <Rating :rating="evaluation.rating.shop_score" />
        </div>
      </div>
      <div class="other-score">
        <div class="tp-score">
          <div>
            <span>味道</span>
            <p>{{ evaluation.rating.taste_score.toFixed(1) }}</p>
          </div>
          <div>
            <span>包装</span>
            <p>{{ evaluation.rating.package_score.toFixed(1) }}</p>
          </div>
        </div>
        <div class="rider-score">
          <span>配送</span>
          <p>{{ evaluation.rating.rider_score.toFixed(1) }}</p>
        </div>
      </div>
    </div>

    <!-- 评论区 -->
    <div class="shop-info">
      <!-- 标签 -->
      <ul class="tags">
        <li
          :class="{ unsatisfied: item.unsatisfied }"
          :key="index"
          v-for="(item, index) in evaluation.tags"
        >
          {{ item.name }}
          <span v-if="item.count > 0">{{ item.count }}</span>
        </li>
      </ul>
      <!-- 内容 -->
      <ul class="comments-wrap">
        <li :key="index" v-for="(item, index) in evaluation.comments">
          <div class="comment-user">
            <img :src="item.avatar || avatar" alt />
          </div>
          <div class="comments-info">
            <div class="comment-name">
              <h4>{{ item.username }}</h4>
              <small>{{ item.rated_at }}</small>
            </div>
            <div class="comment-rating">
              <Rating :rating="item.rating" />
              <span :style="{ color: ratingcontent(item.rating).color }">
                {{ ratingcontent(item.rating).txt }}
              </span>
            </div>
            <div class="comment-text">{{ item.comment_text }}</div>
            <div class="comment-reply">{{ item.reply.content }}</div>
            <ul class="comment-imgs">
              <li :key="i" v-for="(img, i) in item.order_images">
                <img :src="img.image_hash" alt />
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Rating from "@/components/Rating";

export default {
  name: "Comments",
  components: { Rating },
  data() {
    return {
      evaluation: {},
      avatar: require("@/assets/vue.png")
    };
  },
  methods: {
    getData() {
      this.$toast.loading({
        forbidClick: true,
        message: "加载中..."
      });
      axios
        .get("/api/profile/comments")
        .then(res => {
          // console.log(res);
          this.$toast.clear();
          this.evaluation = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    ratingcontent(rating) {
      const content = [
        { txt: "吐槽", color: "#899fbc" },
        { txt: "较差", color: "#899fbc" },
        { txt: "一般", color: "#fb9a0b" },
        { txt: "满意", color: "#fb9a0b" },
        { txt: "超赞", color: "#ff6000" }
      ];
      return content[rating - 1];
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style scoped>
.comment {
  line-height: 1.2;
  overflow-x: hidden;
  overflow-y: auto;
  height: calc(100vh - 44px);
  border-top: 1px solid #cccccc;
}

.rating-wrap {
  display: flex;
  margin-bottom: 10px;
  padding: 20px 15px;
  background-color: #ffffff;
}

.rating-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 35%;
  color: #666666;
}

.rating-info h4 {
  font-size: 30px;
  align-items: center;
  color: #ff6000;
}

.rating-info .shop-score {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
}

.other-score {
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: space-between;
  color: #666666;
}

.tp-score {
  display: flex;
  align-items: center;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 30px;
}

.tp-score > div {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.tp-score > div > span,
.rider-score > span {
  font-size: 14px;
  margin-bottom: 3px;
}

.tp-score > div > p,
.rider-score > p {
  font-size: 16px;
}

.rider-score {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 35%;
  border-left: 1px solid #dddddd;
}

.shop-info {
  font-size: 14px;
  padding: 10px 15px;
  background-color: #ffffff;
}

.tags {
  padding-bottom: 10px;
  border-bottom: 1px solid #eeeeee;
}

.tags li {
  font-size: 14px;
  line-height: 26px;
  display: inline-block;
  height: 26px;
  margin: 4px;
  padding: 0 10px;
  color: #6d7885;
  border-radius: 3px;
  background-color: #ebf5ff;
}

.unsatisfied {
  color: #aaaaaa !important;
  background-color: #f5f5f5 !important;
}

.comments-wrap > li {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #cccccc;
}

.comments-wrap > li:last-child {
  border-bottom: 0;
}

.comment-user {
  width: 40px;
  height: 40px;
  border: 1px solid #eeeeee;
  border-radius: 50%;
}

.comment-user img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.comments-info {
  font-size: 14px;
  flex: 1;
  margin-left: 10px;
}

.comment-name {
  font-size: 16px;
  font-weight: normal;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.comment-name h4 {
  margin-top: 0;
  color: #666666;
}

.comment-name small {
  font-size: 14px;
  color: #999999;
}

.comment-rating {
  display: flex;
  align-items: center;
  margin-top: 3px;
}

.comment-rating > span {
  font-size: 14px;
  margin-left: 5px;
}

.comment-reply {
  font-size: 14px;
  position: relative;
  margin-top: 15px;
  margin-bottom: 20px;
  padding: 10px;
  text-align: justify;
  word-break: break-word;
  color: #333333;
  border-radius: 1.066667vw;
  background: #f3f3f3;
}

.comment-reply::after {
  position: absolute;
  bottom: 100%;
  left: 4vw;
  width: 0;
  height: 0;
  content: " ";
  border-width: 0 2.133333vw 2.133333vw;
  border-style: solid;
  border-color: transparent transparent #f3f3f3;
}

.comment-imgs {
  margin-bottom: 10px;
}

.comment-imgs > li {
  display: inline-block;
}

.comment-imgs > li img {
  width: 150px;
  height: 150px;
}
</style>
