## create-cxiaof-react-cli

ccrc 自用 react 脚手架

---

### Used

#### create app by ccrc

- install

```shell
npm install -g create-cxiaof-react-cli
```

- create

> Usage:  
> **ccrc \<projectName> [options]**
>
> Options:  
> **-V, --version** output the version number  
> **-t, --template \<preset>** Vite 模板 (default: "react-ts")  
> **-m, --manager \<management>** 包管理器 (default: "pnpm")  
> **-no, --noinstall** 不安装依赖  
> **[todo]** -map, --map 创建为地图项目  
> **-h, --help** display help for command

example

```shell
# 全部采用默认值：pnpm + react + ts
ccrc youre_project_name

# 使用其他vite模板
ccrc youre_project_name --template react
# or
ccrc youre_project_name -t vue

# 使用其他包管理器
ccrc youre_project_name --manager yarn
# or
ccrc youre_project_name -m npm

# 不自动安装依赖
ccrc youre_project_name --noinstall
# or
ccrc youre_project_name -no

# ---[todo]---
# 创建为地图项目
ccrc youre_project_name --map
# or
ccrc youre_project_name -map
# ------------

# 使用所有参数
ccrc youre_project_name -t react -m yarn -map -no
```

---

### Development

#### Prerequisites

```shell
npm install
```

#### run in the local environment

```shell
npm link
```

#### clear development

```shell
npm unlink create-cxiaof-react-cli -g
```

---

### Folder Structure

```
.
├─.editorconfig                             // 编辑器代码规范插件'EditorConfig'配置
├─.gitignore                                // git忽略同步的文件及目录
├─.prettierrc                               // js代码规范插件'prettier'配置
├─bin.js                                    // bin脚本产物（自动生成）
├─LICENSE                                   // LICENSE文件
├─package.json                              // packageJSON
├─pnpm-lock.yaml                            // 依赖模块版本信息（自动生成）
├─README.md                                 // README文件
├─src                                       // 开发文件目录
|  └...                                     //
└─ccrc-template                             // 模版目录
   ├─jsconfig.json                          // alias配置文件
   ├─template.json                          // packageJSON补充项模版文件
   ├─template                               // 通用模版文件
   |  └...                                  //
   ├─template-js                            // js版本模版文件
   |  └...                                  //
   └─template-ts                            // ts版本模版文件
      └...                                  //
```
