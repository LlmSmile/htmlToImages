/**
 * @name: 修改对象名称
 * @param {Array} arr 数组
 * @param {Array} key 数组
 * @return {Array}
 * @example: convertKey({x: 0, y:0}, {x:1, y:1})
 */
export function convertKey (arr, key){
    let newArr = [];
    arr.forEach((item, index) => {
        let newObj = {};
        for (var i = 0; i < key.length; i++) {
            newObj[key[i]] = item[Object.keys(item)[i]]
        }
        newArr.push(newObj);
    })
    return newArr;
}
/**
 * @name: json内的null转换为空字符串
 * @param {Array} data 数组
 * @return {Array}
 * @example: nullToStr([{a: null}])
 */
export function nullToStr(data) {
    for (var x in data) {
        if (data[x] === null) { // 如果是null 把直接内容转为 ‘’
            data[x] = '';
        } else {
            if (Array.isArray(data[x])) { // 是数组遍历数组 递归继续处理
            data[x] = data[x].map(z => {
            return nullToStr(z);
            });
            }
            if(typeof(data[x]) === 'object'){ // 是json 递归继续处理
                data[x] = nullToStr(data[x])
            }
        }
    }
    return data;
}
/**
 * @name: 获取图片数组内所有图片的最大宽高
 * @param {Array} arr 数组
 * @return {Array}
 * @example: getImgMaxWidthMaxHeight(['1.jpg', '2.jpg'])
 */
export async function getImgMaxWidthMaxHeight(arr) {
    const widthList = []
    const heightList = []
    let maxHeight = 0
    let maxWidth = 0
    for (let i = 0; i < arr.length; i++) {
        const { width, height } = await this.getImgWidthHeight(arr[i]);
        widthList.push(width)
        heightList.push(height)
    }
    // 把数组变成升序然后倒过来取第一个就是拿最大宽度
    maxWidth = widthList.sort().reverse()[0]
    maxHeight = heightList.sort().reverse()[0]
    return {
        maxWidth,
        maxHeight,
    }
}
/**
 * @name: 获取图片的宽高
 * @param {string} src 数组
 * @return {Array}
 * @example: getImgWidthHeight('1.jpg')
 */
export function getImgWidthHeight(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.setAttribute('crossOrigin', 'anonymous'); 
        img.src = src;
        // 图片是否有缓存 如果有缓存可以直接拿 如果没有缓存 需要从onload拿
        if (img.complete) {
            const { width, height } = img
            resolve({
                width,
                height,
            })
        } else {
            img.onload = function () {
                const { width, height } = img
                resolve({
                    width,
                    height,
                })
            }
        }
    })
}
/**
 * @name: 图片转base64格式
 * @param {string} src 图片地址
 * @return {string}
 * @example: imgToBase64('1.jpg')
 */
export async function imgToBase64(src) {
    return new Promise((resolve, reject) => {
        const image = new Image()
        image.src = src
        image.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = image.naturalWidth // 使用 naturalWidth 为了保证图片的清晰度
            canvas.height = image.naturalHeight
            canvas.style.width = `${canvas.width / window.devicePixelRatio}px`
            canvas.style.height = `${canvas.height / window.devicePixelRatio}px`
            const ctx = canvas.getContext('2d')
            if (!ctx) {
                return null
            }
            ctx.drawImage(image, 0, 0)
            const base64 = canvas.toDataURL('image/png')
            return resolve(base64)
        }
        image.onerror = (err) => {
            return reject(err);
        }
    })
}
/**
 * @name: base64图片转成blob
 * @param {string} baseUrl base64图片转成blob
 * @return {string}
 * @example: baseUrltoBlob('base64图片url')
 */
export function baseUrltoBlob(baseUrl) {
    var arr = baseUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}