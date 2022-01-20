<template>
  <div class="row d-flex align-items-center justify-content-center">
    <div class="col-md-6">
      <div class="card">
        <div class="d-flex justify-content-between p-2 px-3">
          <div class="d-flex flex-row align-items-center">
            <div class="d-flex flex-column ml-2">
              <span class="font-weight-bold">{{ username }}</span>
              <small class="text-primary">public</small>
            </div>
          </div>
        </div>
        <div class="p-2">
          <form @submit.prevent="post" enctype="multipart/form-data">
            <textarea
              name="text"
              v-model="description"
              cols="30"
              rows="3"
            ></textarea>
            <hr />
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex flex-row icons d-flex align-items-center">
                <i class="fa fa-heart"></i> <i class="fa fa-smile-o ml-2"></i>
              </div>

              <input
                type="file"
                class="form-control"
                name="file"
                ref="fileData"
                @change="imgUpload"
              />
            </div>
            <hr />
            <button class="form-control">Post</button>
          </form>
          <hr />
          <router-link
            @click="cancel"
            class="form-control btn btn-danger"
            :to="{
              name: DashBoard,
              params: { userId: userId },
              query: { page: $route.query.page },
            }"
          >
            Cancel
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
import { useStore } from "vuex";
export default {
  props: {
    userId: String,
    username: String,
  },
  setup(props, { emit }) {
    const store = useStore();
    const fileInputs = ref(null);
    const description = ref(null);
    const img = computed(() => store.state.upload);
    const cancel = () => {
      emit("cancelBtn", { toggle: false });
    };
    return {
      fileInputs,
      description,
      cancel,
      img,
    };
  },
  methods: {
    imgUpload() {
      this.fileInputs = this.$refs.fileData.files[0];
      console.log(this.$refs.fileData.files[0]);
    },
    async post() {
      try {
        const formData = new FormData();
        if (this.fileInputs === null) {
          await this.$store.dispatch("addPost", {
            image: null,
            description: this.description,
            userId: this.userId,
            username: this.username,
            date: Date.now(),
          });
        } else {
          formData.append("file", this.fileInputs);
          await this.$store.dispatch("upload", formData);
          await this.$store.dispatch("addPost", {
            image: this.img[0].src,
            description: this.description,
            userId: this.userId,
            username: this.username,
          });
        }
        this.$store.dispatch("resetUpload");
        this.$emit("post");
        this.cancel();
      } catch (error) {
        console.log(error);
        this.$store.dispatch("fetchMessage", {
          code: 500,
          text: "Post Failed",
          status: "danger",
        });
        setTimeout(() => {
          this.$store.dispatch("removeMessage");
        }, 3000);
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap");

body {
  background-color: #eee;
  font-family: "Poppins", sans-serif;
  font-weight: 300;
}

.card {
  border: none;
}

.ellipsis {
  color: #a09c9c;
}

hr {
  color: #a09c9c;
  margin-top: 4px;
  margin-bottom: 8px;
}

.muted-color {
  color: #a09c9c;
  font-size: 13px;
}

.ellipsis i {
  margin-top: 3px;
  cursor: pointer;
}

.icons i {
  font-size: 25px;
}

.icons .fa-heart {
  color: red;
}

.icons .fa-smile-o {
  color: yellow;
  font-size: 29px;
}

.rounded-image {
  border-radius: 50% !important;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
}

.name {
  font-weight: 600;
}

.comment-text {
  font-size: 12px;
}

.status small {
  margin-right: 10px;
  color: blue;
}

.form-control {
  border-radius: 26px;
}

.comment-input {
  position: relative;
}

.fonts {
  position: absolute;
  right: 13px;
  top: 8px;
  color: #a09c9c;
}

.form-control:focus {
  color: #495057;
  background-color: #fff;
  border-color: #8bbafe;
  outline: 0;
  box-shadow: none;
}
</style>
