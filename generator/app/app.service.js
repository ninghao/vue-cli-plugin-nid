const path = require('path');
const { last, startCase, camelCase } = require('lodash');

/**
 * 获取生成文件路径
 */
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
   *
   * 4. --component comment/index/components/comment-list
   *    -> src/comment/index/components/comment-list.vue
   */
  let typeOption = fileType;

  if (fileType === 'style') {
    typeOption = 'component';
  }

  let { [typeOption]: fileName, path: filePath } = options;

  const fileNameArray = fileName.split('-');
  const filePathNameArray = fileName.split('/');
  const isFileWithPath = filePathNameArray.length > 1;
  const isMultiWordsFile = fileNameArray.length > 1 && !isFileWithPath;

  if (isFileWithPath) {
    fileName = last(filePathNameArray);
  }

  // 带后缀的文件名
  let fileFullName;

  switch (fileType) {
    case 'component':
      fileFullName = `${fileName}.vue`;
      break;
    case 'style':
      fileFullName = path.join('styles', `${fileName}.css`);
      break;
    case 'store':
      fileFullName = `${fileName}.store.ts`;
      break;
  }

  // 文件存放位置
  let fileFullPath = [];

  if (isFileWithPath) {
    // 4
    filePathNameArray.pop();
    fileFullPath = ['src', ...filePathNameArray, fileFullName];
  } else if (filePath) {
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

/**
 * 获取父辈文件路径
 */
const getParentFilePath = (fileType, options) => {
  // --parent comment/index/comment-index
  const { parent } = options;
  let fileExtention = '';

  switch (fileType) {
    case 'component':
      fileExtention = '.vue';
      break;
    case 'store':
      fileExtention = '.store.ts';
      break;
  }

  let parentFilePath = [];

  const parentArray = parent.split('/');
  const parentFileName = last(parentArray) + fileExtention;

  if (parentArray.length > 1) {
    parentArray.pop();
    parentFilePath = ['src', ...parentArray, parentFileName];
  } else {
    parentFilePath = ['src', ...parent.split('-'), parentFileName];
  }

  return path.join(...parentFilePath);
};

/**
 * 获取父辈名字
 */
const getParentName = (options) => {
  // --parent comment/index/comment-index
  return last(options.parent.split('/'));
};

/**
 * 获取导入路径
 */
const getGeneratedFileImportPath = (fileType, options) => {
  const { [fileType]: fileName, path: filePath } = options;

  let fileFullName;

  switch (fileType) {
    case 'component':
      fileFullName = fileName;
      break;
    case 'store':
      fileFullName = `${fileName}.store`;
      break;
  }

  const fileNameArray = fileName.split('-');
  const isMultiWordsFile = fileNameArray.length > 1;

  let fileImportPath = [];

  if (filePath) {
    const filePathArray = filePath.split('/');
    fileImportPath = ['@', ...filePathArray, fileFullName];
  } else if (isMultiWordsFile) {
    fileImportPath = ['@', ...fileNameArray, fileFullName];
  } else {
    fileImportPath = ['@', fileName, fileFullName];
  }

  return fileImportPath.join('/');
};

/**
 * 获取项目文件内容
 */
const getProjectFileContent = (filePath, api) => {
  const file = api.generator.files[filePath];
  return file.split(/\r?\n/g);
};

/**
 * 插入内容
 */
const insertFileContent = (options = {}) => {
  const { fileContent, find, insert } = options;
  const lineIndex = fileContent.findIndex((line) => line.match(RegExp(find)));

  if (Array.isArray(insert)) {
    fileContent.splice(lineIndex + 1, 0, ...insert);
  } else {
    fileContent.splice(lineIndex + 1, 0, insert);
  }

  return fileContent;
};

/**
 * 替换内容
 */
const replaceFileContent = (options = {}) => {
  const { fileContent, find, replace } = options;
  const lineIndex = fileContent.findIndex((line) => line.match(RegExp(find)));

  if (Array.isArray(replace)) {
    fileContent.splice(lineIndex, 1, ...replace);
  } else {
    fileContent.splice(lineIndex, 1, replace);
  }

  return fileContent;
};

/**
 * 查找替换
 */
const findReplaceFileContent = (options = {}) => {
  let { fileContent, find, replace } = options;

  const findResult = findFileContent({ fileContent, find });

  if (findResult) {
    fileContent = replaceFileContent({ fileContent, find, replace });
  }

  return fileContent;
};

/**
 * 查找内容
 */
const findFileContent = (options = {}) => {
  const { fileContent, find } = options;
  return fileContent.some((line) => line.match(RegExp(find)));
};

/**
 * PascalCase
 */
const pascalCase = (string) => {
  return startCase(camelCase(string)).replace(/ /g, '');
};

/**
 * 导出
 */
module.exports = {
  getGeneratedFilePath,
  getParentFilePath,
  getParentName,
  getGeneratedFileImportPath,
  getProjectFileContent,
  insertFileContent,
  pascalCase,
  findFileContent,
  replaceFileContent,
  findReplaceFileContent,
};
