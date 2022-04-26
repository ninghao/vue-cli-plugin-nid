# Vue CLI 插件

这是[宁皓网](https://ninghao.net)内部项目使用的一个 Vue CLI 插件，在使用了 TypeScript 的 Vue 项目里，可以用命令生成应用需要的组件与 store 模块。

## 安装

在终端，项目所在目录的下面，使用 npm install 或 yarn add 安装 vue-cli-plugin-nid 这个包。

```
yarn add vue-cli-plugin-nid —D
```

然后执行：

```
vue invoke vue-cli-plugin-nid
```

上面这个命令只需要执行一次，它会在项目的 package.json 文件的 scripts 里面添加几个自定义的命令，使用 npm run 可以运行这些命令。

```
{
  ...
  "scripts": {
    ...
    "gc": "vue invoke vue-cli-plugin-nid --component",
    "generate:component": "vue invoke vue-cli-plugin-nid --component",
    ...
  },
  ...
}
```

命令都有一个简化版，比如 generate:component 命令的简化版是 gc，运行这个命令可以执行 npm run gc，后面是一些选项与对应的值，这些东西都可以放在两个小横线的后面，比如 `npm run gc -- comment-index`。 

## 组件

生成的组件可以使用 generate:component 或 gc 命令。

**示例：**

```
`npm run generate:component -- comment-index`
```

上面命令会生成一个 comment-index 组件，还有组件对应的样式表，生成的组件默认会放在 src/comment/index 目录的下面。

```
src/comment
└── index
    ├── comment-index.vue
    └── styles
        └── comment-index.css
```

### 命令选项

* path：指定组件位置
* parent：指定组件的父组件
* vuex：指定组件内用的 vuex 帮手方法

### **指定具体位置**

执行生成组件命令时可以用 path 选项指定这个组件的具体存放的位置。

**示例：**

```
`npm run generate:component -- comment-list --path comment/index/components`
```

上面这个命令会创建一个组件，位置是  src/comment/index/components/comment-list.vue。

### **导入 Vuex 帮手**

要在生成的组件里使用 vuex 提供的帮手，可以通过 vuex 选项指定具体需要的帮手方法，如果不特别设置具体的方法，就会在组件里导入使用 vuex 提供的 mapGetters, mapMutations, mapActions 这几个帮手方法。

**示例：**

```
npm run generate:component -- comment-list \
  --path comment/index/components \
  --vuex mapGetters,mapActions
```

这会在生成的组件里导入 mapGetters 与 mapActions。

```
import { mapGetters, mapActions } from 'vuex';
```

或者也可以不具体设置需要的帮手方法：

```
npm run generate:component -- comment-list \
  --path comment/index/components \
  --vuex
```

### **指定父组件**

生成组件的时候你可以设置这个组件的父组件，这样命令会找到这个父组件，在它里面导入使用新生成的这个组件。

**示例：**

```
npm run generate:component -- comment-list \
  --path comment/index/components \
  --parent comment-index
```

上面这个命令会生成一个  comment-list 组件，然后在 comment-index 组件里导入使用了这个新生成的组件。这个 parent 选项的值可以直接使用父组件的名字，或者也可以加上具体的位置，比如 comment/index/comment-index。

*src/comment/index/comment-index.vue*

```
<template>
  <div class="comment-index">
    <CommentList />
    ...
  </div>
</template>

<script>
...
import CommentList from '@/comment/index/components/comment-list';

export default defineComponent({
  name: 'CommentIndex',
  ...

  /**
   * 使用组件
   */
  components: {
    CommentList,
  },
});
</script>
...
```



## Store

使用 generate:store 或 gs 命令可以生成需要的 store 模块。

**示例：**

```
`npm run generate:store -- comment`
```

上面命令会生成一个 store 模块，位置是 comment/comment.store.ts。


### 命令选项

* parent：指定父 store 模块
* module：在父 store 模块里注册的名字
* action：添加动作
* method：在动作里请求接口用的方法
* api：在动作里请求的接口
* resource：指定动作请求的资源

### 指定父模块

生成 store 模块的时候可以用 parent 选项设置父模块，另外可以配合 module 选项设置在父 store 模块那里注册的名字。

**示例：**

```
npm run generate:store -- comment-create \
  --parent comment/comment \
  --module create
```

上面命令会生成一个 store 模块，位置是 comment/create/comment-create.store。在 comment/comment.store.ts 里面会导入这个新生成的模块，并且在 modules 选项会用 create 这个命令注册这个新生成的 store 模块。

*src/comment/comment.store.ts*

```
...
import {
  CommentCreateStoreState,
  commentCreateStoreModule,
} from '@/comment/create/comment-create.store';

export interface CommentStoreState {
  create: CommentCreateStoreState;
  ...
}

export const commentStoreModule: Module<CommentStoreState, RootState> = {
  ...

  /**
   * 模块
   */
  modules: {
    create: commentCreateStoreModule,
  },
};
```



### **添加动作**

在生成 store 模块的时候，可以使用 action 选项在 store 模块里添加一个请求接口时需要用的动作。

**示例：**

```
`npm run generate:store -- comment-index --action getComments`
```

添加的动作有个默认的参数叫 options，执行命令时可以用 actionParam 选项设置动作参数的名字，还可以用 method 选项设置请求接口用的方法，用 api 选项设置要请求的接口地址。

**示例：**

```
npm run generate:store -- comment-create \
  --action createComment \
  --method post \
  --api comments
```

*src/comment/create/comment-create.store.ts*

```
...

export interface CreateCommentOptions {
  data?: null;
}

export const commentCreateStoreModule: Module<CommentCreateStoreState, RootState> = {
  ...

  /**
   * 动作
   */
  actions: {
    async createComment({ commit }, options: CreateCommentOptions = {}) {
      commit('setLoading', true);

      try {
        const response = await apiHttpClient.post(`comments`);
        commit('setLoading', false);

        return response;
      } catch (error) {
        ...    
      }
    },    
  },
};
```



### 添加资源

用 resource 选项可以设置动作请求回来的资源，这样会在 store 的 state、getters 与 mutations 里添加对应的东西。

**示例：**

```
npm run generate:store -- comment-index \
  --action getComments \
  --resource comments:Array:CommentListItem
```

resource 选项的值分成了三部分，中间用冒号分隔开，第一部分是资源的名字，第二部分说明这个资源是 Array，第三部分是数据项目的类型。


### **动作预处理**

如果 store 里的动作比较复杂，可以将其分成预处理（preProcess）与后处理（postProcess），就是在执行这个动作之前可以派发一个预处理动作，请求完成以后可以派发一个后处理动作。在命令里使用 pre 与 post 选项可以添加动作的预处理与后处理。

**示例：**

```
npm run generate:store -- comment-index \
  --action getComments \
  --resource comments:Array:CommentListItem \
  --pre --post
```

*src/comment/index/comment-index.store.ts*

```
...
export const commentIndexStoreModule: Module<CommentIndexStoreState, RootState> = {
  
  /**
   * 动作
   */
  actions: {
    async getComments({ commit, dispatch }, options: GetCommentsOptions = {}) {
      dispatch('getCommentsPreProcess', options);
      
      try {
        const response = await apiHttpClient.get(`resources`);
        
        dispatch('getCommentsPostProcess', response);
        
        return response;
      } catch (error) {
        ...
      }
    },

    async getCommentsPreProcess({ commit }, options: GetCommentsOptions = {}) {
      commit('setLoading', true);
    },

    async getCommentsPostProcess({ commit }, response) {
      commit('setLoading', false);
      commit('setComments', response.data);
    },
  },
};
```



### 添加 State

在已经存在的 store 模块里，可以用 gss 命令添加数据，命令会自动添加数据以及数据的获取器还有修改器。

**示例：**

```
`npm run gss ``--`` totalPages``:number``:1`` ``--``to comment-index`
```

上面这个命令会在 comment-index 这个 store 模块里添加一个数据，名字叫 totalPages，类型是 number，默认值是 1。

*src/comment/index/comment-index.store.ts*

```
...
export interface CommentIndexStoreState {
  totalPages: number;
  ...
}
...
export const commentIndexStoreModule: Module<...> = {
  ...
  /**
   * 数据
   */
  state: {
    totalPages: 1,
    ...
  } as CommentIndexStoreState,

  /**
   * 获取器
   */
  getters: {
    totalPages(state) {
      return state.totalPages;
    },
    ...
  },

  /**
   * 修改器
   */
  mutations: {
    setTotalPages(state, data) {
      state.totalPages = data;
    },
    ...
  },
  ...
};
```



## 导入

使用命令快速导入组件与要使用的 vuex 帮手方法。


### 导入组件

在组件里导入使用其它的组件有几个步骤，首先要导入组件，然后在组件的 components 里注册导入的组件，最后要在组件模板里使用导入并注册的组件。

使用 import:component 或者 ic 命令，可以在组件里导入使用其它的组件，如果需要导入多个组件，中间用逗号分隔开。然后用 to 选项设置目标组件。

**示例：**

```
`npm run import:component -- user-avatar,user-name --to comment-create`
```

上面这个命令可以在 comment-create 这个组件里导入使用项目里的 UserAvatar 与 UserName 组件，命令会自动在项目里查找这些组件，所以不需要设置要导入的这些组件的具体路径。

### 导入 Vuex

使用 import:vuex 或 iv 命令，可以在组件里导入使用 vuex 的帮手方法，用 to 这个选项设置目标组件。帮手方法的名字也可以使用简写形式，比如 ms, mg, ma, mm，分别对应的是 mapState，mapGetters，mapActions 还有 mapMutations。

**示例：**

```
`npm run import:vuex -- mapGetters,mapActions --to comment-create`
```

上面命令会在项目的 comment-create 组件里导入 vuex 里的 mapGetters 与 mapActions 这两个帮手方法。

