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
      // configノードを取得
      const <%- varConfigNodeName %> = RED.nodes.getNode(config.<%- varConfigNodeName %>)
      // 入力パラメータ
      <%_ if(input && input.params) { _%>
      <%_   for(const param of input.params) { _%>
      node.inParams_<%- param.name %> = node.credentials.inParams_<%- param.name %>
      if (node.inParams_<%- param.name %>) {
        node.inParams_<%- param.name %> = RED.util.evaluateNodeProperty(
          node.inParams_<%- param.name %>,
          config.inParams_<%- param.name %>Type,
          node,
          msg
        )
      }
      console.log('<%- varConfigNodeName %>:', <%- varConfigNodeName %>)
      console.log(
        'config.inParams_inputParam1Type',
        config.inParams_<%- param.name %>Type
      )
      console.log(
        'node.credentials.inParams_<%- param.name %>',
        node.credentials.inParams_<%- param.name %>
      )
      console.log(
        'config.inParams_<%- param.name %>ConstValue',
        config.inParams_<%- param.name %>ConstValue
      )
      console.log('node.inParams_<%- param.name %>:', node.inParams_<%- param.name %>)
      <%_   } _%>
      <%_ } _%>

      send(msg) // Outputが複数の場合は配列で返す
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
  RED.nodes.registerType('<%- nodeType %>', <%- nodeName %>, {
    credentials: {
      inParams_inputParam1: { type: 'text' }
    }
  })
}
