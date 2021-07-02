# Vue CLI 插件

这是[宁皓网](https://ninghao.net)内部项目使用的一个 Vue CLI 插件，在使用了 TypeScript 的 Vue 项目里，可以用命令生成应用需要的组件与 Store 模块。

## 安装

```
npm install vue-cli-plugin-nid --save-dev
vue invoke vue-cli-plugin-nid
```

## 组件

生成的组件可以使用 kebab-case 命名方式。

```
npm run generate:component -- comment-index
```

上面命令会生成一个组件，位置是： `comment/index/comment-index.vue` 。

**指定位置**

你可以用 `--path` 选项指定生成的组件的位置。

```
npm run generate:component -- comment-list --path comment/index/components
```

这样生成的组件位置会是： `comment/index/components/comment-list.vue` 。

**使用 Vuex**

如果你需要在组件里导入使用 Vuex 的帮手方法，可以使用 `--vuex` 设置需要的帮手方法，不指定具体的帮手方法，就会在生成的组件里导入使用全部的帮手方法。

```
npm run generate:component -- comment-list --path comment/index/components --vuex mapGetters,mapActions
```

或者：

```
npm run generate:component -- comment-list --path comment/index/components --vuex
```

**设置父组件**

生成组件的时候你可以设置这个组件的父组件，这样命令会找到这个父组件，在它里面导入使用新生成的这个组件。

```
npm run generate:component -- comment-list --path comment/index/components --parent comment/index/comment-index
```

## Store

生成一个 Store 模块：

```
npm run generate:store -- comment
```

上面命令会生成一个模块，位置是 `comment/comment.store.ts`。

**设置父模块**

用 `--parent` 选项设置一下生成的模块的父模块。用 `--module` 选项  可以设置在父模块那里注册的模块的名字。

```
npm run generate:store -- comment-create --parent comment/comment --module create
```

上面命令会生成一个 Store 模块，位置是 `comment/create/comment-create.vue`。在 `comment/comment.store.ts` 这个模块里会自动导入这个新生成的模块，在父模块的 `modules` 选项里注册时用的名字叫 `create`。

**添加动作**

在生成 Store 模块的时候，如果你想在模块里定义一个动作，可以使用 `--action` 选项。

```
npm run generate:store -- comment-index --action getComments
```

动作默认的参数名字叫 `options`，你可以使用 `--actionParam` 这个选项设置动作参数的名字。

使用 `--method` 可以设置请求用的方法，用 `--api` 可以设置请求的接口地址。像这样：

```
npm run generate:store -- comment-create --action createComment --method post --api comments
```

**添加资源**

如果 Store 里的动作请求回来一些资源，你可以用 `--resource` 选项设置一下资源的名字，这样就会在 Store 模块的 `state`，`getters`，`mutations` 里面添加对应的东西。

```
npm run generate:store -- comment-index --action getComments --resource comments
```

如果这个资源是一组数据，你可以设置这组数据的类型，还有数组项目的类型。

```
npm run generate:store -- comment-index --action getComments --resource comments:Array:CommentListItem
```

上面这个 `--resource` 选项的值分成了三个部分，第一部分是资源的名字，第二部分说明这个资源是 Array，第三部分是数据项目的类型。

**动作预处理**

如果动作比较复杂，我们可以分成预处理与后处理，就是在执行动作之前可以派发一个预处理动作。一般在请求完成以后可以派发一个后处理动作。在创建 Store 的时候，使用 `--pre` 与 `--post` 选项可以添加预处理与后处理动作。

```
npm run generate:store -- comment-index --action getComments --resource comments:Array:CommentListItem --pre --post
```

**添加 State**

在已经生成的 Store 里面，可以添加 State，默认会添加对应的 getter 还有 mutation。下面示例里会在 series-side-sheet（Store 模块文件名的一部分） 这个 Store 模块里添加一个叫 loading 的 State，类型是 boolean，默认值是 false。

```
npm run gss -- loading:boolean:false --to series-side-sheet
```

## 导入
你可以使用导入生成器，在项目现有的组件里导入使用其它的组件，也可以导入使用 Vuex 的帮手方法。

**导入组件**

使用 `import:component` 或者 `ic` 命令，可以在组件里导入使用其它的组件，如果需要导入多个组件，可以中间用逗号分隔开。用 `--to` 选项设置目标组件。

```
npm run import:component -- user-avatar,user-name --to comment-create
```

上面这个命令可以在 `comment-create` 这个组件里导入使用 `UserAvatar` 与 `UserName` 组件。命令会自动查找项目里的组件，不需要设置组件的路径。

**导入 Vuex**

在现在组件里导入使用 Vuex 的帮手方法，可以执行 `import:vuex` 或 `iv` 命令。用 `--to` 选项设置目标组件。帮手方法的名字可以使用简写，比如 `ms`, `mg`, `ma`, `mm` 。

```
npm run import:vuex -- mapGetters,mapActions --to comment-create
```
