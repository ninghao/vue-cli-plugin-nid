const path = require('path');

const getGeneratedFilePath = (fileType, options) => {
  /**
   * 1. --component comment
   *    -> src/comment/comment.vue
   *
   * 2. --component comment-index
   *    -> src/comment/index/comment-index.vue
   *
   * 3. --component comment-list --path comment/index/components
   *    -> src/comment/index/components/comment-list.vue
   */

  let typeOption = fileType;

  if (fileType === 'style') {
    typeOption = 'component';
  }

  const { [typeOption]: fileName, path: filePath } = options;

  // 带后缀的文件名
  let fileFullName;

  switch (fileType) {
    case 'component':
      fileFullName = `${fileName}.vue`;
      break;
    case 'style':
      fileFullName = path.join('styles', `${fileName}.css`);
      break;
  }

  const fileNameArray = fileName.split('-');
  const isMultiWordsFile = fileNameArray.length > 1;

  // 文件存放位置
  let fileFullPath = [];

  if (filePath) {
    // 3
    const filePathArray = filePath.split('/');
    fileFullPath = ['src', ...filePathArray, fileFullName];
  } else if (isMultiWordsFile) {
    // 2
    fileFullPath = ['src', ...fileNameArray, fileFullName];
  } else {
    // 1
    fileFullPath = ['src', fileName, fileFullName];
  }

  return path.join(...fileFullPath);
};

module.exports = { getGeneratedFilePath };
