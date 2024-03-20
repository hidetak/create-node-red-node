<%_ if(config) { _%>
module.exports = function (RED) {
  function <%- config.nodeName %>(config) {
    RED.nodes.createNode(this, config)
    const node = this

    <%_ for(const setting of config.settings) { _%>
    if (config.<%- setting.name %>ConstValue && config.<%- setting.name %>Type) {
      node.<%- setting.name %> = RED.util.evaluateNodeProperty(
        config.<%- setting.name %>ConstValue,
        config.<%- setting.name %>Type,
        node
      )
    }
    <%_ } _%>
  }

  RED.nodes.registerType("<%- config.nodeType %>", <%- config.nodeName %>)
}
<%_ } _%>
