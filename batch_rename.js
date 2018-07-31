const fs = require("fs")
const chineseConv = require('chinese-conv');

// main function
function getAllFilePath(dirPath) {
  let paths = fs.readdirSync(dirPath)
    .filter(item => !(/(^|\/)\.[^\/\.]/g).test(item)) // 忽略隱藏檔
  return paths
}

function removeSuffix(name){
  let regex = /-\d.+\./
  let newname = name.replace(regex, ".")
  return newname
}


// set Dir path
process.stdout.write(`

  To set a field path to rename all files from 簡體 to 繁體.
  input the path （ e.g.  /User/dirA/dirB/dirC  ）
  and press 'Enter'.

  >> >>
`)

process.stdin.on("data", function (data) {
  let input = data.toString().trim()

  console.log(`Done! the path is set.  ${input}`)
  let names = getAllFilePath(input)

  names.forEach( name => {
    let oldPath = `${input}/${name}`
    let cht = chineseConv.tify(removeSuffix(name))
    let newPath = `${input}/${cht}`

    fs.rename(oldPath, newPath, function (err) {
      if (err) console.log('ERROR: ' + err);
    })
    console.log(cht);
    console.log(oldPath);
    console.log(newPath);
  })
  // console.log(names);
  process.exit()
})
