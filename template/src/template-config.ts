<%_ if(config) { _%>
module.exports = function (RED) {
  function <%- config.nodeName %>(config) {
    RED.nodes.createNode(this, config)
    const node = this

    <%_ for(const setting of config.settings) { _%>
    node.<%- setting.name %> = node.credentials.<%- setting.name %>
    if (node.<%- setting.name %>ConstValue && node.<%- setting.name %>Type) {
      node.<%- setting.name %> = RED.util.evaluateNodeProperty(
        config.<%- setting.name %>ConstValue,
        config.<%- setting.name %>Type,
        node
      )
    }
    <%_ } _%>
  }

  RED.nodes.registerType("<%- config.nodeType %>", <%- config.nodeName %>, {
    credentials: {
      <%_ for(let i = 0; i < config.settings.length; i++) { _%>
      <%- config.settings[i].name %>: { type: 'text' }<%- i < config.settings.length - 1 ? "," : "" %>
      <%_ } _%>
    }
  })
}
<%_ } _%>
