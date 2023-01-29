module.exports = function (RED) {
  function <%- config.nodeName %>(config) {
    RED.nodes.createNode(this, config)
    const node = this

    <%_ for(const setting of config.settings) { _%>
    node.<%- setting.name %> = node.credentials.<%- setting.name %>
    if (node.<%- setting.name %>) {
      node.<%- setting.name %> = RED.util.evaluateNodeProperty(
        node.<%- setting.name %>,
        config.<%- setting.name %>Type,
        node
      )
    }
    <%_ } _%>
  }

  RED.nodes.registerType("<%- config.nodeType %>", <%- config.nodeName %>, {
    credentials: {
      <%_ for(const setting of config.settings) { _%>
      <%- setting.name %>: { type: 'text' }
      <%_ } _%>
    }
  })
}
