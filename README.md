# create-cxiaof-react-cli

ccrc 自用 react 脚手架

---

## Getting Started

### create app by ccrc

```shell
# use npm
npm install -g create-cxiaof-react-cli
# use yarn
yarn global add create-cxiaof-react-cli

# use javascript
ccrc project
# use typescript
ccrc project --ts
```

## develop cli

### Prerequisites

```shell
yarn install
# or npm
npm install
```

### run in the local environment

```shell
npm link --force
```

### clear development

```shell
npm unlink --force
```

## Folder Structure

```
.
├─.editorconfig                             // 编辑器代码规范插件'EditorConfig'配置
├─.gitignore                                // git忽略同步的文件及目录
├─.npmrc                                    // npm镜像地址配置
├─.prettierrc                               // js代码规范插件'prettier'配置
├─LICENSE                                   // LICENSE文件
├─package.json                              // packageJSON
├─README.md                                 // README文件
├─yarn.lock                                 // 依赖模块版本信息（自动生成）
|
├─bin                                       // 主要目录
|  └...                                     //
|
└─ccrc-template                             // 模版目录
   ├─template                               // 基础模版
   |  └...                                  //
   └─template-ts                            // typescript模版
       └...                                 //
```
