# create-node-red-node

command line tool for creating node-red node template.

# 使い方

## 作成するノードの定義

作成するノードの定義を記載したファイルを用意してください。
定義はJSONで記載します。
以下にサンプルを示します。

```
{
    "packageName": "node-red-contrib-test01-node",
    "nodeType": "test01-node",
    "nodeName": "Test01Name",
    "category": "test",
    "color": "#d7d7a0",
    "icon": "arrow.png",
    "paletteLabel__enUS":"test01 node",
    "paletteLabel__ja":"テスト01ノード",
    "labelStyle":"node_label_italic",
    "input":{
        "tabLabel__enUS":"Input1",
        "tabLabel__ja":"入力1",
        "params":[
            {
                "name":"inputParam1",
                "label__enUS":"Input Parameter1",
                "label__ja":"入力パラメータ1",
                "description__enUS":"Input Parameter1 description.",
                "description__ja":"入力パラメータ1の説明。",
                "placeholder__enUS":"Input Parameter1",
                "placeholder__ja":"入力パラメータ1",
                "types":["str", "env", "msg"],
                "defaultType":"msg",
                "defaultValue":"payload",
                "required":true
            },
            {
                "name":"inputParam2",
                "label__enUS":"Input Parameter2",
                "label__ja":"入力パラメータ2",
                "description__enUS":"Input Parameter2 description.",
                "description__ja":"入力パラメータ2の説明。",
                "placeholder__enUS":"Input Parameter2",
                "placeholder__ja":"入力パラメータ2",
                "types":["str", "env", "msg"],
                "defaultType":"msg",
                "defaultValue":"payload",
                "required":true
            }
        ]
    },
    "outputs":[
        {
            "tabLabel__enUS":"Output1",
            "tabLabel__ja":"出力1",
            "outputLabel__enUS":"Output1",
            "outputLabel__ja":"出力1",
            "params":[
                {
                    "name":"output1",
                    "label__enUS":"Output Parameter1",
                    "label__ja":"出力パラメータ1",
                    "description__enUS":"Output Parameter1 description.",
                    "description__ja":"出力パラメータ1の説明。",
                    "placeholder__enUS":"Output Parameter1",
                    "placeholder__ja":"出力パラメータ1",
                    "types":["msg", "flow"],
                    "defaultType":"msg",
                    "defaultValue":"payload"
                }
            ]
        },
        {
            "tabLabel__enUS":"Output2",
            "tabLabel__ja":"出力2",
            "outputLabel__enUS":"Output2",
            "outputLabel__ja":"出力2",
            "params":[
                {
                    "name":"output1",
                    "label__enUS":"Output Parameter1",
                    "label__ja":"出力パラメータ1",
                    "description__enUS":"Output Parameter1 description.",
                    "description__ja":"出力パラメータ1の説明。",
                    "placeholder__enUS":"Output Parameter1",
                    "placeholder__ja":"出力パラメータ1",
                    "types":["msg", "flow"],
                    "defaultType":"msg",
                    "defaultValue":"payload"
                },
                {
                    "name":"output2",
                    "label__enUS":"Output Parameter2",
                    "label__ja":"出力パラメータ2",
                    "description__enUS":"Output Parameter2 description.",
                    "description__ja":"出力パラメータ2の説明。",
                    "placeholder__enUS":"Output Parameter2",
                    "placeholder__ja":"出力パラメータ2",
                    "types":["msg", "flow"],
                    "defaultType":"msg",
                    "defaultValue":"payload"
                }
            ]
        }
    ],
    "config":{
        "nodeType":"test01-config",
        "nodeName":"Test01Config",
        "defaultName":"test01config",
        "configLabel__enUS":"test01 config",
        "configLabel__ja":"テスト01設定",
        "labelStyle":"node_label_italic",
        "settings":[
            {
                "name":"config1",
                "label__enUS":"config1",
                "label__ja":"設定1",
                "description__enUS":"config1 description.",
                "description__ja":"設定1の説明。",
                "types":["str", "env", "flow"],
                "defaultType":"env",
                "defaultValue":"test1env",
                "placeholder__enUS":"test01 config",
                "placeholder__ja":"テスト01設定",
                "required": true
            },
            {
                "name":"config2",
                "label__enUS":"config2",
                "label__ja":"設定2",
                "description__enUS":"config2 description.",
                "description__ja":"設定2の説明。",
                "types":["str", "env", "flow"],
                "defaultType":"env",
                "defaultValue":"test2env",
                "placeholder__enUS":"test02 config",
                "placeholder__ja":"テスト02設定",
                "required": true
            }
        ]
    }
}
```

## ノードテンプレート作成

`npx @hidetak/create-node-red-node <ノードテンプレート出力先フォルダ名> <ノードテンプレートの定義>`

## ノードテンプレートのビルド

作成されたノードテンプレートは以下の手順でビルドします。

- 作成されたフォルダに移動します。
  `cd <ノードテンプレート出力先フォルダ名>`
- ノードモジュールをインストールします。
  `npm install`
- ビルドします。
  `npm run build`
