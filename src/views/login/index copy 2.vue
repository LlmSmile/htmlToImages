<style scoped lang="scss">
@import "@/assets/style/llm.scss";
    .h5-box{
        @include wh(720px, auto, a);
        top: -100%; left: -100%;
        overflow: hidden;
        float: left;
        .list{
            @include wh(100%, 100%, r);
            overflow: hidden;
            .bg{
                @include wh(100%, 100%, a);
                left: 0; top: 0;
            }
            .content{
                @include wh(100%, auto, r);
                left: 0; top: 0;
                .t-box{
                    @include wh(100%, 400px, r);
                    .t{
                        position: absolute;
                        width: 50%;
                        @include txt(44px, auto, center, 500);
                        @include color('', #fff);
                        @include jz(lt, 50%, 70%);
                    }
                    
                }
                .c-box{
                    @include wh(100%, 428px, r);
                    z-index: 99;
                    .c{
                        @include wh(428px, 428px, a);
                        @include radius(20px);
                        @include jz(lt, 50%, 50%);
                    }
                }
                .bg3-box{
                    @include wh(100%, 270px, a);
                    top: 620px;
                    .bg3{
                        @include wh(100%, 270px, a);
                        @include jz(lt, 50%, 50%);
                    }
                }
                .t2-box{
                    @include wh(100%, 132px, r);
                    top: 100px;
                    img{
                        @include wh(271px, 132px, a);
                        @include jz(lt, 50%, 50%);
                    }
                }
                .bg4-box{
                    @include wh(100%, auto, r);
                    @include padding(1, 40px 30px);
                    margin-top: 100px;
                    margin-bottom: 40px;;
                    .bg4{
                        @include wh(100%, 100%, a);
                        @include jz(lt, 50%, 50%);
                    }
                    .txt-box{
                        @include wh(100%, auto, r);
                        top: 0; left: 0;
                        overflow: hidden;
                        @include padding(1, 20px 0);
                        .con{
                           @include wh(80%, auto, r);
                           overflow: hidden;
                           margin: 0 auto;
                           .t-list{
                                @include wh(100%, auto, r);
                                border-bottom: #a7afb9 1px dashed;
                                @include padding(1, 50px 0);
                                display: table;
                                
                                .left{
                                    width: 36%;
                                    @include txt(28px, '', left, 550);
                                    align-items: center;
                                    @include color('', #f1d4c8);
                                    display: table-cell;
                                    vertical-align: middle;

                                }
                                .right{
                                    width: 65%;
                                    @include txt(24px, '', left, 500);
                                    @include color('', #fff);
                                    white-space: pre-wrap;
                                    display: table-cell;
                                    vertical-align: middle;
                                }
                                .x{
                                    @include wh(554px, 1, r);
                                    margin: 0 auto
                                }
                            }
                            .t-list:last-child{
                               border: none 
                            }
                            .jj{@include padding(1, 100px 0);}
                        }
                    }
                }
            }
        }
    }
    .pc-box{
        @include wh(1920px, 1080px, a);
        top: -100%; left: -100%;
        overflow: hidden;
        float: left;
        .list{
            @include wh(100%, 100%, r);
            overflow: hidden;
            .bg{
                @include wh(1920px, 1080px, a);
                left: 0; top: 0;
            }
            .content{
                @include wh(1920px, 1080px, r);
                left: 0; top: 0;
                .t-box{
                    @include wh(428px, 200px, a);
                    z-index: 99;
                    left: 72px; top: 770px;
                    .t{
                        position: relative;
                        width: 90%;
                        left: 5%;
                        @include txt(30px, auto, center, 500);
                        @include color('', #fff);
                    }
                }
                .c-box{
                    @include wh(428px, 428px, a);
                    @include radius(20px);
                    z-index: 99;
                    left: 72px; top: 320px;
                    .c{width: 100%; height: 100%;float: inherit;}
                }
                .bg4-box{
                    @include wh(1304px, 864px, a);
                    top: 215px; left: 566px;
                    .right{
                        @include wh(50%, 262px, r);
                        @include padding(1, 0px 100px 0px 200px);
                        float: left;
                        overflow: hidden;
                        div{
                            @include wh(65%, auto, a);
                            @include txt(22px, '', left, 500);
                            @include color('', #fff);
                            white-space: pre-wrap;
                            overflow: hidden;
                            @include jz(lt, 50%, 50%);
                            margin-left:80px;
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 9;
                            overflow: hidden;
                        }
                    }
                }
            }
        }
    }

    .box2{
        @include wh(100%, auto, r);
        float: left;
        .list{
            width: 80px;float: left;
            .img{width: 100%;}
            .img:hover { transform: scale(1.1);}
        }
        
    }
</style>
<template>
    <el-container>
        <el-aside width="50%">
            <el-divider></el-divider>
            <upload-excel-component :on-success="handleSuccess"/>
            <el-divider></el-divider>
            <el-steps :active="stepindex" finish-status="success">
                <el-step title="上传表格"></el-step>
                <el-step title="生成图片"></el-step>
                <el-step title="准备就绪"></el-step>
            </el-steps>
            <el-divider></el-divider>
            
            <el-progress :percentage="percentage" :text-inside="true" :stroke-width="26"></el-progress>
            <el-divider></el-divider>
            <div v-if="list.length>0">
                <el-switch v-model="lSwitch" active-text="手机版" inactive-text="电脑版" style="margin-right: 30px" :disabled="timer ? true : false"></el-switch>
                <el-button type="primary" @click="addimg" :disabled="timer ? true : false">生成图片</el-button>
                <el-button type="primary" @click.stop="getPdf()" v-if="showPdf">导出pdf</el-button>
            </div>

            <el-divider></el-divider>

            <el-table :data="list" border style="width: 100%">
                <el-table-column prop="sort" label="序号"></el-table-column>
                <el-table-column prop="productName" label="产品名称"></el-table-column>
                <el-table-column label="图片">
                    <template slot-scope="scope">
                        <el-image style="width: 80px; height: 80px" :src="scope.row.picPath"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="intro" label="简介"></el-table-column>
                <el-table-column prop="hardware" label="硬件"></el-table-column>
                <el-table-column prop="software" label="软件"></el-table-column>
                <el-table-column prop="price" label="价格"></el-table-column>
            </el-table>
        </el-aside>

        
        <el-main>
            <div class="box2" v-if="imgList.length > 0">
                <div class="list" v-for="(item,index) of imgList" :key="index">
                    <div style="width:100%; text-align: center;">{{index + 1}}</div>
                    <el-image
                        style="width: 100%;" :src="item" cover :preview-src-list="imgList">
                    </el-image>
                </div>
            </div>

            <div class="h5-box" ref="content" style="opacity:0;" v-if="list.length>0 && lSwitch">
                <div class="list" :id="'menuItem1'">
                    <img class="bg" src="@/assets/mobile/bg.png">
                    <div class="content">
                        <div class="t-box" >
                            <div class="t" v-if="list[listIndex].productName">{{list[listIndex].productName | filter| lineBreak | maxLength(25)}}</div>
                        </div>
                        <div class="c-box" >
                            <img class="c" :src="list[listIndex].picPath" v-if="list[listIndex].picPath">
                        </div>
                        <div class="bg3-box">
                            <img class="bg3" src="@/assets/mobile/bg3.png">
                        </div>
                        <div class="t2-box">
                            <img src="@/assets/mobile/txt2.png">
                        </div>
                        <div class="bg4-box">
                            <img class="bg4" src="@/assets/mobile/bg4.png">
                            
                            <div class="txt-box">
                                <div class="con">
                                    <div class="t-list">
                                        <div class="left">• 产品名称</div>
                                        <div class="right" v-if="list[listIndex].productName">{{list[listIndex].productName | lineBreak | maxLength(50)}}</div>
                                    </div>
                                    <div class="t-list jj">
                                        <div class="left">• 产品简介</div>
                                        <div class="right" v-if="list[listIndex].intro">{{list[listIndex].intro | lineBreak }}</div>
                                    </div>
                                    <div class="t-list">
                                        <div class="left">• 硬件</div>
                                        <div class="right" v-if="list[listIndex].hardware">{{list[listIndex].hardware | lineBreak | maxLength(150)}}</div>
                                    </div>
                                    <div class="t-list">
                                        <div class="left">• 软件</div>
                                        <div class="right" v-if="list[listIndex].software">{{list[listIndex].software | lineBreak}}</div>
                                    </div>
                                    <div class="t-list">
                                        <div class="left">• 内容</div>
                                        <div class="right" v-if="list[listIndex].content">{{list[listIndex].content | lineBreak}}</div>
                                    </div>
                                    <div class="t-list">
                                        <div class="left">• 单价</div>
                                        <div class="right" v-if="list[listIndex].price">{{list[listIndex].price}}</div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div class="zw"></div>
                    </div>
                </div>
            </div>
            <div class="pc-box" ref="content" style="opacity:0;" v-if="list.length> 0 && !lSwitch">
                <div class="list" :id="'menuItem1'">
                    <img class="bg" src="@/assets/pc/bg.jpg">
                    <div class="content">
                        <div class="t-box" >
                            <div class="t" v-if="list[listIndex].productName">{{list[listIndex].productName | filter| lineBreak | maxLength(25)}}</div>
                        </div>
                        <div class="c-box" >
                            <img class="c" :src="list[listIndex].picPath" v-if="list[listIndex].picPath">
                        </div>
                        <div class="bg4-box">
                            <div class="right"><div v-if="list[listIndex].productName">{{list[listIndex].productName | filter| lineBreak | maxLength(100)}}</div></div>
                            <div class="right"><div v-if="list[listIndex].intro">{{list[listIndex].intro | filter| lineBreak | maxLength(100)}}</div></div>
                            <div class="right"><div v-if="list[listIndex].software">{{list[listIndex].software | filter| lineBreak | maxLength(100)}}</div></div>
                            <div class="right"><div v-if="list[listIndex].content">{{list[listIndex].content | filter| lineBreak | maxLength(100)}}</div></div>
                            <div class="right"><div v-if="list[listIndex].hardware">{{list[listIndex].hardware | filter| lineBreak | maxLength(100)}}</div></div>
                            <div class="right"><div v-if="list[listIndex].price">{{list[listIndex].price | filter|  maxLength(100)}}</div></div>
                        </div>
                    </div>
                </div>
            </div>
        </el-main>

    </el-container>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/index.vue'
import html2canvas from "html2canvas"
import {jsPDF} from 'jspdf';
import JSZip from 'jszip'
import FileSaver from 'file-saver'
import { fetchList } from '@/api/article'
import { nullToStr } from '@/utils/tool'
import qs from "qs";
export default {
    name: "FaceLandmarkDetection",
    data() {
        return {
            stepindex: 0, // 步骤条
            percentage: 0, // 进度条
            lSwitch: false,
            list: [],
            listIndex: 0,
            imgList: [],
            showPdf: false,
            fileList:[],
            isDisabled: false,
            timer: null, // 计时器
        };
    },
    watch: {
        lSwitch(n, o){
            this.stepindex = 1;
            this.percentage = 0;
            this.listIndex = 0;
            this.imgList = [];
            this.showPdf = false;
            this.isDisabled = false;
            this.timer = null;
        },
    },
    components: { UploadExcelComponent },
    filters:{
        lineBreak(data){
            if (!data) return ''
            return data.replace(/<br>/g,'\n');
        },
        filter(value){
            if (value != '') {
                const pattern = /[`~!@#$^\-&nbsp*()=|{}':;',\\\[\]\.<><br><br/>\/?~！○★@#￥……&*（）——|{}【】'；：""'？\s]/g
                value = value.replace(pattern, '')
            }
            return value

        },
        maxLength(value, length) {
            if (!value) return ''
            if (value.length > length) {
                return value.slice(0, length) + '...'
            }
            return value
        }
    },
    methods: {
        // 读表返回
        handleSuccess(e) {
            let that = this;
            let loading = this.$loading({ lock: true, text: 'Loading', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)'})
            let formData = new FormData();
            formData.append('file', e)
            fetchList(formData).then(res => {
                loading.close()
                this.list = nullToStr(res.data)
                clearInterval(this.timer);
                this.timer = null;
                this.listIndex = 0;
                this.percentage = 0;
                this.stepindex = 1;
                this.imgList = [];
            })
        },
        // 初始化参数并生成图片
        addimg(){
            this.stepindex = 2;
            this.imgList = [];
            this.listIndex = 0;
            this.showPdf = false;
            this.htmlToCanvas();
        },
        // 异步html2canvas回调事件
        async htmlToCanvas() {
            let that = this;
            console.log(0, that.listIndex, this.list.length)
            that.toImg().then(res => {
                this.percentage = Math.trunc((this.listIndex + 1) / this.list.length * 100);
                that.imgList.push(res);
                if (this.listIndex + 1 === this.list.length) {
                    clearInterval(this.timer);
                    this.timer = null
                    this.showPdf = true;
                    return
                }
                that.listIndex++;
                this.timer = setTimeout(()=>{
                    this.htmlToCanvas()
                }, 100)
            }).catch((e) => {console.log('转换图片报错', e)})
        },
        // html转图片
        toImg(){
            return new Promise(function (resolve, reject) {
                const ref = document.getElementById(`menuItem1`)
                html2canvas(ref, {
                    dpi: 500,
                    useCORS: true,
                    scrollY: 0,
                    scrollX: 0,
                    background: '#000',
                    scale: 1
                }).then((canvas) => {
                    var context = canvas.getContext('2d');
                    context.crossOrigin = "anonymous";
                    context.textAlign = "center";

                    var src64 = canvas.toDataURL("image/png");
                    resolve(src64)
                }).catch((e) => {console.log(e);})
            })
        },
        dataURLtoBlob(dataurl) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: mime });
        },

        // 导出pdf
        async getPdf() {
            console.log(this.imgList)
            const zip = new JSZip()
            const _this = this
            const promises = []
            const cache = {}
            // console.log('111')
            for (let imgIndex = 0; imgIndex < this.imgList.length; imgIndex++) {
                const promise = _this.getImgWidthHeight(this.imgList[imgIndex]).then((data) => {
                    // let DataURI = this.imgList[imgIndex].result.replace(/^data:image\/(png|jpg);base64,/, "")
                    // zip.file(file_name, DataURI , { base64: true })
                    let blob = this.dataURLtoBlob(this.imgList[imgIndex])
                    zip.file(imgIndex +'.jpg', blob, { binary: true }) // 逐个添加文件，需要加后缀".png"
                    // cache[1] = this.imgList[imgIndex]
                })
                promises.push(promise)
            }
            Promise.all(promises).then(() => {
                zip.generateAsync({ type: 'blob' }).then((content) => {
                    FileSaver.saveAs(content, '图片')
                    _this.$message.success('图片下载完成')
                })
            })
            .catch((res) => {
              _this.$message.warning('文件下载失败!')
            })

            // let recordPdf;
            // const promises = []

            // if (this.lSwitch) {
            //     const { maxWidth, maxHeight } = await this.getMaxWidthHeight();
            //     recordPdf = new jsPDF('p', 'px', [maxWidth, maxHeight])
            //     recordPdf.addImage(require('@/assets/mobile/home.png'), 'jpeg', 0, 0, 720, 2405);
            //     recordPdf.addPage();
            // } else {
            //     recordPdf = new jsPDF('l', 'px', [960, 540])
            //     recordPdf.addImage(require('@/assets/pc/home.jpg'), 'jpeg', 0, 0, 960, 540);
            //     recordPdf.addPage();
            // }
            

            // for (const item of this.imgList) {
            //     if (this.lSwitch) {
            //         const page = this.getImgWidthHeight(item).then((data) => {
            //             recordPdf.addImage(item, 'jpeg', 0, 0, width, width);
            //             recordPdf.addPage()
            //         })
            //         promises.push(page)
            //     } else {
            //         const page = this.getImgWidthHeight(item).then((data) => {
            //             recordPdf.addImage(item, 'jpeg', 0, 0, 960, 540);
            //             recordPdf.addPage()
            //         })
            //         promises.push(page)
            //     }
            // }
            // Promise.all(promises).then(() => {
            //     setTimeout(()=>{
            //         const targetPage = recordPdf.internal.getNumberOfPages()
            //         recordPdf.deletePage(targetPage)
            //         recordPdf.save('1.pdf')
            //     }, 500)
            // })
        },
        // 获取所有图片最大的宽高
        async getMaxWidthHeight(){
            const widthList = []
            const heightList = []
            let maxHeight = 0
            let maxWidth = 0
            for (let aaa = 0; aaa < this.imgList.length; aaa++) {
                const { width, height } = await this.getImgWidthHeight(this.imgList[aaa]);
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
        },
        //获取图片宽高
        getImgWidthHeight(src) {
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
        },
    },
};
</script>


