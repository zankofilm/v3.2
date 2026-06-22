
const {audit} = require('./audit-core')
const {importSmart} = require('./smart-import')

function importFile(raw){
  const result = importSmart(raw)

  audit("IMPORT_ATTEMPT",{
    status: result.status,
    hasDiff: !!result.diff,
    preview: result.preview || null
  })

  if(result.status === "duplicate"){
    audit("IMPORT_DUPLICATE",{hash: result.hash})
  }

  if(result.status === "modified"){
    audit("IMPORT_MODIFIED",{diff: result.diff})
  }

  return result
}

module.exports = {importFile}
