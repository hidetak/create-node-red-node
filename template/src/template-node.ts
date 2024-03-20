<%_ let varConfigNodeName _%>
<%_ if(config) { _%>
<%_   varConfigNodeName = config.nodeName[0].toLowerCase() + config.nodeName.substring(1) _%>
<%_ } _%>
module.exports = function (RED) {
  function <%- nodeName %>(config) {
    RED.nodes.createNode(this, config)
    const node = this

    // inputイベント
    node.on('input', async (msg, send, done) => {
      <%_ if(config) { _%>
      // configノードを取得
      const <%- varConfigNodeName %> = RED.nodes.getNode(config.<%- varConfigNodeName %>)
      <%_ } _%>
      // 入力パラメータを取得
      <%_ if(input && input.params) { _%>
      <%_   for(const param of input.params) { _%>
      if (config.inParams_<%- param.name %>ConstValue && config.inParams_<%- param.name %>Type) {
        node.inParams_<%- param.name %> = RED.util.evaluateNodeProperty(
          config.inParams_<%- param.name %>ConstValue,
          config.inParams_<%- param.name %>Type,
          node,
          msg
        )
      }
      console.log('node.inParams_<%- param.name %>:', node.inParams_<%- param.name %>)
      <%_   } _%>
      <%_ } _%>

      // 出力の作成
      <%_ if(outputs && outputs.length > 1) { _%>
      let msgs = []
      <%_ } _%>
      <%_ if(outputs) { _%>
      <%_   for( let j = 0; j < outputs.length; j++) { _%>
      // <%- outputs[j].outputLabel__ja %>の出力を返す場合
      <%_     for( let i = 0; i < outputs[j].params.length; i++) { _%>
      setOutput(
        config.outParams<%- j+1 %>_<%- outputs[j].params[i].name %>Type,
        config.outParams<%- j+1 %>_<%- outputs[j].params[i].name %>ConstValue,
        msg,
        this.context(),
        '[value of outParams<%- j+1 %>_<%- outputs[j].params[i].name %>]'
      )
      <%_     } _%>
      <%_ if(outputs && outputs.length > 1) { _%>
      msgs[<%- j %>] = msg
      <%_ } _%>
      // ここまで
      <%_   } _%>
      <%_ } _%>

      <%_ if(outputs && outputs.length > 1) { _%>
      send(msgs) // Outputが複数の場合は配列で返す
      <%_ } else { _%>
      send(msg)
      <%_ } _%>
      done()
    })
    // closeイベント
    node.on('close', function (removed, done) {
      if (removed) {
        // This node has been disabled/deleted
      } else {
        // This node is being restarted
      }
      // 処理終了通知
      done()
    })
  }
  RED.nodes.registerType('<%- nodeType %>', <%- nodeName %>)

  const setOutput = (type, valueName, msg, context, value) => {
    if (type === 'msg') {
      const names = valueName.split('.')
      let target = msg
      for (let i = 0; i < names.length - 1; i++) {
        let n = names[i]
        if (target[n] && target[n] instanceof Object) {
          target = target[n]
        } else {
          target[n] = {}
          target = target[n]
        }
      }
      target[names[names.length - 1]] = value
    } else if (type === 'node') {
      context.set(valueName, value)
    } else if (type === 'flow') {
      context.flow.set(valueName, value)
    } else if (type === 'global') {
      context.global.set(valueName, value)
    }
  }
}
