var express = require('express');
var router = express.Router();
var fs = require('fs');
const path= require('path');
const childProcess = require('child_process');

const versionDir = path.join(__dirname, '../version');
const initVersion = '1.0.0';

const VersionTypeValue = {
  major: 0,
  moinor: 1,
  patch: 2,
}

const updateVersion = (originVersion, versionType) => {
  const versionArrs = originVersion.split('.');
  versionArrs[versionType] = (Number(versionArrs[versionType]) + 1).toString();
  return versionArrs.join('.');
}

router.get('/', function(req, res, next) {
  const name = req.query.name; // 子应用名称
  const versionType = req.query.versionType ?? VersionTypeValue.patch;
  const currentUrl = path.join(versionDir, name);
  const originVersion = fs.readFileSync(currentUrl).toString();
  const newVersion = updateVersion(originVersion, versionType);

  try {
    fs.writeFileSync(currentUrl, newVersion);
  } catch (error) {
    fs.writeFileSync(currentUrl, initVersion);
  }

  // 需要打包的项目目录
  const originPath = path.join(__dirname, '../../../', name);
  const originDis = path.join(originPath, 'dist');
  const bagPath = path.join(__dirname, '../bag');

  try {
    // 通过打包命令创建对应的打包产物
    // childProcess.execSync(`cd ${originPath} && npm i && npm run build`);
    childProcess.execSync(`cd ${bagPath} && mkdir -p ./${name}/${newVersion}`);

    const lastDir = path.join(bagPath, './${name}/${newVersion}');
    childProcess.exec(`mv ${originPath}/* ${lastDir}`)
  } catch(e) {
    console.log("打包失败:", e);
  }
  res.send({
    version: newVersion,
  });
});

module.exports = router;
